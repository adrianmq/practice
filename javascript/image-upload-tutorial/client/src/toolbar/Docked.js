import React from "react";
import { default as Toolbar } from "./Vertical";

const panelStyle = {
  display: "flex",
  width: "450px",
  margin: "0 auto",
  border: "1px solid #d6e2ea"
};

const DockedToolbar = () => (
  <div style={panelStyle}>
    <Toolbar style={{ display: "inline-flex", flexDirection: "column" }} />
    <div
      style={{
        display: "flex",
        flex: 1,
        overflowX: "auto",
        padding: "8px",
        whiteSpace: "nowrap"
      }}
    >
      a b c d e f g a b c d e f g a b c d e f g a b c d e f g a b c d e f g a b
      c d e f g
    </div>
  </div>
);

export default DockedToolbar;
