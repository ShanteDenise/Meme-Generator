import React, { Component } from 'react';
import './App.css';
import Images from "./components/Images";
import Navbar from "./components/Navbar";
import HeaderImage from "./components/HeaderImage";

class App extends Component {
  render() {
    return (
      <div className="body">

      <Navbar/>
      <HeaderImage/>
      <Images/>

      </div>
    );
  }
}

export default App;
