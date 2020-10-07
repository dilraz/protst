import React from "react";
import fire from "./fire";
import googleAuth from "./fire";
import google from './assets/img/google.png';
import facebook from './assets/img/facebook.png';
import twitter from './assets/img/twitter.png';

const Login = (props) => {

    const {name,setName,email,setEmail,password,setPassword,handleLogin,handleSignUp,handleGoogle,changeBack,handleFacebook,handleTwitter,hasAccount,changeName,setHasAccount,emailError,passwordError} =props;


return(
    <div style={{margin:"auto"}}>
        <table>
            <br/>
   <div className="form-group-row" >
       <tr><td width="150" >
   <div className="col-sm-10" style={{textAlign:"left"}}>
       <label id="labelname" htmlFor="name-input" className="col-sm-2 col-form-label" hidden>Name: </label>
       </div></td>
       <td  width="300">
   <input 
      type="text"
      required
      value={name}
      className="form-control"
      hidden
      onChange={(e) =>setName(e.target.value)}
      id="name-input"
        /></td>
        </tr></div>
        <br></br>
        <div className="form-group-row" >
        <tr><td  width="150">
        <div className="col-sm-10"  style={{textAlign:"left"}}>
       <label htmlFor="email-input" className="col-sm-2 col-form-label">Email: </label>
   
       </div></td>
       <td  width="300">
     <input 
      type="text"
      required
      value={email}
      className="form-control"
      onChange={(e) =>setEmail(e.target.value)}
      id="email-input"
        /></td></tr>

        </div>
        <br></br>
        <div className="form-group-row" >
            <tr><td  width="150">
        <div className="col-sm-10"  style={{textAlign:"left"}}>
       <label htmlFor="password-input" className="col-sm-2 col-form-label">Password: </label>
       </div>
       </td>
       <td width="300">
        <input 
      type="password"
      required
      value={password}
      className="form-control"
      onChange={(e) =>setPassword(e.target.value)}
      id="password-input"
        /></td></tr>
        </div></table>
        <p >{emailError}</p>
<p >{passwordError}</p>
<div>
    
    {
        !hasAccount ? (
            <>
           
            <button onClick={handleLogin} className="btn btn-warning">Sign In</button><br/><br/>
            <img style={{width:70,height:70}} onClick={handleGoogle} src={google}/>&emsp;
        <img style={{width:70,height:70}} onClick={handleTwitter} src={twitter}/>&emsp;
        <img style={{width:70,height:70}} onClick={handleFacebook} src={facebook}/><br></br>
            <p>No Account? <span onClick={() => setHasAccount(!hasAccount)}><span onClick={()=>changeBack()}>Sign Up</span></span></p>
            </>
           
    ) : (
        <>
        <button className="btn btn-warning" onClick={handleSignUp}>Sign Up</button><br></br><br></br>
        <img style={{width:70,height:70}} onClick={handleGoogle} src={google}/>&emsp;
        <img style={{width:70,height:70}} onClick={handleTwitter} src={twitter}/>&emsp;
        <img style={{width:70,height:70}} onClick={handleFacebook} src={facebook}/><br></br>
       
        
        <p>Account already? <span onClick={() => setHasAccount(!hasAccount)}><span onClick={()=>changeName()}>Sign In</span></span></p>
        </>
       
    )
    }
</div>
</div>
)

}
export default Login;