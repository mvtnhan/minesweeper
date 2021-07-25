import React from "react";
import styled from "styled-components";

const Volume = ({ isVolume, setIsVolume }) => {
  const onChangeVol = () => {
    setIsVolume(!isVolume);
  };

  return <StyledVol onClick={onChangeVol}>{isVolume ? "🔊" : "🔈"}</StyledVol>;
};

export default Volume;

const StyledVol = styled.span`
  width: 28px;
  font-size: 20px;
  :hover {
    cursor: pointer;
  }
`;
