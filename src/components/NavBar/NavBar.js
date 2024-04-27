import "./navbar.scss";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import { Auth } from "aws-amplify";

const NavBar = ({ isLoggedInState, updateLoggedIn }) => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  async function handleSignOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }
  const handleLogout = () => {
    handleSignOut();
    context.setContextState((prevState) => ({
      ...prevState,
      isLoggedIn: false,
    }));
    updateLoggedIn(false);
  };
  const handleSignIn = () => {
    navigate("/signin", { replace: true });
  };
  const handleSignUp = () => {
    navigate("/signup", { replace: true });
  };
  return (
    <div className="navbar">
      <div className="main-navigation__logo">
        <Link
          className="logo-link"
          to="/home"
          style={{ textDecoration: "none" }}
        >
          <span className="logo-span">Electro Mobility</span>
        </Link>
      </div>
      <nav className="main-navigation__items">
        <ul>
          {isLoggedInState !== undefined && isLoggedInState === true ? (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          ) : isLoggedInState === undefined || isLoggedInState === false ? (
            <>
              <li>
                <button onClick={handleSignIn}>Sign In</button>
              </li>
              <li>
                <button onClick={handleSignUp}>Sign Up</button>
              </li>
            </>
          ) : (
            <></>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
