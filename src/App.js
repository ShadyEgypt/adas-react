import "./App.scss";
import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppNav from "./navigation/AppNavigation";

function App() {
  return (
    <BrowserRouter>
      <div className="container-app">
        <AppNav />
      </div>
    </BrowserRouter>
  );
}

export default App;
