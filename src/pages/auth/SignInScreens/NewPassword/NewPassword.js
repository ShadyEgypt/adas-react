import React, { useState } from "react";
import "./NewPassword.scss";
import Logo from "../../../../components/Logo/Logo";
import CustomInput from "../../../../components/CustomInput";
import CustomButton from "../../../../components/CustomButton";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";

const NewPasswordScreen = ({ changeScreen }) => {
  const { control, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmitPressed = (data) => {
    console.warn(data);
    navigate("/home", { replace: true });
  };

  const onSignInPress = () => {
    changeScreen("signin");
  };

  return (
    <div className="newPassRoot">
      <Logo />
      <h1 className="titleNewPass">Reset your password</h1>
      <CustomInput
        placeholder="Code"
        name="code"
        control={control}
        rules={{ required: "Code is required" }}
      />

      <CustomInput
        placeholder="Enter your new password"
        name="name"
        control={control}
        secureTextEntry
        rules={{
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password should be at least 8 characters long",
          },
        }}
      />

      <CustomButton text="Submit" onPress={handleSubmit(onSubmitPressed)} />

      <CustomButton
        text="Back to Sign in"
        onPress={onSignInPress}
        type="TERTIARY"
      />
    </div>
  );
};

export default NewPasswordScreen;
