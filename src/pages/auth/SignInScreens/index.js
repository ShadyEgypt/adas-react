import { useState } from "react";
import SignInScreen from "./SignIn/SignIn";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import NewPassword from "./NewPassword/NewPassword";

const SignInScreens = () => {
  const [activeScreen, setActiveScreen] = useState("signin");
  const handleRouting = (val) => {
    setActiveScreen(val);
  };
  return (
    <>
      {activeScreen === "signin" ? (
        <SignInScreen changeScreen={handleRouting} />
      ) : activeScreen === "forgot" ? (
        <ForgotPassword changeScreen={handleRouting} />
      ) : activeScreen === "new" ? (
        <NewPassword changeScreen={handleRouting} />
      ) : (
        <></>
      )}
    </>
  );
};

export default SignInScreens;
