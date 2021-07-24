import React from "react";
import styled from "styled-components";
import { BOARD_GAME } from "../util/constants";
import "antd/dist/antd.css";
import formatTime from "../util/formatTime";
import { Select } from "antd";
const { Option } = Select;

const TopBar = ({
  onChange,
  defaultValue,
  nonMinesCount,
  timer,
  handleReset,
  volume,
  setVolume,
}) => {
  const onReset = (newLevel) => {
    handleReset();
    onChange(newLevel);
  };

  const onChangeMuted = () => {
    setVolume(!volume);
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
      <span className="Span">⏰ {formatTime(timer)}</span>
      <span className="Span" role="img" aria-label="flag">
        ⬜ {nonMinesCount}
      </span>
      <span className="Span" style={{ width: "28px" }} onClick={onChangeMuted}>
        {volume ? "🔊" : "🔈"}
      </span>
    </StyledTopBar>
  );
};

export default TopBar;

const StyledTopBar = styled.div`
  background: #4a752c;
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  .Span {
    color: white;
    font-size: 20px;
    :hover {
      cursor: pointer;
    }
  }
`;
