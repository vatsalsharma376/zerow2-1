import React, { Component } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home';
import Tables from './components/Table/Tables'
class App extends Component {
  render() {
    return (
      <div className="entry-point">
      <Home/>
      {/* <Dashboard/> */}
      {/* <Tables/> */}
      </div>
    );
  }
}

export default App;
