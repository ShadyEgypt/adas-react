import './landing.scss';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useState, useEffect } from 'react';

function Landing() {
  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight
  });
  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight
    });
  };

  useEffect(() => {
    window.addEventListener('resize', setDimension);

    return () => {
      window.removeEventListener('resize', setDimension);
    };
  }, [screenSize]);

  const buttonStyle = {
    width: '200px',
    height: '200px', // Increase height on hover
    backgroundImage: `url('/electrogreen_logo.jpeg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'default',
    transition: 'width 0.3s ease, height 0.3s ease'
  };
  return (
    <div className="landing-con">
      <div className="spacer" style={{ height: screenSize.dynamicHeight / 4 }}></div>
      <div className="content" style={{ height: screenSize.dynamicHeight / 3 }}>
        <button className="signInLogoButton" style={buttonStyle} alt="Logo">
          {/* Button Content */}
        </button>
        <CircularProgress />
      </div>
    </div>
  );
}

export default Landing;
