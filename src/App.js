import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Routes from './config/routes';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <NavBar />
      <Routes />
    </div>
  );
}

export default App;
