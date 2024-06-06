import React, { useContext } from "react";
import CustomInput from "../../../../components/CustomInput";
import CustomButton from "../../../../components/CustomButton";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import { confirmSignUp, resendSignUpCode } from "aws-amplify/auth";
import { UsersAPI } from "../../../../api/users";
import { uFilesAPI } from "../../../../api/ufiles";
import "./ConfirmEmail.css";

const ConfirmEmail = ({ changeScreen, args }) => {
  const navigate = useNavigate();
  const states = args.state;
  const username = states.username;
  const userInput = states.userInput;
  console.log(userInput);
  const { control, handleSubmit } = useForm({});

  if (!username) {
    console.error("Username not provided");
    return <div>Username not provided</div>; // Return a fallback UI
  }

  const onConfirmPressed = async (data) => {
    try {
      const confirmEmailOutput = await confirmSignUp({
        username,
        confirmationCode: data.code,
      });
      console.log(confirmEmailOutput);

      if (
        confirmEmailOutput.isSignUpComplete !== undefined &&
        confirmEmailOutput.isSignUpComplete
      ) {
        const res1 = await UsersAPI.createUser(userInput);
        console.log(res1);
        const { username, id } = res1;
        const res2 = await uFilesAPI.createTree(username, id);
        console.log(res2);
        navigate("/signin", { replace: true });
      }
    } catch (error) {
      console.error("Error confirming sign up or creating user", error);
      if (error.__type === "CodeMismatchException") {
        console.warn(error.message);
      }
    }
  };

  const onSignInPress = () => {
    navigate("/signin", { replace: true });
  };

  const onResendPress = async () => {
    try {
      console.log();
      let res = await resendSignUpCode({ username });
      console.log(res);
    } catch (error) {
      console.error("Error resending code", error);
    }
  };

  return (
    <div className="root">
      <img src="/electrogreen_logo.jpeg" className="signInLogo" alt="Logo" />

      <h1 className="title">Confirm your email</h1>

      <CustomInput
        name="code"
        control={control}
        placeholder="Enter your confirmation code"
        rules={{
          required: "Confirmation code is required",
        }}
      />

      <CustomButton text="Confirm" onPress={handleSubmit(onConfirmPressed)} />

      <CustomButton
        text="Resend code"
        onPress={onResendPress}
        type="SECONDARY"
      />

      <CustomButton
        text="Back to Sign in"
        onPress={onSignInPress}
        type="TERTIARY"
      />
    </div>
  );
};

export default ConfirmEmail;
