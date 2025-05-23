import React, { Component, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import "./home.scss";
import Iot from "../iot/Iot";

function withNavigation(Component) {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

const Home = () => {
  const context = useContext(AuthContext);

  const { name, username, cognitoId, mongoId } = context;

  return (
    <>
      <div className="container-home">
        {/* <h1>Hi {username}!</h1> */}
        <Iot />
      </div>
    </>
  );
};

export default withNavigation(Home);
