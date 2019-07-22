import React, { Component } from "react";

const toolbarStyle = {
  display: "inline-flex",
  flexDirection: "column",
  height: "300px",
  backgroundColor: "#d6e2ea",
  padding: "8px 6px"
};

class VerticalToolbar extends Component {
  render() {
    return (
      <div style={toolbarStyle}>
        <button>Top</button>
        <div style={{ flex: 1 }} />
        <button>Bottom</button>
      </div>
    );
  }
}

export default VerticalToolbar;
