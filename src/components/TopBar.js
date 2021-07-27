import React from "react";
import styled from "styled-components";

import Timer from "./Timer";
import Volume from "./Volume";

import { BOARD_GAME } from "../util/constants";

import "antd/dist/antd.css";
import { Select } from "antd";
const { Option } = Select;

const TopBar = ({
  onChange,
  defaultValue,
  onResetTime,
  isRunning,
  setIsRunning,
  isVolume,
  setOnResetTime,
  setIsVolume,
  minesCount,
}) => {
  const onReset = (newLevel) => {
    onChange(newLevel);
    setIsRunning(false);
    setOnResetTime(true);
  };

  return (
    <StyledTopBar>
      <Select
        defaultValue={defaultValue}
        style={{ width: 96, touchAction: "none" }}
        onChange={onReset}
      >
        {Object.keys(BOARD_GAME).map((level) => {
          return (
            <Option value={level} key={level}>
              {level}
            </Option>
          );
        })}
      </Select>

      <Timer
        isRunning={isRunning}
        onReset={onResetTime}
        setOnResetTime={setOnResetTime}
      />

      <span className="Span" role="img" aria-label="flag">
        🏴‍☠️ {minesCount}
      </span>

      <Volume isVolume={isVolume} setIsVolume={setIsVolume} />
    </StyledTopBar>
  );
};

export default TopBar;

const StyledTopBar = styled.div`
  background: #2d752c;
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  .Span {
    color: white;
    font-size: 20px;
  }
`;
