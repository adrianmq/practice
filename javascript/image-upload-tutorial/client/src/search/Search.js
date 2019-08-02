import React, { Component } from "react";
import ItemList from "./ItemList";

class Search extends Component {
  static cssDangerClass = "is-danger";

  constructor(props) {
    super(props);
    this.state = { items: [] };

    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  addItem(e) {
    e.preventDefault();
    let items = [...this.state.items];
    const newItem = document.getElementById("addInput");
    const form = document.getElementById("addItemForm");

    if (newItem.value === "") {
      newItem.classList.add(this.cssDangerClass);
      return false;
    }

    items.push({
      value: newItem.value,
      id: `${Date.now()}-${newItem.value}`
    });
    this.setState(state => ({ items }));
    newItem.classList.remove(this.cssDangerClass);
    form.reset();
  }

  removeItem(item) {
    const items = this.state.items.slice();
    items.some((el, i) => {
      if (el.value === item.value) {
        items.splice(i, 1);
        return true;
      }
    });
    this.setState(state => {
      return { items: items };
    });
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <section>
              <ItemList items={this.state.items} delete={this.removeItem} />
            </section>
            <hr />
            <section>
              <form className="form" id="addItemForm">
                <input
                  type="text"
                  className="input"
                  id="addInput"
                  placeholder="Something that needs to be done..."
                />
                <button className="button is-info" onClick={this.addItem}>
                  Add Item
                </button>
              </form>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
