import React, { useState } from "react";
import "./style.scss";
import { styled } from "styled-components";

const StyledSpan = styled.span`
  width: ${(props) => (props.$width ? `${props.$width}px` : "fit-content")};
`;

const HoverableDiv = ({
  optionSelected = false,
  handleClick,
  name,
  screen,
  width = 450,
  condition = false,
  isButton = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const SelectionStyle = `${
    optionSelected ? "selected" : isHovered ? "hovered" : "neither-nor"
  }`;
  const ButtonStyle = `${condition ? "button-hovered" : "button-neither-nor"}`;
  return (
    <div
      className="option"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => handleClick(screen)}
    >
      <StyledSpan
        className={`button-text 
        ${!isButton ? SelectionStyle : ButtonStyle}
        `}
        $width={width}
      >
        {name}
      </StyledSpan>
    </div>
  );
};

export default HoverableDiv;
