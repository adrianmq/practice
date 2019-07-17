import React from "react";
import Spinner from "../app/Spinner";
import ListItem from "./ListItem";
import Selectable from "./Selectable";
import { createSorter } from "../util/Sort";
import { createFilter } from "../util/Filter";
import { v4 } from "node-uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/fontawesome-free-brands";

class List extends React.Component {
  state = {
    sorters: this.props.sorters,
    filters: this.props.filters
  };

  static defaultProps = {
    filters: [
      {
        property: "name",
        value: "dori"
      },
      {
        property: "company",
        value: "a"
      }
    ],
    sorters: [
      {
        property: "name"
      },
      {
        property: "company"
      }
    ]
  };

  componentDidMount() {
    fetch("/data.json")
      .then(res => res.json())
      .then(this.onLoad);
  }

  onLoad = data => {
    this.setState({
      data: this.parseData(data)
    });
  };

  parseData(data) {
    const { sorters } = this.state;

    if (data && data.length) {
      if (Array.isArray(sorters) && sorters.length) {
        data.sort(createSorter(...sorters));
      }
    }
    return data;
  }

  render() {
    const { data } = this.state;

    return (
      <div style={{ textAlign: "center" }}>
        {data ? this.renderData(data) : this.renderLoading()}
      </div>
    );
  }

  renderData(data) {
    if (!(data && data.length)) {
      return <div>No items found</div>;
    }

    const { filters } = this.state;
    if (Array.isArray(filters) && filters.length) {
      data = data.filter(createFilter(...filters));
    }

    return (
      <Selectable
        selection="multi"
        data={data}
        onSelection={this.handleSelectionChange}
        render={({ getSelectedCls }) => {
          return data.map(item => (
              <ListItem
                key={v4()}
                className={getSelectedCls(item.id)}
                toolPosition="left"
                {...item}
              >
                <FontAwesomeIcon icon={faGithub} size="1x" />
                <span>{item.id}</span>
              </ListItem>
          ));
        }}
      />
    );
  }

  renderLoading() {
    return <Spinner />;
  }

  handleItemClick(e) {
    console.log(`Item clicked ${e.target.value}`);
  }

  handleSelectionChange(selected) {
    console.log(`selection count: ${selected.length}`);
  }
}

export default List;
