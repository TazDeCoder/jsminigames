export interface IRoom {
  roomId: string;
  action: 'join' | 'create';
  password?: string;
  config?:
  | {
    maxTimerLimit: number;
    maxNumRounds: number;
  }
  | string;
}

export interface ILobby {
  roomId: string;
  numPlayers: number;
  rounds: number;
  status: string;
}

export interface IGame {
  id: number | string;
  html: string;
  css: string;
  helperText: string;
  prompt: string;
  validator: string;
}

export interface IClientMessage {
  text: string;
  color: string;
}

export interface IServerMessage {
  text: string;
  status: string;
}

export interface IUserCrendentials {
  username?: string;
}
