
import React, {useState, useEffect, useContext} from 'react';
import '../App.css';
import fire from "../fire";
import Navbar from '../Navbar';

function Index() {
 
  
  return (
<div className="App">
<Navbar/>


<header className="masthead">
<div className="container">
<div className="intro-text">
<div className="intro-heading text-uppercase " style={{fontStyle:"italic"}}>Rise Up!</div>
  <div className="intro-lead-in">'Be the change you want to see in the world' - Gandhi</div>
  
  <a className="btn btn-warning btn-xl text-uppercase js-scroll-trigger" href="/campaigns">Join A Campaign</a>
</div>
</div>
</header>






<footer className="footer" >
<div className="container">
<div className="row align-items-center">
  <div className="col-md-4">
    <span className="copyright">Copyright &copy; PROTST.ORG 2020</span>
  </div>
 
  <div className="col-md-8">
    <ul className="list-inline quicklinks">
      <li className="list-inline-item">
       Standardizing the way of protest around the world.&emsp;
      </li>
      <li className="list-inline-item">
       <a href="/about" style={{textDecoration:"none"}}>Read More About Us</a>
      </li>
    </ul>
  </div>
</div>
</div>
</footer>
</div>
  );
}

export default Index;