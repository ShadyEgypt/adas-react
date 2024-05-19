import React from "react";
import { useContext, useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { Auth } from "aws-amplify";
import { UsersAPI } from "../api/users";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

//Auth pages
import SignUpScreens from "../pages/auth/SignUpScreens";
import SignInScreens from "../pages/auth/SignInScreens";

//App pages
import Home from "../pages/home/Home";
import BddStorage from "../pages/storage/bdd-storage/BddStorage";
import UserStorage from "../pages/storage/user-storage/UserStorage";
import ModelsScreens from "../pages/models/index";

function AppNav() {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const { isLoggedIn, setContextState } = context;
  const [isLoggedInState, setIsLoggedInState] = useState(false);

  const updateLoggedIn = (val) => {
    setIsLoggedInState(val);
    if (val) {
      console.log("state updated");
      <Navigate to="/home" replace />;
    } else {
      <Navigate to="/signin" replace />;
    }
  };

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const resCognito = await Auth.currentAuthenticatedUser();
        console.log(resCognito);

        const resMongo = await UsersAPI.getUser(resCognito.attributes.sub);
        console.log(resMongo);
        const { name, username, id } = resMongo;
        const result = {
          name,
          username,
          mongoId: id,
          congnitoId: resCognito.attributes.sub,
        };
        setContextState({
          isLoggedIn: true,
          mongoId: id,
          cognitoId: resCognito.attributes.sub,
          name: name,
          username: username,
        });
        setIsLoggedInState(true);
        return true;
      } catch (error) {
        console.log("Oops", error.message);
        setContextState({
          isLoggedIn: false,
        });
        setIsLoggedInState(false);
        return false;
      }
    };
    const fetchData = async () => {
      const res = await checkAuthState();
      console.log(res);

      if (res) {
        navigate("/home", { replace: true });
      } else {
        navigate("/signin", { replace: true });
      }
    };

    fetchData();
    console.log(isLoggedInState);
  }, []);

  return (
    <>
      <NavBar
        isLoggedInState={isLoggedInState}
        updateLoggedIn={updateLoggedIn}
      />
      {isLoggedInState ? (
        <>
          <div className="container-sidebar">
            <SideBar />
          </div>
        </>
      ) : (
        <></>
      )}

      <div className="container-component">
        <Routes>
          {/* public routes */}
          <Route
            path="/signin"
            element={
              isLoggedInState === undefined || isLoggedInState === false ? (
                <SignInScreens updateLoggedIn={updateLoggedIn} />
              ) : (
                <Navigate to="/home" replace />
              )
            }
          />
          <Route
            path="/signup"
            element={
              !isLoggedInState ? (
                <SignUpScreens />
              ) : (
                <Navigate to="/home" replace />
              )
            }
          />
          {/* protected routes */}
          <Route
            path="/home"
            element={
              isLoggedInState !== undefined && isLoggedInState === true ? (
                <Home />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />

          <Route
            path="/models"
            element={
              isLoggedInState !== undefined && isLoggedInState === true ? (
                <ModelsScreens />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="/bdd-data"
            element={
              isLoggedInState !== undefined && isLoggedInState === true ? (
                <BddStorage />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="/user-data"
            element={
              isLoggedInState !== undefined && isLoggedInState === true ? (
                <UserStorage />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default AppNav;
