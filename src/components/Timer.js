import React, { useState, useEffect } from "react";
import styled from "styled-components";

let timeIntervalId;

const Timer = ({ gameReset, sendTime }) => {
  let [time, setTime] = useState(0);
  let [sTime, setSTime] = useState(0);

  useEffect(() => {
    if (time > 0 && gameReset) {
      setSTime(time);
      setTime(0);
    }
  }, [gameReset, time]);

  useEffect(() => {
    const incrementTime = () => {
      let newTime = time + 1;
      setTime(newTime);
    };
    timeIntervalId = setTimeout(() => {
      incrementTime();
    }, 1000);
    if (gameReset) {
      clearInterval(timeIntervalId);
    }
  }, [time, setTime, gameReset, sendTime]);

  return (
    <StyleTimer>
      <span role="img" aria-label="clock" style={{ paddingRight: 10 }}>
        ⏰
      </span>
      {gameReset ? sTime : time}
    </StyleTimer>
  );
};

export default Timer;

const StyleTimer = styled.div`
  color: white;
  font-size: 20px;
`;
