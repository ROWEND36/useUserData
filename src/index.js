import React from "react";
import ReactDOM from "react-dom";
import UserDataDemo from "./UserDataDemo";
import eruda from "eruda";

eruda.init();

ReactDOM.render(
  <React.StrictMode>
    <UserDataDemo />
  </React.StrictMode>,
  document.getElementById("root")
);
