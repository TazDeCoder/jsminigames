import { createContext } from 'react';

export interface IRoomContext {
  room: any;
  clients: any;
  onUpdateRoom: (newRoomData: any) => void;
  onLeaveRoom: () => void;
  onUpdateClients: (newClientsData: any[]) => void;
}

export const RoomContext = createContext<IRoomContext | null>(null);
