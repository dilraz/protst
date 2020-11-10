import React, {useState, useEffect, useContext} from 'react';
import "./App.css"
import Members from "./Members"
import fire from "./fire"

class Navbar  extends React.Component  {
  
    constructor(props) {
      super(props);
       this.state ={isNavCollapsed:true ,
        toggle:"collapse navbar-collapse",there:"",user:null};
        
        }


        componentDidMount()
        {
          if(localStorage.getItem("isThere") =="yes")
          {
              this.setState({user:true})
          }else{
            this.setState({user:false})
          }
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
     handleLogout = () => {
        localStorage.removeItem("isThere")
        fire.auth().signOut().then(()=>
        {
          window.location.replace("/login");
        });
        
      }
  
  render(){
     // console.log(localStorage.getItem("isThere"))
    
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
        <a className="nav-link js-scroll-trigger" href="/profile" >I am A Member</a>
      </li>
      <li className="nav-item">
        <a className="nav-link js-scroll-trigger" href="/campaigns">Campaigns</a>
      </li>
      <li className="nav-item">
        <a className="nav-link js-scroll-trigger" href="/about">About</a>
      </li>
    <li className="nav-item">
   
    {this.state.user ? (

<a className="nav-link js-scroll-trigger" style={{cursor:"pointer"}} onClick = {()=>this.handleLogout()}>Logout</a>

) : (  
  <a className="nav-link js-scroll-trigger" href="/login">Sign In</a>
)}
     
    </li>

    </ul>
  </div>
</div>
</nav>
)
  }
}
export default Navbar;