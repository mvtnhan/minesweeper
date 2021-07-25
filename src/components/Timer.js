import React, { useEffect, useState, useRef } from "react";

import formatTime from "../util/formatTime";

const Timer = ({ isRunning, onReset, setOnResetTime }) => {
  const [time, setTime] = useState(0);
  const savedTime = useRef();

  useEffect(() => {
    if (isRunning) {
      savedTime.current = setInterval(() => setTime((t) => t + 1), 1000);
    }
    if (onReset) {
      setTime(0);
      setOnResetTime(false);
    }

    return () => clearInterval(savedTime.current);
  }, [isRunning, onReset, setOnResetTime]);

  return (
    <div style={{ color: "white", fontSize: "20px" }}>
      ⏰ {formatTime(time)}
    </div>
  );
};

export default Timer;
