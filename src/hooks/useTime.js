import { useState, useRef } from "react";

const useTimer = (initialState = 0) => {
  const [timer, setTimer] = useState(initialState);
  const [isPaused, setIsPaused] = useState(false);
  const countRef = useRef(null);

  const start = () => {
    setTimer(0);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const stop = () => clearInterval(countRef.current);

  const handlePaused = () => {
    stop();
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
    start();
  };

  const handleReset = () => {
    stop();
    setIsPaused(false);
    setTimer(0);
  };

  return {
    timer,
    isPaused,
    start,
    handlePaused,
    handleResume,
    handleReset,
  };
};

export default useTimer;
