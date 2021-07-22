import React from "react";
import styled from "styled-components";

import "./App.css";
import Board from "./components/Board.js";
import ImgBG from "./images/bg-game.jpg";

const App = () => {
  return (
    <StyledApp>
      <h1>Minesweeper</h1>
      <Board />
    </StyledApp>
  );
};

export default App;

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background-image: url(${ImgBG});
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
