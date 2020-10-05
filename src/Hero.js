import React from 'react';
import './App.css';

const Hero = ({handleLogout}) => {
  return (
    
    <div className="App">
    <h1>Hey You logged in!!!</h1>
    <button onClick = {handleLogout}>Get Out!</button>
    </div>
  );
}

export default Hero;
