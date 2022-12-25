const consola = require('consola');
const { NodeVM } = require('vm2');

const { shuffle, pickProps } = require('../../utils/index');

const {
  SCORE_MULTIPLIER,
  DEFAULT_MAX_CLIENTS,
  DEFAULT_MAX_ROUNDS,
  MAX_TIMER_LIMIT,
  ROUND_BREAK_TIME,
} = require('../../data/constants');

const Game = require('../../models/game');

async function fetchMinigames() {
  const gameList = await Game.find({});

  if (gameList.length <= 0) {
    throw Error('Failed to retrieve games');
  }

  return gameList;
}

class RoomManager {
  constructor(options) {
    this.io = options.io;
    this.socket = options.socket;
    this.username = options.username;
    this.roomId = options.roomId;
    this.password = options.password;
    this.action = options.action;
    this.store = options.io.adapter;
    this.config = options.config
      ? JSON.parse(options.config)
      : {
          maxNumRounds: DEFAULT_MAX_ROUNDS,
          maxTimerLimit: MAX_TIMER_LIMIT,
        };
  }

  /**
   * Initialises when a client tries to establish a connection to a room
   *
   *
   * @access  public
   * @return  { bool }   Returns true if client successfully joined a room, or otherwise false
   */
  async init() {
    const clients = await this.io.in(this.roomId).allSockets();
    consola.debug(`Connected Clients are: ${clients}`);

    if (this.action === 'join') {
      const room = this.store.rooms.get(this.roomId);

      if (clients.size > 0) {
        if (room.status === 'full') {
          consola.info('[JOIN FAILED] Room is full');
          this.socket.emit(
            'room:error-join',
            'Room is currently full. Join another one',
          );
          return false;
        }

        if (room.password) {
          // Check if correct password for room
          const isPasswordValid = this.password === room.password;
          if (!isPasswordValid) {
            consola.info(
              `[JOIN FAILED] Incorrect password for room ${this.roomId}`,
            );
            this.socket.emit('room:error-join', 'Incorrect password');
            return false;
          }
        }

        if (room.status === 'live') {
          consola.info(`[JOIN FAILED] Game live at ${this.roomId}`);
          this.socket.emit(
            'room:error-join',
            `[JOIN FAILED] Game is already in-progres at room ${this.roomId}. Join again once the game has finished`,
          );
          return false;
        }

        await this.socket.join(this.roomId);
        this.store = room;
        this.store.clients.push({
          id: this.socket.id,
          username: this.username,
          isReady: false,
        });

        if (this.store.clients.length === DEFAULT_MAX_CLIENTS) {
          this.store.status = 'full';
        }

        consola.info(`[JOIN] Client joined room with ID ${this.roomId}`);

        this.socket.emit('room:success-join', {
          roomId: this.roomId,
          status: this.store.status,
          config: JSON.stringify(this.store.config),
        });

        return true;
      }

      consola.warn(
        `[JOIN FAILED] Client denied access to join room with ID ${this.roomId} as not created`,
      );
      this.socket.emit(
        'room:error-join',
        `Room with ID ${this.roomId} has not been created yet`,
      );
      return false;
    }

    if (this.action === 'create') {
      if (!clients) {
        consola.error('[INTERNAL ERROR] Room creation failed!');
        this.socket.disconnect();
        return false;
      }

      if (clients.size === 0) {
        await this.socket.join(this.roomId);
        this.store = this.store.rooms.get(this.roomId);

        if (this.password) {
          // Set password for room
          this.store.password = this.password;
        }

        this.store.clients = [
          {
            id: this.socket.id,
            username: this.username,
            isReady: false,
          },
        ];

        this.store.roomId = this.roomId;
        this.store.status = 'open';
        this.store.isPrivate = !!this.password;
        this.store.config = this.config;

        consola.info(
          `[CREATE] Client created and joined room with ID ${this.roomId}`,
        );

        this.socket.emit('room:success-create', {
          roomId: this.roomId,
          status: 'open',
          config: JSON.stringify(this.config),
        });

        return true;
      }

      consola.warn(
        `[CREATE FAILED] Client denied access to create room with ID ${this.roomId} as already present`,
      );
      this.socket.emit('room:error-create', 'Room already created');
      return false;
    }

    return false;
  }

