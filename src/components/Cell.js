import React from "react";
import styled from "styled-components";

import { MINE_COLOR } from "../util/constants";

const Cell = ({
  data,
  updateBoard,
  flagCell,
  start,
  audioRevealed,
  audioGameOver,
  isVolume,
}) => {
  const styleColorBg = {
    color: numColorCode(data.value),
    background: data.revealed
      ? data.value === "X"
        ? MINE_COLOR()
        : bombChexPattern(data.x, data.y)
      : chexPattern(data.x, data.y),
  };

  const onClickUpdate = (e) => {
    if (data.flagged) {
      return;
    }

    if (!data.revealed) {
      if (data.value === "X" && isVolume) {
        audioGameOver();
      }
      start(true);
    }

    updateBoard(data.x, data.y);
    if (!data.revealed && isVolume) {
      audioRevealed();
    }
  };

  const onClickFlag = (e) => {
    e.preventDefault();
    flagCell(data.x, data.y);
  };

  return (
    <StyledCell
      style={styleColorBg}
      onClick={(e) => onClickUpdate(e)}
      onContextMenu={(e) => onClickFlag(e)}
    >
      {data.flagged && !data.revealed
        ? "🏴‍☠️"
        : data.revealed && data.value !== 0
        ? data.value === "X"
          ? "💥"
          : data.value
        : ""}
    </StyledCell>
  );
};

export default Cell;

const chexPattern = (x, y) => {
  if (x % 2 === 0 && y % 2 === 0) {
    return "#aad751";
  } else if (x % 2 === 0 && y % 2 !== 0) {
    return "#a2d249";
  } else if (x % 2 !== 0 && y % 2 === 0) {
    return "#a2d249";
  } else {
    return "#aad751";
  }
};

const bombChexPattern = (x, y) => {
  if (x % 2 === 0 && y % 2 === 0) {
    return "#e5c29f";
  } else if (x % 2 === 0 && y % 2 !== 0) {
    return "#d7b899";
  } else if (x % 2 !== 0 && y % 2 === 0) {
    return "#d7b899";
  } else {
    return "#e5c29f";
  }
};

const numColorCode = (num) => {
  if (num === 1) {
    return "#1976d2";
  } else if (num === 2) {
    return "#388d3c";
  } else if (num === 3) {
    return "#d33030";
  } else if (num === 4) {
    return "#7c21a2";
  } else if (num === 5) {
    return "#1976d2";
  } else if (num === 6) {
    return "#1976d2";
  } else {
    return "#ffffff";
  }
};

const StyledCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-size: 30px;
  font-weight: 800;
  :hover {
    background-color: #78b343 !important;
  }
`;
