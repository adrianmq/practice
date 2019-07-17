/* 
  Source
  https://moduscreate.com/blog/ext-js-react-list/
*/
import React, { Component } from "react";
import "./Selectable.css";

class Selectable extends Component {
  static defaultProps = {
    itemSelector: ".list-item"
  };

  state = {
    selected: []
  };

  handleClick = e => {
    const item = this.getItemFromEvent(e);

    if (!item) {
      // if the click starts on one itme and ends on another
      return;
    }

    const selectedId = parseInt(item.getAttribute("data-id"), 10);
    const { data, selection, onSelection } = this.props;

    let { selected } = this.state;
    let add = true;

    if (selection === "multi" && (selected[selected.length - 1])) {
      const last = selected[selected.length - 1]
      const lastIdx = data.findIndex(item => item.id === last);
      const currentIdx = data.findIndex(item => item.id === selectedId);

      if (lastIdx === currentIdx) {
        // indices are the same, deselect
        selected.splice(currentIdx - 1, 1);
        add = false;
      }

      if (e.shiftKey) {
        if (lastIdx !== -1 && currentIdx !== -1) {
          // get all items between the last selected item
          // and the current clicked item
          if (lastIdx < currentIdx) {
            for (let i = lastIdx + 1; i < currentIdx; i++) {
              selected.push(data[i].id);
            }
          } else {
            for (let i = lastIdx - 1; i > currentIdx; i--) {
              selected.push(data[i].id);
            }
          }
        }
      } else if (!e.ctrlKey) {
        // shift or ctrl keys were not pressed, need to clear out
        // so only the item being clicked on is selected
        selected.length = 0;
      }
    } else {
      // single mode, clear out the array
      selected.length = 0;
    }

    if (add) {
      selected.push(selectedId);
    }

    if (selected.length > 1) {
      // remove duplicates
      selected = [...new Set(selected)];
    }

    this.setState({
      selected
    });

    if (typeof onSelection === "function") {
      onSelection(selected.map(id => data.find(item => item.id === id)));
    }
  };

  getItemFromEvent(e) {
    let el = e.target;
    let matcher = el.matches ? "matches" : "msMatchesSelector";
    let selector = this.props.itemSelector;

    while (!el[matcher](selector) && (el = el.parentElement));

    return el;
  }

  getSelectedCls = id => {
    const className = this.state.selected.includes(id) ? "list-item-selected" : "";

    return className
  };

  render() {
    const { getSelectedCls } = this;

    return (
      <dir className="selection-wrap" onClick={this.handleClick}>
        {this.props.render({ getSelectedCls })}
      </dir>
    );
  }
}

export default Selectable;
