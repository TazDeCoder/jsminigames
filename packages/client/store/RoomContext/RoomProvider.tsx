import { useState, useMemo } from 'react';
import { useLocalstorageState } from 'rooks';

import { RoomContext, IRoomContext } from './room-context';

type Props = {
  children: React.ReactNode;
};

const RoomProvider: React.FC<Props> = ({ children }) => {
  const [room, setRoom] = useLocalstorageState<any>('room', {});
  const [clients, setClients] = useState<any[]>([]);

  const updateRoomHandler = (newRoomData: any) => {
    setRoom((prevRoom: any) => ({ ...prevRoom, ...newRoomData }));
  };

  const leaveRoomHandler = () => {
    setRoom({});
    setClients([]);
  };

  const updateClientsHandler = (newClientsData: any) => {
    setClients(newClientsData);
  };

  const roomContext: IRoomContext = useMemo(
    () => ({
      room,
      clients,
      onUpdateRoom: updateRoomHandler,
      onLeaveRoom: leaveRoomHandler,
      onUpdateClients: updateClientsHandler,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [room, clients],
  );

  return (
    <RoomContext.Provider value={roomContext}>{children}</RoomContext.Provider>
  );
};

export default RoomProvider;