  /**
   * Emits to all clients in room about ready status of joined clients
   *
   * @access  public
   */
  emitShowClients() {
    this.io.to(this.roomId).emit('client:show-clients', this.store.clients);
  }

  /**
   * Emits to all clients in room about leaderboard status
   *
   * @access  public
   */
  emitsShowResults() {
    const currPlayers = { ...this.store.game.players };
    const sortedPlayerKeys = Object.keys(currPlayers).sort((a, b) => {
      if (currPlayers[a].score > currPlayers[b].score) {
        return -1;
      }

      if (currPlayers[a].score < currPlayers[b].score) {
        return 1;
      }

      return 0;
    });

    const currLeadPlayer = currPlayers[sortedPlayerKeys[0]];

    if (currLeadPlayer.score > 0) {
      currLeadPlayer.isFirstPlace = true;
    }

    const leaderboard = {};
    for (let i = 0; i < sortedPlayerKeys.length; i += 1) {
      const playerKey = sortedPlayerKeys[i];
      leaderboard[i + 1] = {
        username: currPlayers[playerKey].username,
        score: currPlayers[playerKey].score,
        isFirstPlace: currPlayers[playerKey].isFirstPlace,
      };
    }

    this.io.to(this.roomId).emit('room:game-results', leaderboard);
  }

  /**
   * Updates isReady state of client to true
   *
   * @access  public
   */
  onIsReady() {
    this.socket.on('client:is-ready', () => {
      const updatedClients = [...this.store.clients];

      if (updatedClients.length > 1) {
        const foundClientIdx = updatedClients.findIndex(
          (client) => client.id === this.socket.id,
        );
        updatedClients[foundClientIdx].isReady = true;
        consola.info(`${updatedClients[foundClientIdx].username} is ready`);

        this.store.clients = updatedClients;
        this.emitShowClients();

        const arePlayersReady = updatedClients.every(
          (client) => client.isReady === true,
        );

        if (arePlayersReady) {
          this.beginGame();
        }
      } else {
        consola.warn('[LOBBY] Need one more player to start game');
      }
    });
  }

  /**
   * Updates the player state of individual players
   *
   * @access  public
   */
  onSubmit() {
    this.socket.on('client:submit-solution', (untrustedScript, cb) => {
      if (!untrustedScript) {
        consola.info('No script provided');
        return;
      }

      const actualTimeLapse = new Date() - this.store.game.timeoutTimestamp;

      let updatedPlayer = { ...this.store.game.players[this.socket.id] };

      if (!updatedPlayer.isSubmitted && !this.store.game.isBreak) {
        try {
          // Run user script in sandbox
          const vmHtml = `
            <body>
              ${this.store.game.currentMinigame.html}
              <script>${untrustedScript}</script>
            </body>
          `;

          // eslint-disable-next-line no-new-func
          const vmValidator = new Function(
            `${this.store.game.currentMinigame.validator} return validator;`,
          )();

          const vmProps = this.store.game.currentMinigame.props;

          const vm = new NodeVM({
            sandbox: {
              // eslint-disable-next-line global-require
              jsdom: require('jsdom'),
              html: vmHtml,
              validator: vmValidator,
              props: vmProps,
            },
          });

          const isValid = vm.run(`
            const { JSDOM } = jsdom;
            const dom = new JSDOM(
              html,
              { runScripts: "dangerously" },
            );
            const isValid = validator(props, dom.window.document);
            module.exports = isValid;
          `);

          if (isValid === true) {
            consola.info(
              `[SUBMIT] Client ${this.socket.id} has submitted a correct solution`,
            );
            this.io.to(this.roomId).emit('room:receive-message', {
              text: `Player ${updatedPlayer.username} submitted their solution!`,
              status: 'success',
            });

            const newScore =
              updatedPlayer.score +
              Math.floor(
                (this.store.game.maxTimerLimit - actualTimeLapse) *
                  SCORE_MULTIPLIER,
              );
            updatedPlayer = {
              username: updatedPlayer.username,
              score: newScore,
              isSubmitted: true,
            };
            this.store.game.players[this.socket.id] = updatedPlayer;
            cb(updatedPlayer.score);
          } else {
            consola.warn('Script provided is potentially dangerous');
          }
        } catch (err) {
          consola.error('Failed to execute script.', err);
          return;
        }

        const allPlayersSubmit = Object.keys(this.store.game.players).every(
          (key) => this.store.game.players[key].isSubmitted === true,
        );

        if (allPlayersSubmit) {
          this._resetTimeout();
          this._nextRound();
        }
      } else {
        consola.warn('[SUBMIT] Player has already submiited!');
      }
    });
  }

