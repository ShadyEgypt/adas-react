import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import amplifyconfig from "./amplifyconfiguration.json";
import { Amplify } from "aws-amplify";
Amplify.configure(amplifyconfig);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
