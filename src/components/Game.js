import React, { useState } from "react";
import styled from "styled-components";

import Modal from "./Modal";
import Board from "./Board";
import TopBar from "./TopBar";

const Game = () => {
  const [isRestartGame, setIsRestartGame] = useState(false);
  const [onReset, setOnReset] = useState(false);
  const [gameWin, setGameWin] = useState(false);
  const [isVolume, setIsVolume] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [nonMinesCount, setNonMinesCount] = useState(0);
  const [level, setOnLevelChange] = useState("Medium");

  return (
    <StyledGame>
      {(gameOver || gameWin) && (
        <Modal
          gameState={gameOver}
          setIsRestartGame={setIsRestartGame}
          setOnResetTime={setOnReset}
        />
      )}
      <TopBar
        nonMinesCount={nonMinesCount}
        onChange={setOnLevelChange}
        defaultValue={level}
        onResetTime={onReset}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
        setOnResetTime={setOnReset}
        isVolume={isVolume}
        setIsVolume={setIsVolume}
      />
      <Board
        setIsRunning={setIsRunning}
        setGameOver={setGameOver}
        setGameWin={setGameWin}
        isVolume={isVolume}
        isRestartGame={isRestartGame}
        setIsRestartGame={setIsRestartGame}
        level={level}
        nonMinesCount={nonMinesCount}
        setNonMinesCount={setNonMinesCount}
      />
    </StyledGame>
  );
};

export default Game;

const StyledGame = styled.div`
  box-shadow: 0 4px 3px rgba(0, 0, 0, 0.3);
  position: relative;

  .GridBoard {
    display: flex;
  }
`;