  /**
   * Disconnects the user from the game
   *
   * @access  public
   */
  onDisconnect() {
    this.socket.on('disconnect', async () => {
      try {
        await this.socket.leave(this.roomId);
        consola.info(`[CLIENT DISCONECTED] Client ${this.socket.id} left room`);

        if (this.store.status === 'live') {
          this.io.to(this.roomId).emit('room:receive-message', {
            text: `${
              this.store.game.players[this.socket.id].username
            } has left`,
            status: 'disabled',
          });

          delete this.store.game.players[this.socket.id];
        }

        const updatedClients = this.store.clients.filter(
          (player) => player.id !== this.socket.id,
        );

        if (updatedClients.length === 0) {
          throw new Error('[LOBBY DELETED] Lobby closed forcefully');
        }

        this.store.clients = updatedClients;

        if (this.store.status === 'live' && updatedClients.length === 1) {
          this.endGame(false);
        }
        this.emitShowClients();
      } catch (err) {
        consola.info(err);
      }
    });
  }

  /**
   * Listens for incoming messages from clients and broadcasts to room
   *
   * @access  public
   */
  onSendMessage() {
    this.socket.on('room:send-message', (message) => {
      consola.info(`[NEW MESSAGE] Client has sent a message`);
      const transformedMessage = `${
        this.store.game.players[this.socket.id].username
      }: ${message}`;
      this.io
        .to(this.roomId)
        .emit('room:receive-message', { text: transformedMessage });
    });
  }

  /**
   * Initiates the start of a new game by resetting the minigames and emitting the initial round
   *
   * @access  public
   */
  async beginGame() {
    try {
      const fetchedMinigames = await fetchMinigames();
      const hasGameProperty = Object.prototype.hasOwnProperty.call(
        this.store,
        'game',
      );

      if (!hasGameProperty) {
        this.store.game = {};
      }

      this.store.game.minigames = fetchedMinigames;
      this.emitShowClients();
      consola.info('Game started...');
      this.io.to(this.roomId).emit('room:receive-message', {
        text: 'Game has started!',
        status: 'info',
      });
      this.io.to(this.roomId).emit('room:game-start');

      // Reset game to initial state
      this._resetGame();

      this._emitRound(1);
    } catch (err) {
      consola.info(`[ERROR] ${err.message}`);
      consola.warn('[GAME] Game crashed!');
      this.socket.emit('room:error-crashed');
    }
  }

  /**
   * Emits end of current game
   *
   * @access  public
   */
  endGame() {
    consola.info('[GAME END] Current game ended');
    this.io.to(this.roomId).emit('room:receive-message', {
      text: 'Game has ended!',
      status: 'info',
    });
    this.io.to(this.roomId).emit('room:game-end');
    this._resetTimeout();

    this.store.status =
      this.store.clients.length < DEFAULT_MAX_CLIENTS ? 'open' : 'full';

    // Resets isReady state of each client
    this.store.clients = this.store.clients.map((obj) => ({
      ...obj,
      isReady: false,
    }));
    this.emitShowClients();
  }

