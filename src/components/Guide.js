import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

import ImgA from "../images/dig.png";
import ImgB from "../images/flag.png";

const Guide = () => {
  const [showImgA, setShowImgA] = useState(true);

  const countRef = useRef();

  useEffect(() => {
    countRef.current = setInterval(() => setShowImgA(!showImgA), 1500);

    return () => clearInterval(countRef.current);
  }, [showImgA]);

  return (
    <StyledImg>
      <div className={showImgA ? "ShowA Img" : "ShowB Img"} />
    </StyledImg>
  );
};

export default Guide;

const StyledImg = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background-color: grey;

  .ShowA {
    background: url(${ImgA}) center;
  }
  .ShowB {
    background: url(${ImgB});
  }

  .Img {
    height: 140px;
    width: 140px;
    border: 8px solid black;
    border-radius: 16px;
    background-repeat: no-repeat;
    background-size: contain;
    background-color: black;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
