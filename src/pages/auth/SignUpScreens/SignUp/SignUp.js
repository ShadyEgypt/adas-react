import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import Logo from "../../../../components/Logo/Logo";
import "./SignUp.scss"; // Import the CSS file

import CustomInput from "../../../../components/CustomInput";
import CustomButton from "../../../../components/CustomButton";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpScreen = ({ changeScreen }) => {
  const { control, handleSubmit, watch } = useForm();
  const pwd = watch("password");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onRegisterPressed = async (data) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const { name, password, email, username } = data;
      console.log(name);
      console.log(username);
      const response = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          preferred_username: username,
        },
      });
      changeScreen("confirm", {
        state: {
          username,
          userInput: {
            name,
            username,
            cognitoId: response.userSub,
            email,
            tokens: 100,
          },
        },
      });
    } catch (e) {
      console.warn("error signing up: ", e.message);
    }
    setLoading(false);
  };

  const onSignInPress = () => {
    navigate("/signin", { replace: true });
  };

  const onTermsOfUsePressed = () => {
    console.warn("onTermsOfUsePressed");
  };

  const onPrivacyPressed = () => {
    console.warn("onPrivacyPressed");
  };

  return (
    <div className="signUpRoot">
      <Logo />
      <h1 className="titleSignUp">Create an account</h1>
      <CustomInput
        name="username"
        control={control}
        placeholder="Username"
        rules={{
          required: "Username is required",
          minLength: {
            value: 3,
            message: "Name should be at least 3 characters long",
          },
          maxLength: {
            value: 24,
            message: "Name should be max 24 characters long",
          },
        }}
      />
      <CustomInput
        name="name"
        control={control}
        placeholder="Name"
        rules={{
          required: "Name is required",
          minLength: {
            value: 3,
            message: "Name should be at least 3 characters long",
          },
          maxLength: {
            value: 24,
            message: "Name should be max 24 characters long",
          },
        }}
      />

      <CustomInput
        name="email"
        control={control}
        placeholder="Email"
        rules={{
          required: "Email is required",
          pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
        }}
      />

      <CustomInput
        name="password"
        control={control}
        placeholder="Password"
        secureTextEntry
        rules={{
          required: "Password is required",
        }}
      />
      <CustomInput
        name="password-repeat"
        control={control}
        placeholder="Repeat Password"
        secureTextEntry
        rules={{
          validate: (value) => value === pwd || "Password do not match",
        }}
      />
      <CustomButton
        text={loading ? "Loading" : "Register"}
        onPress={handleSubmit(onRegisterPressed)}
      />

      <p className="signUpText">
        By registering, you confirm that you accept our{" "}
        <span className="signUpLink" onClick={onTermsOfUsePressed}>
          Terms of Use
        </span>{" "}
        and{" "}
        <span className="signUpLink" onClick={onPrivacyPressed}>
          Privacy Policy
        </span>
      </p>

      <CustomButton
        text="Have an account? Sign in"
        onPress={onSignInPress}
        type="TERTIARY"
      />
    </div>
  );
};

export default SignUpScreen;
