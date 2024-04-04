import React, { Component, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar";
import { AuthContext } from "../../context/auth-context";
import "./home.scss";
import { uFilesAPI } from "../../api/ufiles";
function withNavigation(Component) {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

const Home = () => {
  const context = useContext(AuthContext);

  const { name, username, userId, mongoId } = context;

  return (
    <>
      <div className="container-sidebar">
        <SideBar />
      </div>
      <div className="container-component">
        <div className="container-home">
          <h1>Hi Shady!</h1>
        </div>
      </div>
    </>
  );
};

export default withNavigation(Home);
