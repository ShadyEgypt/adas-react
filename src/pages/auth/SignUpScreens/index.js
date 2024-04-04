import { useState } from "react";
import SignUpScreen from "./SignUp/SignUp";
import ConfirmEmail from "./ConfirmEmail/ConfirmEmail";

const SignUpScreens = () => {
  const [activeScreen, setActiveScreen] = useState("signup");
  const [args, setArgs] = useState({});
  const handleRouting = (val, args) => {
    setActiveScreen(val);
    setArgs(args);
  };
  return (
    <>
      {activeScreen === "signup" ? (
        <SignUpScreen changeScreen={handleRouting} />
      ) : activeScreen === "confirm" ? (
        <ConfirmEmail changeScreen={handleRouting} args={args} />
      ) : (
        <></>
      )}
    </>
  );
};

export default SignUpScreens;
