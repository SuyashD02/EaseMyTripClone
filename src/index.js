import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Routing from "./components/Routing";
import { AuthProvider } from "./components/Context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
    <AuthProvider>
    <Routing />
    </AuthProvider>

);