  /**
   * Emits the end of current minigame
   *
   * @access  private
   */
  _nextRound() {
    consola.info(`[ROUND CHANGE] Minigame timeout ended`);
    this.io.to(this.roomId).emit('room:round-end');
    this.io.to(this.roomId).emit('room:receive-message', {
      text: 'Round has ended!',
      status: 'info',
    });
    this.emitsShowResults();
    const currentRoundNumber = this.store.game.roundNum + 1;
    if (currentRoundNumber > this.store.game.maxNumRounds) {
      // endGame if game has reached maxRounds
      this.endGame();
    } else {
      // Reset isSubmitted state of each player
      this.store.game.players = Object.keys(this.store.game.players).reduce(
        (obj, key) => ({
          ...obj,
          [key]: {
            ...obj[key],
            isSubmitted: false,
          },
        }),
        this.store.game.players,
      );
      this.store.game.roundNum = currentRoundNumber;
      this.store.game.isBreak = true;
      setTimeout(() => this._emitRound(currentRoundNumber), ROUND_BREAK_TIME);
    }
  }

  /**
   * Emits the next round of minigames
   *
   * @access  private
   */
  _emitRound(currentRoundNumber) {
    const nextMinigame = this.store.game.minigames[currentRoundNumber - 1];
    consola.info(
      `[ROUND CHANGE] Changing minigame and going to round ${currentRoundNumber}`,
    );
    this.io.to(this.roomId).emit('room:receive-message', {
      text: `Round ${currentRoundNumber}: ${nextMinigame.title}!`,
    });
    const pickedProps = nextMinigame?.props
      ? pickProps(nextMinigame.props)
      : {};
    const transformedMinigame = {
      id: nextMinigame._id,
      title: nextMinigame.title,
      description: nextMinigame.description,
      html: nextMinigame.html,
      css: nextMinigame.css,
      validator: nextMinigame.validator,
      prompt: nextMinigame.prompt,
      props: pickedProps,
      helper_text: nextMinigame.helper_text,
    };
    this.store.game.currentMinigame = transformedMinigame;
    this.store.game.isBreak = false;
    this.io.to(this.roomId).emit('room:round-start', transformedMinigame);
    this._triggerTimeout();
    this.store.game.timeoutTimestamp = new Date();
  }

  /**
   * Triggers a callback after the minigame round has ended
   *
   * @access  private
   */
  _triggerTimeout() {
    this.store.game.timeoutTimer = setTimeout(() => {
      this._nextRound();
    }, this.store.game.maxTimerLimit);
  }

  /**
   * Resets timeout timer if running
   *
   * @access  private
   */
  _resetTimeout() {
    if (this.store.game.timeoutTimer) {
      consola.info('[ROUND CHANGE] Timeout reset');
      clearTimeout(this.store.game.timeoutTimer);
      this.store.game.timeoutTimestamp = null;
    }
  }

  /**
   * Resets the game to initial game state
   *
   * @access  private
   */
  _resetGame() {
    if (this.store) {
      this._resetTimeout();
      const initialPlayers = this.store.clients.reduce(
        (obj, client) => ({
          ...obj,
          [client.id]: {
            username: client.username,
            score: 0,
            isFirstPlace: false,
            isSubmitted: false,
          },
        }),
        {},
      );
      consola.debug('Initial Players', initialPlayers);

      const shuffledMinigames = shuffle(this.store.game.minigames);
      this.store.status = 'live';
      this.store.game = {
        startTimestamp: new Date(),
        players: initialPlayers,
        minigames: shuffledMinigames,
        currentMinigame: null,
        timeoutTimestamp: null,
        timeoutTimer: null,
        isBreak: false,
        roundNum: 1,
        maxNumRounds: this.config.maxNumRounds,
        maxTimerLimit: this.config.maxTimerLimit,
      };
    }

    if (this.store) {
      consola.info(`[USER-CONFIG] ${JSON.stringify(this.store.config)}`);
    } else {
      consola.info(`[DEFAULT-CONFIG] ${JSON.stringify(this.config)}`);
    }
  }
}

module.exports = RoomManager;
