import React, { useEffect, useState } from "react";

import Cell from "./Cell";
import revealed from "../util/reveal";
import createBoard from "../util/createBoard";

import { BOARD_GAME } from "../util/constants";
import {
  audioRevealed,
  audioFlagged,
  audioGameOver,
  audioGameWin,
} from "../util/audio";
import Guide from "./Guide";

const Board = ({
  setIsRunning,
  setGameOver,
  setGameWin,
  isVolume,
  isRestartGame,
  setIsRestartGame,
  level,
  setMinesCount,
  minesCount,
  gameOver,
}) => {
  const [board, setBoard] = useState([]);
  const [nonMinesCount, setNonMinesCount] = useState(0);
  const [mineLocations, setMineLocations] = useState([]);
  const [showGuide, setShowGuide] = useState(true);

  useEffect(() => {
    const generateBoard = () => {
      const getBoard = createBoard(
        BOARD_GAME[level].numRow,
        BOARD_GAME[level].numColumn,
        BOARD_GAME[level].numBomb,
        setMineLocations
      );

      setNonMinesCount(
        BOARD_GAME[level].numColumn * BOARD_GAME[level].numRow -
          BOARD_GAME[level].numBomb
      );
      setMinesCount(BOARD_GAME[level].numBomb);
      setBoard(getBoard.board);
      setMineLocations(getBoard.mineLocation);
      setGameOver(false);
      setGameWin(false);
      setIsRestartGame(false);
    };

    generateBoard();
  }, [
    isRestartGame,
    setIsRestartGame,
    level,
    setGameOver,
    setGameWin,
    setNonMinesCount,
    setMinesCount,
  ]);

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
      setIsRunning(false);
      isVolume && audioGameOver();
    } else {
      newBoardValues = revealed(newBoardValues, x, y, newNonMinesCount);
      if (!newBoardValues) {
        return;
      }
      if (newBoardValues.newNonMinesCount === 0) {
        setGameWin(true);
        setIsRunning(false);

        isVolume && audioGameWin();
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

  const handleShowGuide = () => {
    setShowGuide(false);
  };

  return (
    <div style={{ position: "relative" }} onClick={handleShowGuide}>
      {showGuide && <Guide />}
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
                  start={setIsRunning}
                  gameOver={gameOver}
                  minesCount={minesCount}
                  setMinesCount={setMinesCount}
                  isVolume={isVolume}
                  audioRevealed={audioRevealed}
                  audioFlagged={audioFlagged}
                  audioGameOver={audioGameOver}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
