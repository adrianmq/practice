import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import Button from "../components/Button/Button";
import SegmentedButton from "../components/SegmentedButton/SegmentedButton";
import getData from "./Data";
import "semantic-ui-css/semantic.min.css";

const { data } = getData();
const { Divider, Item, Menu } = Dropdown;

class Grid extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleHeaderClick = this.handleHeaderClick.bind(this);
  }

  handleAddUser = () => {
    console.log("add user");
  };

  handleRemoveUser = () => {
    console.log("remove user");
  };

  getSort(dataIndex, sort) {
    return sort && sort.dataIndex === dataIndex ? `(${sort.direction})` : null;
  }

  handleHeaderClick = dataIndex => {
    const { sort } = this.state;

    const direction =
      sort && sort.dataIndex === dataIndex
        ? sort.direction === "ASC"
          ? "DESC"
          : "ASC"
        : "ASC";

    this.setState({
      sort: { dataIndex, direction }
    });
  };

  render() {
    const { className } = this.props;
    const { sort } = this.state;

    return (
      <div style={{ textAlign: "center", marginTop: "500px" }}>
        <SegmentedButton>
          <button value="one">One</button>
          <button value="two">Two</button>
          <button value="three">Three</button>
        </SegmentedButton>
        <Button onClick={this.handleButtonClick}>Initial</Button>
        <Dropdown
          text="User Controls"
          icon="add user"
          className="icon"
          floating
          labeled
          button
        >
          <Menu>
            <Item onClick={this.handleAddUser}>Add User</Item>
            <Divider />
            <Item onClick={this.handleRemoveUser}>Remove User</Item>
          </Menu>
        </Dropdown>
        <table
          style={{ margin: "0 auto" }}
          className={`grid ${className ? className : ""}`}
        >
          <thead>
            <tr>
              <th onClick={() => this.handleHeaderClick("name")}>
                Name{this.getSort("name", sort)}
              </th>
              <th onClick={() => this.handleHeaderClick("company")}>
                Company{this.getSort("company", sort)}
              </th>
              <th onClick={() => this.handleHeaderClick("email")}>
                Email{this.getSort("email", sort)}
              </th>
            </tr>
          </thead>
          <tbody>
            {this.sortData(data, sort).map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.company}</td>
                <td>{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  sortData(data, sort) {
    if (!sort) {
      return data;
    }

    const { dataIndex, direction } = sort;
    const dir = direction === "ASC" ? 1 : -1;

    return data.slice().sort((A, B) => {
      const a = A[dataIndex];
      const b = B[dataIndex];

      if (a > b) {
        return 1 * dir;
      }
      if (a < b) {
        return -1 * dir;
      }
      return 0;
    });
  }
}

export default Grid;
