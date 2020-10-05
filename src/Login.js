import React from "react";

const Login = (props) => {

    const {email,setEmail,password,setPassword,handleLogin,handleSignUp,hasAccount,setHasAccount,emailError,passwordError} =props;


return(
   <div className="login">
     Email: <input 
      type="text"
      required
      value={email}
      onChange={(e) =>setEmail(e.target.value)}
        />
        <br></br>
     Password: <input 
      type="password"
      required
      value={password}
      onChange={(e) =>setPassword(e.target.value)}
        />
        <p >{emailError}</p>
<p >{passwordError}</p>
<div>
    {
        hasAccount ? (
            <>
            <button onClick={handleLogin}>Sign In</button>
            <p>No Account? <span onClick={() => setHasAccount(!hasAccount)}>Sign Up</span></p>
            </>
    ) : (
        <>
        <button onClick={handleSignUp}>Sign Up</button>
        <p>Account already? <span onClick={() => setHasAccount(!hasAccount)}>Sign In</span></p>
        </>
    )
    }
</div>
   </div>
)

}

export default Login;