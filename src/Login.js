import React from "react";
import google from './assets/img/google.png';
import facebook from './assets/img/facebook.png';
import twitter from './assets/img/twitter.png';
import "./assets/css/logincss.css"

const Login = (props) => {

    const {name,setName,email,setEmail,password,setPassword,handleLogin,handleSignUp,handleGoogle,changeBack,handleFacebook,handleTwitter,hasAccount,changeName,setHasAccount,emailError,passwordError} =props;


return(
//     <div style={{margin:"auto"}}>
//         <table>
//             <br/>
//    <div className="form-group-row" >
//        <tr><td width="150" >
//    <div className="col-sm-10" style={{textAlign:"left"}}>
//       Name:
//        </div></td>
//        <td  width="300">
//    <input 
//       type="text"
//       required
//       value={name}
//       className="form-control"
//       hidden
//       onChange={(e) =>setName(e.target.value)}
//       id="name-input"
//         /></td>
//         </tr></div>
//         <br></br>
//         <div className="form-group-row" >
//         <tr><td  width="150">
//         <div className="col-sm-10"  style={{textAlign:"left"}}>
//      Email:
   
//        </div></td>
//        <td  width="300">
//      <input 
//       type="text"
//       required
//       value={email}
//       className="form-control"
//       onChange={(e) =>setEmail(e.target.value)}
//       id="email-input"
//         /></td></tr>

//         </div>
//         <br></br>
//         <div className="form-group-row" >
//             <tr><td  width="150">
//         <div className="col-sm-10"  style={{textAlign:"left"}}>Password: 
//        </div>
//        </td>
//        <td width="300">
//         <input 
//       type="password"
//       required
//       value={password}
//       className="form-control"
//       onChange={(e) =>setPassword(e.target.value)}
//       id="password-input"
//         /></td></tr>
//         </div></table>
//         <p >{emailError}</p>
// <p >{passwordError}</p>
// <div>
    
//     {
//         !hasAccount ? (
//             <>
           
//             <button onClick={handleLogin} className="btn btn-warning">Sign In</button><br/><br/>
//             <img style={{width:70,height:70}} onClick={handleGoogle} src={google}/>&emsp;
//         <img style={{width:70,height:70}} onClick={handleTwitter} src={twitter}/>&emsp;
//         <img style={{width:70,height:70}} onClick={handleFacebook} src={facebook}/><br></br>
//             <p>No Account? <span onClick={() => setHasAccount(!hasAccount)}><span onClick={()=>changeBack()}>Sign Up</span></span></p>
//             </>
           
//     ) : (
//         <>
//         <button className="btn btn-warning" onClick={handleSignUp}>Sign Up</button><br></br><br></br>
//         <img style={{width:70,height:70}} onClick={handleGoogle} src={google}/>&emsp;
//         <img style={{width:70,height:70}} onClick={handleTwitter} src={twitter}/>&emsp;
//         <img style={{width:70,height:70}} onClick={handleFacebook} src={facebook}/><br></br>
       
        
//         <p>Account already? <span onClick={() => setHasAccount(!hasAccount)}><span onClick={()=>changeName()}>Sign In</span></span></p>
//         </>
       
//     )
//     }
// </div>
// </div>
<body className="login-body">
<div className="login-container">
<div className="login-page-left">
  <div className="login-header">
<div className="login-header1">Welcome Back</div>
  <div className="login-header2">Log in to your account using email and password<br/></div>
  </div>
  <div className="login-form-page">
  <input type="text" required value={name} className="login-email-add" hidden onChange={(e) =>setName(e.target.value)} id="name-input" placeholder="Name" required/>
    <input className="login-email-add"  value={email} onChange={(e) =>setEmail(e.target.value)}   id="email-input" placeholder="Email Address"/>
    <input className="login-pswd" type="password"  value={password}  onChange={(e) =>setPassword(e.target.value)}  id="password-input" placeholder="Password" />
    <p >{emailError}</p>
 <p >{passwordError}</p>
 
<div>
    
        {
            !hasAccount ? (
                <>
               
                <button onClick={handleLogin} className="login-login">Sign In</button>
                <img style={{width:70,height:70}} onClick={handleGoogle} src={google}/>&emsp;
            <img style={{width:70,height:70}} onClick={handleTwitter} src={twitter}/>&emsp;
            <img style={{width:70,height:70}} onClick={handleFacebook} src={facebook}/><br></br>
              <br/>
                <p>No Account? <span onClick={() => setHasAccount(!hasAccount)}><span onClick={()=>changeBack()}>Sign Up</span></span></p>
                </>
               
        ) : (
            <>
            <button className="login-login" onClick={handleSignUp}>Sign Up</button>
             <img style={{width:70,height:70}} onClick={handleGoogle} src={google}/>&emsp;
             <img style={{width:70,height:70}} onClick={handleTwitter} src={twitter}/>&emsp;
          <img style={{width:70,height:70}} onClick={handleFacebook} src={facebook}/><br></br>
           
            <br/>
             <p>Account already? <span onClick={() => setHasAccount(!hasAccount)}><span onClick={()=>changeName()}>Sign In</span></span></p>
             </>
           
         )
         }
     </div>
  </div>
</div>
  <div className="login-page-right"></div>
</div>
</body>
)

}
export default Login;