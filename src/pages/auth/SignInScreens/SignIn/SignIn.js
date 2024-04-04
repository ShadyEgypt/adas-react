import React, { useState, useContext } from "react";
import "./SignIn.scss";
import Logo from "../../../../components/Logo/Logo";
import CustomInput from "../../../../components/CustomInput";
import CustomButton from "../../../../components/CustomButton";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { AuthContext } from "../../../../context/auth-context";
// import { UsersAPI } from "../../../api/users";
const SignInScreen = ({ changeScreen }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSignInPressed = async (data) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      await Auth.signOut();
      const username = data.username;
      const password = data.password;
      const signInOutput = await Auth.signIn(username, password);
      console.log(signInOutput);
      if (signInOutput.attributes.sub !== null) {
        try {
          // const res = await UsersAPI.getUser(signInOutput.attributes.sub);
          // const { name, username, id } = res.data.userByCognito;
          // console.log(name, username, id);
          context.setContextState((prevState) => ({
            ...prevState,
            isLoggedIn: true,
          }));
          navigate("/home", { replace: true });
          // context.setContextState({
          //   isLoggedIn: true,
          // mongoId: id,
          // userId: signInOutput.attributes.sub,
          // name: name,
          // username: username,
          // });
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log("Sign-in was not successful");
      }
    } catch (e) {
      console.log("Opps", e.message);
    } finally {
      setLoading(false);
    }
  };

  const onForgotPasswordPressed = () => {
    changeScreen("forgot");
  };

  const onSignUpPress = () => {
    navigate("/signup", { replace: true });
  };

  return (
    <div className="signInRoot">
      <Logo />
      <h1 className="titleSignIn">Sign In</h1>

      <CustomInput
        name="username"
        placeholder="Username"
        control={control}
        rules={{ required: "Username is required" }}
      />

      <CustomInput
        name="password"
        placeholder="Password"
        secureTextEntry
        control={control}
        rules={{
          required: "Password is required",
          minLength: {
            value: 3,
            message: "Password should be minimum 3 characters long",
          },
        }}
      />

      <CustomButton
        text={loading ? "Loading" : "Sign In"}
        onPress={handleSubmit(onSignInPressed)}
      />

      <CustomButton
        text="Forgot password?"
        onPress={onForgotPasswordPressed}
        type="TERTIARY"
      />

      <CustomButton
        text="Don't have an account? Create one"
        onPress={onSignUpPress}
        type="TERTIARY"
      />
    </div>
  );
};

export default SignInScreen;
