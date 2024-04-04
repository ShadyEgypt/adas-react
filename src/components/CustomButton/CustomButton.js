import React from "react";
import "./CustomButton.scss"; // Import the CSS file

const CustomButton = ({
  onPress,
  text,
  type = "PRIMARY",
  bgColor,
  fgColor,
}) => {
  // Determine the container and text classes based on the type
  const containerClasses = `buttonContainer buttonContainer_${type}`;
  const textClasses = `buttonText buttonText_${type}`;

  return (
    <button
      onClick={onPress}
      className={containerClasses}
      style={{ backgroundColor: bgColor || "" }}
    >
      <span className={textClasses} style={{ color: fgColor || "" }}>
        {text}
      </span>
    </button>
  );
};

export default CustomButton;
