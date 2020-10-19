import React from "react";
import '../App.css';

function Index({handleLogout}) {
 
 
 
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
      <a className="nav-link js-scroll-trigger" href="/profile" >I am A Member</a>
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
      <a className="nav-link js-scroll-trigger" onClick = {handleLogout}>Logout</a>
    </li>
  </ul>
</div>
</div>
</nav>


<header className="masthead">
<div className="container">
<div className="intro-text">
<div className="intro-heading text-uppercase " style={{fontStyle:"italic"}}>Rise Up!</div>
  <div className="intro-lead-in">'Be the change you want to see in the world' - Gandhi</div>
  
  <a className="btn btn-warning btn-xl text-uppercase js-scroll-trigger" href="/campaigns">Join A Campaign</a>
</div>
</div>
</header>

{/* 
<section className="page-section" id="services">
<div className="container">
<div className="row">
  <div className="col-lg-12 text-center">
    <h2 className="section-heading text-uppercase">Services</h2>
    <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
  </div>
</div>
<div className="row text-center">
  <div className="col-md-4">
    <span className="fa-stack fa-4x">
      <i className="fa fa-circle fa-stack-2x text-primary"></i>
      <i className="fa fa-shopping-cart fa-stack-1x fa-inverse"></i>
    </span>
    <h4 className="service-heading">E-Commerce</h4>
 
    <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
  </div>
  <div className="col-md-4">
    <span className="fa-stack fa-4x">
      <i className="fa fa-circle fa-stack-2x text-primary"></i>
      <i className="fa fa-laptop fa-stack-1x fa-inverse"></i>
    </span>
   
    <h4 className="service-heading">Responsive Design</h4>
   
    <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
  </div>
  <div className="col-md-4">
    <span className="fa-stack fa-4x">
      <i className="fa fa-circle fa-stack-2x text-primary"></i>
      <i className="fa fa-lock fa-stack-1x fa-inverse"></i>
    </span>
    <h4 className="service-heading">Web Security</h4>
    <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
  </div>
</div>
</div>



</section> */}





<footer className="footer">
<div className="container">
<div className="row align-items-center">
  <div className="col-md-4">
    <span className="copyright">Copyright &copy; PROTST.ORG 2020</span>
  </div>
  <div className="col-md-4">
    <ul className="list-inline social-buttons">
      <li className="list-inline-item">
        <a href="#something">
          <i className="fa fa-twitter"></i>
        </a>
      </li>
      <li className="list-inline-item">
        <a href="#something">
          <i className="fa fa-facebook-f"></i>
        </a>
      </li>
      <li className="list-inline-item">
        <a href="#something">
          <i className="fa fa-linkedin-in"></i>
        </a>
      </li>
    </ul>
  </div>
  <div className="col-md-4">
    <ul className="list-inline quicklinks">
      <li className="list-inline-item">
        <a href="#something">Privacy Policy</a>
      </li>
      <li className="list-inline-item">
        <a href="#something">Terms of Use</a>
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