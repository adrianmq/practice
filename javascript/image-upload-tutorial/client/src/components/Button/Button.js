import React from "react";
import "./Button.css";

export default props => (
  <button onClick={props.onClick} className="top-toolbar">
    {props.children}
  </button>
);
