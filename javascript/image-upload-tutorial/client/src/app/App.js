import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Notifications from "react-notify-toast";
import UploadImage from "./UploadImage";
import Footer from "./Footer";
import { default as DockedToolbar } from "../toolbar/Docked";
import { Localizer, DEFAULT_LANGUAGE } from "../util/Localizer";
import { loadState, saveState } from "../util/LocalStorage";
import FadeIn from "../layout/FadeIn";
import Grid from "../grid/Grid";
import List from "../list/List";
import "./App.css";

const FadeInComponent = ({ component: Component, ...rest }) => {
  return (
    <FadeIn>
      <Component {...rest} />
    </FadeIn>
  );
};

const GridRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps => <FadeInComponent component={Component} />}
    />
  );
};

const ListRoute = ({ component: Component, ...rest }) => {
  const sorters = [{ property: "name", direction: "DESC" }];
  const filters = [{ property: "name", value: "rico" }];

  return (
    <Route
      {...rest}
      render={routeProps => (
        <FadeInComponent
          component={Component}
          sorters={sorters}
          filters={filters}
        />
      )}
    />
  );
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = Object.assign(
      {},
      {
        locale: DEFAULT_LANGUAGE,
        shouldLocalize: true
      },
      loadState()
    );

    this.updateLocale = this.updateLocale.bind(this);
  }

  updateLocale({ locale }) {
    locale = !locale ? DEFAULT_LANGUAGE : locale.toLowerCase();

    const stateChanges = { locale: locale, shouldLocalize: false };

    saveState(Object.assign({}, loadState(), stateChanges));
    this.setState(() => stateChanges);
  }

  render() {
    const shouldLocalize = this.state.shouldLocalize;

    return (
      <React.Fragment>
        <Localizer
          updateLocale={this.updateLocale}
          shouldLocalize={shouldLocalize}
        />
        <Router {...this.props}>
          <div className="container">
            <Notifications />
            <DockedToolbar />
            <Route exact path="/" component={UploadImage} />
            <GridRoute exact path="/grid" component={Grid} />
            <ListRoute exact path="/list" component={List} />
            <Footer />
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
