import React from 'react';
import './App.css';
import email from './pages/SignIn'


const Hero = ({handleLogout}) => {

  return (
    
    <div className="App">
    <h1 >Hey {email} You logged in!!!</h1>
    <button onClick = {handleLogout}>Get Out!</button>
    </div>
  );
}

export default Hero;
