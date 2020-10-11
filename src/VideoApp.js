import React from 'react';
import './Video.css';
import './App.css'
import VideoChat from './VideoChat';

const VideoApp = () => {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
      <div className="container">
<a className="navbar-brand js-scroll-trigger" href="/" style={{fontSize:50,fontFamily:"Merienda One"}}>PROTST</a>
<button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
  

  <i className="fa fa-bars"></i>
</button>
<div className="collapse navbar-collapse" id="navbarResponsive">
  <ul className="navbar-nav text-uppercase ml-auto">
    <li className="nav-item">
      <a className="nav-link js-scroll-trigger" href="/signin" >I am A Member</a>
    </li>
    <li className="nav-item">
    <a className="nav-link js-scroll-trigger" href="/campaigns">Campaigns</a>
    </li>
    <li className="nav-item">
      <a className="nav-link js-scroll-trigger" href="#about">About</a>
    </li>
    <li className="nav-item">
      <a className="nav-link js-scroll-trigger" href="#team">Team</a>
    </li>
    <li className="nav-item">
      <a className="nav-link js-scroll-trigger" href="#contact">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <section>
  <div className="container">
  <br/>
<div className="row">
  
 
  <VideoChat />

</div>

</div>
</section>
</div>
  
  );
};


export default VideoApp;
