// Source
// https://moduscreate.com/blog/ext-js-to-react-carousel/

import React from "react";
import SwipeableViews from "react-swipeable-views";
import "./Carousel.css";

class Carousel extends React.Component {
  static defaultProps = {
    activeCard: 0,
    className: "",
    position: "bottom"
  };
  state = {
    activeCard: this.props.activeCard
  };
  onNavClick(activeCard) {
    this.setState({ activeCard });
  }
  render() {
    let { className } = this.props;
    className = className ? ` ${className}` : "";

    const { children, position } = this.props;
    const { activeCard } = this.state;
    const xPositions = ["top", "bottom"],
      axis = xPositions.includes(position) ? "x" : "y";

    return (
      <div {...this.props} className={`carousel ${position}${className}`}>
        <div className={`nav-strip`}>
          {React.Children.map(children, (child, i) => {
            const isActive = i === activeCard ? "active" : "";
            return (
              <div
                onClick={this.onNavClick.bind(this, i)}
                className={`nav ${isActive}`}
              >
                <span className="nav-dot" />
              </div>
            );
          })}
        </div>
        <SwipeableViews
          index={activeCard}
          onChangeIndex={this.onNavClick.bind(this)}
          enableMouseEvents={true}
          axis={axis}
        >
          {React.Children.map(children, (child, i) => {
            let { className } = child.props;
            className = className ? ` ${className}` : "";

            const isActive = i === activeCard ? " active" : "";
            const cardProps = {
              ...child.props,
              style: { flex: 1 },
              className: `card${isActive}${className}`,
              cardindex: i,
              activeCard
            };

            return React.cloneElement(child, cardProps);
          })}
        </SwipeableViews>
      </div>
    );
  }
}

export default Carousel;
