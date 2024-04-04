import React, { useState } from "react";
import CustomInput from "../../../../components/CustomInput";
import CustomButton from "../../../../components/CustomButton";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Logo from "../../../../components/Logo/Logo";
import "./ForgotPassword.scss";

const ForgotPasswordScreen = ({ changeScreen }) => {
  const { control, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSendPressed = (data) => {
    console.warn(data);
    changeScreen("new");
  };

  const onSignInPress = () => {
    changeScreen("signin");
  };

  return (
    <div className="forgotPassRoot">
      <Logo />
      <h1 className="titleForgotPass">Reset your password</h1>

      <CustomInput
        name="username"
        control={control}
        placeholder="Username"
        rules={{
          required: "Username is required",
        }}
      />

      <CustomButton text="Send" onPress={handleSubmit(onSendPressed)} />

      <CustomButton
        text="Back to Sign in"
        onPress={onSignInPress}
        type="TERTIARY"
      />
    </div>
  );
};

export default ForgotPasswordScreen;
