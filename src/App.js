import React, { Component } from 'react';
import './App.css';
import Images from "./components/Images";

class App extends Component {
  render() {
    return (
      <div className="App">
      <h1>Home Screen</h1>
      <Images/>
      </div>
    );
  }
}

export default App;
