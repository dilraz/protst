import React, {useState, useEffect, useContext} from 'react';
import "./App.css"
import Members from "./Members"

class Navbar  extends React.Component  {
  
    constructor(props) {
      super(props);
       this.state ={isNavCollapsed:true ,
        toggle:"collapse navbar-collapse"};
        
        }


    handleNavCollapse ()
    {
     
      
      this.state.isNavCollapsed = (!this.state.isNavCollapsed);
      if(!this.state.isNavCollapsed)
      {
        document.getElementById("navbarResponsive").className = "navbar-collapse"
      }else{
        document.getElementById("navbarResponsive").className = "collapse navbar-collapse"
      }
    } 
  render(){
return(

<nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
<div className="container">
  <a className="navbar-brand js-scroll-trigger" href="/" style={{ fontSize: 50, fontFamily: "Merienda One" }}>PROTST</a>
  <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded={!this.state.isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={()=>this.handleNavCollapse()}>

    <i className="navbar-toggler-icon"></i>
  </button>
  <div  className="collapse navbar-collapse" id="navbarResponsive">
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
)
  }
}
export default Navbar;