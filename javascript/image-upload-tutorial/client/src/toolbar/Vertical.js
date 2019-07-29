import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import messages from "./messages";

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
        <button>
          <FormattedMessage {...messages.buttonTop} />
        </button>
        <div style={{ flex: 1 }} />
        <button>
          <FormattedMessage {...messages.buttonBottom} />
        </button>
      </div>
    );
  }
}

export default VerticalToolbar;
