import { useContext, useState, useEffect, useCallback } from 'react';
import type { Socket } from 'socket.io-client';
import { Box, Container, Typography } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

import { RoomContext } from '../../../store';
import { useGame } from '../../../hooks';
import { Loader } from '../../ui';
import Minigame from './Minigame';
import Leaderboard from './Leaderboard';
import JoinedClients from './JoinedClients';
import { format } from '../../../lib';
import type { IClientMessage, IGame, IServerMessage } from '../../interfaces';

function gameSubscriptions(socket: Socket) {
  return {
    gameStart: (cb: any) => {
      socket.on('room:game-start', () => cb());
    },
    gameEnd: (cb: any) => {
      socket.on('room:game-end', () => cb());
    },
    gameResults: (cb: any) => {
      socket.on('room:game-results', (data) => cb(data));
    },
    gameReceiveMessage: (cb: any) => {
      socket.on('room:receive-message', (message) => cb(message));
    },
    roundStart: (cb: any) => {
      socket.on('room:round-start', (data) => cb(data));
    },
    roundEnd: (cb: any) => {
      socket.on('room:round-end', () => cb());
    },
  };
}

function gameEmitters(socket: Socket) {
  return {
    playerIsReady: () => {
      socket.emit('client:is-ready');
    },
    playerSendMessage: (message: string) => {
      socket.emit('room:send-message', message);
    },
    playerSubmit: (js: string, cb: any) => {
      socket.emit('client:submit-solution', js, (newScore: number) => {
        cb(newScore);
      });
    },
  };
}

type Props = {
  socket: Socket;
  onLeave: () => void;
};

const wrapperStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  p: 5,
  bgcolor: 'primary.main',
};

const lobbyMenuContainerStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '90%',
};

const Lobby: React.FC<Props> = ({ socket, onLeave }) => {
  const roomCtx = useContext(RoomContext);

  const [sub, setSub] = useState<any>(null);
  const [emit, setEmit] = useState<any>(null);

  const { game, updateScore, updateGame, updateRound } = useGame();

  const [annoucerMsg, setAnnouncerMsg] = useState('');
  const [messages, setMessages] = useState<IClientMessage[]>([]);
  const [minigame, setMinigame] = useState<IGame | null>(null);
  const [leaderboard, setLeaderboard] = useState<any>({});

  useEffect(() => {
    if (socket) {
      setSub(gameSubscriptions(socket));
      setEmit(gameEmitters(socket));
    }
  }, [socket]);

  useEffect(() => {
    if (sub) {
      sub.gameStart(() => {
        updateGame(true);
        updateScore(0);
      });
      sub.gameEnd(() => {
        updateGame(false);
        updateScore(0);
      });
      sub.gameResults((newLeaderboard: any[]) => {
        setLeaderboard(newLeaderboard);
      });
      sub.gameReceiveMessage((newMessage: IServerMessage) => {
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          let msgColor: string | undefined;

          if (newMessage.status === 'success') {
            msgColor = 'success.light';
          } else if (newMessage.status === 'disabled') {
            msgColor = 'text.disabled';
          } else if (newMessage.status === 'info') {
            msgColor = 'info.light';
          } else {
            msgColor = 'black';
          }

          const transformedMessage: IClientMessage = {
            text: newMessage.text,
            color: msgColor,
          };

          updatedMessages.push(transformedMessage);

          return updatedMessages;
        });
      });
      sub.roundStart((newMinigame: any) => {
        setAnnouncerMsg(`Current Game: ${newMinigame.title}`);

        const transformedPrompt = format(newMinigame.prompt, newMinigame.props);
        const transformedValidator = newMinigame.validator.concat(
          `const isValid = validator(${JSON.stringify(
            newMinigame.props,
          )});console.log(isValid);window.top.postMessage(isValid, '*');`,
        );

        const transformedMinigame: IGame = {
          id: newMinigame.id,
          html: newMinigame.html,
          css: newMinigame.css,
          helperText: newMinigame.helper_text,
          prompt: transformedPrompt,
          validator: transformedValidator,
        };
        setMinigame(transformedMinigame);

        updateRound(true);
      });
      sub.roundEnd(() => {
        updateRound(false);
        setMinigame(null);
        setAnnouncerMsg('Next minigame is about to start...');
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sub]);

  useEffect(() => {
    if (game.isGameStart && !game.isRoundStart) {
      setAnnouncerMsg('Next minigame is about to start...');
      setMinigame(null);
    }
  }, [game.isGameStart, game.isRoundStart]);

  useEffect(() => {
    if (roomCtx?.clients.length > 1 && !game.isGameStart) {
      setAnnouncerMsg('Waiting for all players to be ready!');
    } else {
      setAnnouncerMsg('Waiting for more players to join...');
    }
  }, [roomCtx?.clients, game.isGameStart]);

  const isReadyHandler = useCallback(() => {
    emit.playerIsReady();
  }, [emit]);

  const sendMessageHandler = useCallback(
    (newMessage: string) => {
      emit.playerSendMessage(newMessage);
    },
    [emit],
  );

  const submitSolutionHandler = useCallback(
    (solutionJs: string) => {
      emit.playerSubmit(solutionJs, (newScore: number) => {
        updateScore(newScore);
      });
    },
    [emit, updateScore],
  );

  if (!roomCtx) {
    return (
      <Box
        sx={{ position: 'relative', height: '100vh', bgcolor: 'primary.main' }}
      >
        <Loader message="Loading lobby..." />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        ...wrapperStyles,
        height: game.isGameStart && game.isRoundStart ? 'initial' : '90vh',
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" align="center" paragraph>
          {annoucerMsg}
        </Typography>
      </Box>
      {game.isGameStart && game.isRoundStart && minigame ? (
        <Container sx={{ height: '100%' }}>
          <Typography
            sx={{ fontWeight: 600 }}
            align="center"
          >{`Your Score: ${game.score}`}</Typography>
          <Minigame
            key={minigame.id}
            minigame={minigame}
            maxTimer={
              Number(JSON.parse(roomCtx.room.config).maxTimerLimit) / 1000
            }
            messages={messages}
            onSendMessage={sendMessageHandler}
            onSubmit={submitSolutionHandler}
          />
        </Container>
      ) : (
        <Container sx={lobbyMenuContainerStyles}>
          {!game.isGameStart ? (
            <>
              {roomCtx.room?.roomId && (
                <Box
                  sx={{
                    width: 160,
                    p: 1,
                    mb: 3,
                    bgcolor: 'accent.main',
                    borderRadius: 1,
                  }}
                >
                  <Typography
                    sx={{ fontWeight: 600, color: 'accent.contrastText' }}
                  >
                    {`Room ID: ${roomCtx.room.roomId}`}
                  </Typography>
                </Box>
              )}
              <JoinedClients
                clients={roomCtx.clients}
                onReadyUp={isReadyHandler}
                onLeave={onLeave}
              />
            </>
          ) : (
            <Leaderboard leaderboard={leaderboard} />
          )}
        </Container>
      )}
    </Box>
  );
};

export default Lobby;
