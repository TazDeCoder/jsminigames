import { useState, useEffect } from 'react';

type Props = {
  startAt?: number;
  immediateStart?: boolean;
};

export default function useTimer({
  startAt = 1,
  immediateStart = true,
}: Props) {
  const [timer, setTimer] = useState(startAt);
  const [isActive, setIsActive] = useState(immediateStart);
  const [isPaused, setIsPaused] = useState(false);

  const isActiveHandler = () => {
    setIsActive(true);
  };

  const toggleIsPausedHandler = () => {
    setIsPaused((prevState) => !prevState);
  };

  const stopHandler = () => {
    setTimer(startAt);
    setIsActive(false);
    setIsPaused(false);
  };

  useEffect(() => {
    let timerInterval: any = null;

    if (isActive && !isPaused) {
      timerInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [isActive, isPaused]);

  return {
    timer,
    isActive,
    isPaused,
    startTimer: isActiveHandler,
    pauseTimer: toggleIsPausedHandler,
    stopTimer: stopHandler,
  };
}
