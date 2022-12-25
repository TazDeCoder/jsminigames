import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

type Props = {
  uri: string;
  options: any;
};

export default function useSocket({ uri, options }: Props) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isError, setIsError] = useState(false);

  const disconnect = () => {
    if (socket) {
      socket.disconnect();
      setIsConnected(false);
    }
  };

  useEffect(() => {
    const socketIo = io(uri, options);
    setSocket(socketIo);

    socketIo.on('connect', () => {
      setIsConnected(true);
    });

    socketIo.on('connect-error', () => {
      setIsConnected(false);
      setIsError(true);
    });

    socketIo.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socketIo.disconnect();
      setIsConnected(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    socket,
    isConnected,
    isError,
    disconnect,
  };
}
