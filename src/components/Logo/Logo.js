import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Logo = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const onImgPressed = (event) => {
    event.preventDefault();
    navigate("/", { replace: true });
  };

  const buttonStyle = {
    width: isHovered ? "220px" : "200px", // Increase width on hover
    height: isHovered ? "220px" : "200px", // Increase height on hover
    backgroundImage: `url('/electrogreen_logo.jpeg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    border: "none",
    backgroundColor: "transparent",
    cursor: "default",
    transition: "width 0.3s ease, height 0.3s ease",
  };

  return (
    <button
      className="signInLogoButton"
      onClick={onImgPressed}
      style={buttonStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      alt="Logo"
    >
      {/* Button Content */}
    </button>
  );
};

export default Logo;
