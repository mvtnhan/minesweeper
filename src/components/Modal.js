import React, { useState, useEffect } from "react";
import styled from "styled-components";

import ImgWin from "../images/win.jpg";
import ImgLose from "../images/lose.png";

export default function Modal({ setIsRestartGame, gameState, setOnResetTime }) {
  const [render, setRender] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setRender(true);
    }, 1000);
  }, []);

  const onReset = () => {
    setOnResetTime(true);
    setIsRestartGame(render);
  };

  return (
    <StyledModal
      style={{
        opacity: render ? 1 : 0,
      }}
    >
      <div>
        {gameState ? (
          <div className="GameOverImage Img" />
        ) : (
          <div className="NewGameImage Img" />
        )}

        <div className="TryAgain" onClick={onReset}>
          {gameState ? "Try Again" : "New Game"}
        </div>
      </div>
    </StyledModal>
  );
}

const StyledModal = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);

  .Img {
    opacity: 100;
    z-index: 4;
    height: 208px;
    max-width: 100%;
    margin: 20% 50px 8px;
    background-repeat: repeat-x;
    border-radius: 8px;
    position: relative;
    padding-top: 8px;
  }

  .GameOverImage {
    background: url(${ImgLose});
  }

  .NewGameImage {
    background: url(${ImgWin}) 0px;
    background-size: auto;
    background-position: center;
  }

  .TryAgain {
    cursor: pointer;
    margin: 0 50px;
    border-radius: 7px;
    background: darkgreen;
    color: rgb(158, 255, 158);
    padding: 10px;
    font-weight: 700;
    text-align: center;
  }
`;
