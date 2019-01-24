import React, { Component } from 'react';
import './App.css';
import Images from "./components/Images";
import Navbar from "./components/Navbar";

class App extends Component {
  render() {
    return (
      <div className="App">
      <Navbar/>
      <Images/>
      </div>
    );
  }
}

export default App;
