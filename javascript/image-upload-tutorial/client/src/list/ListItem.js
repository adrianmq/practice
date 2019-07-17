/* 
  Source
  https://moduscreate.com/blog/ext-js-react-list/
*/
import React from "react";
import "./ListItem.css";

const ListItem = props => {
  const {
    children,
    className = "",
    id,
    name,
    email,
    company,
    hireDate,
    onClick,
    toolPosition
  } = props;
  const toolsCls = toolPosition === "left" ? "item-tools-left" : "";

  return (
    <div
      key={id}
      className={`list-item ${className} ${toolsCls}`}
      onClick={onClick}
      data-id={id}
    >
      <div className="body">
        <div className="main">
          {name}, {email}
        </div>
        <div className="secondary">
          {company}
          <span className="meta">(hired: {hireDate})</span>
        </div>
      </div>
      <div className="tools">{children}</div>
    </div>
  );
};

export default ListItem;
