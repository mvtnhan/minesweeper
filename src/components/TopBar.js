import React from "react";
import styled from "styled-components";
import { BOARD_GAME } from "../util/constants";
import "antd/dist/antd.css";

import { Select } from "antd";
import Timer from "./Timer";

const { Option } = Select;

const TopBar = ({
  onChange,
  defaultValue,
  gameReset,
  nonMinesCount,
  setTime,
}) => {
  return (
    <StyledTopBar>
      <span className="Span" role="img" aria-label="flag">
        ⬜ {nonMinesCount}
      </span>

      <Select
        defaultValue={defaultValue}
        style={{ width: 96, touchAction: "none" }}
        onChange={onChange}
      >
        {Object.keys(BOARD_GAME).map((level) => {
          return (
            <Option value={level} key={level}>
              {level}
            </Option>
          );
        })}
      </Select>

      <Timer gameReset={gameReset} sendTime={setTime} />

      {/* <span>⛏️ 🤛🏻 🖱️ 🤜🏻 🏴‍☠️</span> */}
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
  }
`;
