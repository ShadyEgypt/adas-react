import { useState } from "react";
import SignInScreen from "./SignIn/SignIn";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import NewPassword from "./NewPassword/NewPassword";
import { useNavigate } from "react-router-dom";

const SignInScreens = ({ updateLoggedIn }) => {
  const navigate = useNavigate();
  const [activeScreen, setActiveScreen] = useState("signin");
  const [userInfo, setUserInfo] = useState({});
  const handleRouting = (val) => {
    if (val === "home") {
      const args = { val: true, result: userInfo };
      updateLoggedIn(args);
      console.log("sign in routed");
    } else if (val === "signup") {
      navigate("/signup", { replace: true });
    } else {
      setActiveScreen(val);
    }
  };
  return (
    <>
      {activeScreen === "signin" ? (
        <SignInScreen
          changeScreen={handleRouting}
          setUserInformation={setUserInfo}
        />
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
