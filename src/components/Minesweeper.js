import React, { useState } from "react";
import styled from "styled-components";

import Modal from "./Modal";
import Board from "./Board";
import TopBar from "./TopBar";

const Minesweeper = () => {
  const [onReset, setOnReset] = useState(false);
  const [gameWin, setGameWin] = useState(false);
  const [isVolume, setIsVolume] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [minesCount, setMinesCount] = useState(0);
  const [level, setOnLevelChange] = useState("Medium");
  const [isRestartGame, setIsRestartGame] = useState(false);

  return (
    <StyledMinesweeper>
      {(gameOver || gameWin) && (
        <Modal
          gameState={gameOver}
          setOnResetTime={setOnReset}
          setIsRestartGame={setIsRestartGame}
        />
      )}
      <TopBar
        defaultValue={level}
        onChange={setOnLevelChange}
        minesCount={minesCount}
        onResetTime={onReset}
        setOnResetTime={setOnReset}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
        isVolume={isVolume}
        setIsVolume={setIsVolume}
      />
      <Board
        level={level}
        gameOver={gameOver}
        isRestartGame={isRestartGame}
        setIsRestartGame={setIsRestartGame}
        setIsRunning={setIsRunning}
        setGameOver={setGameOver}
        setGameWin={setGameWin}
        isVolume={isVolume}
        minesCount={minesCount}
        setMinesCount={setMinesCount}
      />
    </StyledMinesweeper>
  );
};

export default Minesweeper;

const StyledMinesweeper = styled.div`
  box-shadow: 0 4px 3px rgba(0, 0, 0, 0.3);
  position: relative;

  .GridBoard {
    display: flex;
  }
`;
