import React, {useState, useEffect, useContext} from 'react';
import google from './assets/img/google.png';
import facebook from './assets/img/facebook.png';
import twitter from './assets/img/twitter.png';
import "./assets/css/logincss.css"
import fire from "./fire"
const Login = (props) => {

    const {user,name,setName,email,setEmail,password,setPassword,handleLogin,handleSignUp,handleGoogle,changeBack,handleFacebook,handleTwitter,hasAccount,changeName,setHasAccount,emailError,passwordError} =props;
   
  
return(
  
  <div>
<body className="login-body">
<div className="login-container">
  
<div className="login-page-left">
 
  <div className="login-header">
  <a href="/"><button>Go To Home</button></a>
<div className="login-header1">Welcome Back</div>
  <div className="login-header2">Log in to your account using email and password<br/></div>
  </div>
  <div className="login-form-page">
  <input type="text" value={name} className="login-email-add" hidden onChange={(e) =>setName(e.target.value)} id="name-input" placeholder="Name" />
    <input className="login-email-add"  value={email} onChange={(e) =>setEmail(e.target.value)}   id="email-input" placeholder="Email Address" />
    <input className="login-pswd" type="password"  value={password}  onChange={(e) =>setPassword(e.target.value)}  id="password-input" placeholder="Password"/>
    <p >{emailError}</p>
 <p >{passwordError}</p>
 
<div>
    
        {
            !hasAccount ? (
                <>
               
                <button onClick={handleLogin} className="login-login">Sign In</button>
                <img style={{width:70,height:70,cursor:"pointer"}} onClick={handleGoogle} src={google}/>&emsp;
            <img style={{width:70,height:70,cursor:"pointer"}} onClick={handleTwitter} src={twitter}/>&emsp;
            <img style={{width:70,height:70,cursor:"pointer"}} onClick={handleFacebook} src={facebook}/><br></br>
              <br/>
                <p>No Account? <span onClick={() => setHasAccount(!hasAccount)}><span onClick={()=>changeBack()}><span style={{cursor:"pointer"}}>Sign Up</span></span></span></p>
                </>
               
        ) : (
            <>
            <button className="login-login" onClick={handleSignUp}>Sign Up</button>
             <img style={{width:70,height:70,cursor:"pointer"}} onClick={handleGoogle} src={google}/>&emsp;
             <img style={{width:70,height:70,cursor:"pointer"}} onClick={handleTwitter} src={twitter}/>&emsp;
          <img style={{width:70,height:70,cursor:"pointer"}} onClick={handleFacebook} src={facebook}/><br></br>
           
            <br/>
             <p>Account already? <span onClick={() => setHasAccount(!hasAccount)}><span onClick={()=>changeName()}><span style={{cursor:"pointer"}}>Sign In</span></span></span></p>
             </>
           
         )
         }
        <a href="#"> Forgot Your Password</a>
     </div>
  </div>
</div>
  <div className="login-page-right"></div>
</div>
</body>

</div>
)
       

}
export default Login;