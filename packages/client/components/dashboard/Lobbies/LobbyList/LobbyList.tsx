import { useState, useEffect, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';

import LobbyItem from './LobbyItem';
import Pagination from './Pagination';
import { LOBBIES_PER_PAGE } from '../../../../data/constants';
import type { ILobby, IRoom } from '../../../interfaces';

type Props = {
  lobbies: ILobby[];
  onJoinRoom: (room: IRoom) => void;
};

const wrapperStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-around',
  height: '100%',
  p: 2,
};

const lobbiesStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 2,
  height: '70%',
};

const LobbyList: React.FC<Props> = ({ lobbies, onJoinRoom }) => {
  const [currPage, setCurrPage] = useState(1);
  const [slicedLobbies, setSlicedLobbies] = useState<ILobby[]>([]);

  const maxPageLimit = useMemo(
    () => Math.floor(lobbies.length / LOBBIES_PER_PAGE),
    [lobbies.length],
  );

  const paginationHandler = (dir: -1 | 1) => {
    if (dir === -1) {
      if (currPage !== 1) {
        setCurrPage((prevCurrPage) => {
          const prevPage = prevCurrPage - 1;
          return prevPage;
        });
      }
    }

    if (dir === 1) {
      if (currPage <= maxPageLimit) {
        setCurrPage((prevCurrPage) => {
          const nextPage = prevCurrPage + 1;
          return nextPage;
        });
      }
    }
  };

  useEffect(() => {
    setSlicedLobbies(
      lobbies.slice(
        (currPage - 1) * LOBBIES_PER_PAGE,
        currPage * LOBBIES_PER_PAGE,
      ),
    );
  }, [currPage, lobbies]);

  return (
    <Box sx={wrapperStyles}>
      <Box sx={lobbiesStyles}>
        {slicedLobbies.length > 0 ? (
          slicedLobbies.map((lobby: any) => (
            <LobbyItem
              key={lobby.roomId}
              lobby={lobby}
              onJoinRoom={onJoinRoom}
            />
          ))
        ) : (
          <Typography>No public rooms found...</Typography>
        )}
      </Box>
      <Pagination
        currPage={currPage}
        onBack={() => paginationHandler(-1)}
        onForward={() => paginationHandler(1)}
      />
    </Box>
  );
};

export default LobbyList;
