import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useTimer from "../hooks/useTime";
// import formatTime from "../util/formatTime";
import createBoard from "../util/createBoard";
import Cell from "./Cell";
import revealed from "../util/reveal";
import TopBar from "./TopBar";
import Modal from "./Modal";
import { BOARD_GAME } from "../util/constants";
import { audioRevealed, audioGameOver, audioGameWin } from "../util/audio";

const Board = () => {
  const [board, setBoard] = useState([]);
  const [mineLocations, setMineLocations] = useState([]);
  const [nonMinesCount, setNonMinesCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [restart, setRestart] = useState(false);
  const [gameWin, setGameWin] = useState(false);
  const [level, setOnLevelChange] = useState("Medium");
  const [volume, setVolume] = useState(true);

  const { timer, start, handlePaused, handleReset } = useTimer(0);

  useEffect(() => {
    // Creating a board
    const generateBoard = () => {
      const getBoard = createBoard(
        BOARD_GAME[level].numRow,
        BOARD_GAME[level].numColumn,
        BOARD_GAME[level].numBomb,
        setMineLocations
      ); // createBoard return board  & mineLocation

      setNonMinesCount(
        BOARD_GAME[level].numColumn * BOARD_GAME[level].numRow -
          BOARD_GAME[level].numBomb
      );
      setBoard(getBoard.board);
      setMineLocations(getBoard.mineLocation);
      setGameOver(false);
      setGameWin(false);
      setRestart(false);
      // setMuted(false);
    };

    // Calling the function
    generateBoard();
  }, [restart, setRestart, level, setOnLevelChange]);

  const updateBoard = (x, y, e) => {
    let newBoardValues = JSON.parse(JSON.stringify(board));
    let newNonMinesCount = nonMinesCount;

    if (newBoardValues[x][y].value === "X") {
      for (let i = 0; i < mineLocations.length; i++) {
        if (
          !newBoardValues[mineLocations[i][0]][mineLocations[i][1]].revealed
        ) {
          newBoardValues[mineLocations[i][0]][
            mineLocations[i][1]
          ].revealed = true;
          setBoard(newBoardValues);
        }
      }
      setGameOver(true);
      handlePaused();
      if (volume) {
        audioGameOver();
      }
    } else {
      // newBoardValues[x][y].revealed = true;
      newBoardValues = revealed(newBoardValues, x, y, newNonMinesCount);
      if (!newBoardValues) {
        return;
      }
      if (newBoardValues.newNonMinesCount === 0) {
        setGameWin(true);
        handlePaused();
        if (volume) {
          audioGameWin();
        }
      }
      setBoard(newBoardValues.arr);
      setNonMinesCount(newBoardValues.newNonMinesCount);
    }
  };

  const flagCell = (x, y) => {
    let newBoardValues = JSON.parse(JSON.stringify(board));
    newBoardValues[x][y].flagged = !newBoardValues[x][y].flagged;
    setBoard(newBoardValues);
  };

  return (
    <StyledBoard>
      {(gameOver || gameWin) && (
        <Modal
          reset={setRestart}
          gameState={gameOver ? "over" : "win"}
          handleReset={handleReset}
          handlePaused={handlePaused}
        />
      )}
      <TopBar
        gameReset={gameOver || gameWin ? true : false}
        nonMinesCount={nonMinesCount}
        onChange={setOnLevelChange}
        defaultValue={level}
        timer={timer}
        handleReset={handleReset}
        volume={volume}
        setVolume={setVolume}
      />
      {board.map((row, indexRow) => {
        return (
          <div className="GridBoard" key={indexRow}>
            {row.map((singleCell, index) => {
              return (
                <Cell
                  key={index}
                  data={singleCell}
                  updateBoard={updateBoard}
                  flagCell={flagCell}
                  start={start}
                  handleReset={handleReset}
                  // handlePaused={handlePaused}
                  volume={volume}
                  audioRevealed={audioRevealed}
                  audioGameOver={audioGameOver}
                  timer={timer}
                />
              );
            })}
          </div>
        );
      })}
    </StyledBoard>
  );
};

export default Board;

const StyledBoard = styled.div`
  box-shadow: 0 4px 3px rgba(0, 0, 0, 0.3);
  position: relative;

  .GridBoard {
    display: flex;
  }
`;
