import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import Beers from "./component/beer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Beers />
      </div>
    );
  }
}

export default connect((state) => state.app)(App);
