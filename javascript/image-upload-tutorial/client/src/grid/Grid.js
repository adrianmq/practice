import React, { Component } from "react";
import getData from "./Data";

const { data } = getData();

class Grid extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleHeaderClick = this.handleHeaderClick.bind(this);
  }

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
