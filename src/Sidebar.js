import {AuthContext} from "./Auth";
import React, {useState, useEffect, useContext} from 'react';
import "./App.css"
import Members from "./Members"

const Sidebar = (props) => {

    const {type,campId} =props;

    
const{currentUser} = useContext(AuthContext);

if (!currentUser && type=="c" ) {
  return (
    <div className="col-md-4">
    <div className="card-dark">
        <h3 className="card-header bg-dark text-light">Not Logged In?
        </h3>
        <div className="card-body text-center">
        <span> &nbsp;<button className="login-btn">Login</button>
       <span>&nbsp; or &nbsp;</span>
         <button className="signup-btn">Sign Up</button></span>
          </div>
      </div>
<hr/>
    <div class="card-dark">
        <h3 class="card-header bg-dark text-light">Campaign Members
        </h3>
        <div class="card-body">
     <Members campId={campId}/>
          </div>
      </div>
   <hr/>

    </div>
  );
}
  if (type=="u") {
    return (
      <div className="col-md-4">
      <div className="card-dark">
          <h3 className="card-header bg-dark text-light">Not Logged In?
          </h3>
          <div className="card-body text-center">
          <span> &nbsp;<button className="login-btn">Login</button>
         <span>&nbsp; or &nbsp;</span>
           <button className="signup-btn">Sign Up</button></span>
            </div>
        </div>
  <hr/>
      <div class="card-dark">
          <h3 class="card-header bg-dark text-light">Campaign Members
          </h3>
          <div class="card-body">
            </div>
        </div>
     <hr/>
  
      </div>
    );
}
}
export default Sidebar;
