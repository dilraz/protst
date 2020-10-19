import React, {useState, useEffect, useContext} from 'react';
import '../App.css';
import fire from "../fire";
import Login from '../Login';
import Hero from '../Hero';
import firebase from "firebase";
import { Redirect, useHistory } from 'react-router-dom';
import Index from "../pages/Index";
import {AuthContext} from "../Auth"

function SignIn() {

  
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError]= useState('');
  const [hasAccount, setHasAccount]= useState(false);
  
  var history = useHistory();
  const changeName = ()=>  {
    document.getElementById("name-input").hidden = true;
  }
  const changeBack = ()=>  {
    document.getElementById("name-input").hidden = false;
  }


  const clearInputs = ()=> {
    setEmail('');
    setPassword('');

  }
  
  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  }

  const handleLogin = () =>{
   clearErrors();
   
    fire
    .auth()
    .signInWithEmailAndPassword(email,password)
    // .then((user) =>{
    //   if(user){
    //   if(!user.user.emailVerified){
    //    user.user.sendEmailVerification().then(function()
    //      {
    //        handleLogout()
    //      }
    //    )
    //   }
    // }
    // })

    .catch(err => {
      console.log(err.message);
      switch(err.code){
        case  "auth/invalid-email":
          case  "auth/user-disabled":
            case  "auth/user-not-found":  
            setEmailError(err.message);
            break;
             case  "auth/wrong-password":
               setPasswordError(err.message);
               break;
      }
    })
  }

  const handleGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    fire.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      
      var clientToken = user.getIdToken();
      fire.auth().verifyIdToken(clientToken)
    .then(function(decodedToken) {
      var uid = decodedToken.uid;
    
    })
    
  })
    .then(cred => {
      return  fire.firestore().collection('users').doc(cred.user.uid).set({
        
        name : name,
        email: email
        

      })
   
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
 
  }

  const handleFacebook = () => 
  {
    var provider = new firebase.auth.FacebookAuthProvider();
    fire.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    })
    .then(cred => {
      return fire.firestore().collection('users').doc(cred.user.uid).set({
        name : {name},
        email: {email}
        

      })
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  const handleTwitter = () =>
  {
    var provider = new firebase.auth.TwitterAuthProvider();
    fire.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Twitter Access Token. You can use it to access the Twitter API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    })
    .then(cred => {
      return fire.firestore().collection('users').doc(cred.user.uid).set({
        name : {name},
        email: {email}
        

      })
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  const handleSignUp = () =>{
    clearErrors();
 
    fire
    .auth()
    .createUserWithEmailAndPassword(email,password)
    .then(cred => {
     
          return (fire.firestore().collection('users').doc(cred.user.uid).set({
        name: name,
        email: email,
        bio: "",
        photoUrl: ""
      },fire.firestore().collection('users').doc(cred.user.uid).collection("friends").doc().set({
        userId:""
      })
          )
      )
    })
    .catch(err => {
      switch(err.code){
        case  "auth/email-already-in-use":
          case  "auth/invalid-email":
            setEmailError(err.message);
            break;
             case  "auth/weak-password":
               setPasswordError(err.message);
               break;
      }
    
    })
   
  }

 const handleLogout = () => {
   fire.auth().signOut();
   
 }

 const authListener =()=>{
   fire.auth().onAuthStateChanged(user =>{
     if(user)
     {
       clearInputs();
       setUser(user);

     }else{
       setUser("");
     }
   })
 }
 
 useEffect(() =>{
   authListener();
 }, [])

const{currentUser} = useContext(AuthContext);

if (currentUser) {
  return <Index handleLogout={handleLogout}/>
}
else if(!currentUser){
  return (
    
   <div>
{user ? (

 <Hero handleLogout={handleLogout}/>
 
) : (  

    <Login 
    name= {name}
    setName = {setName}
email={email}
setEmail={setEmail}
password={password}
setPassword={setPassword}
handleGoogle = {handleGoogle}
handleTwitter = {handleTwitter}
handleFacebook = {handleFacebook}
handleLogin={handleLogin}
handleSignUp={handleSignUp}
handleLogout={handleLogout}
hasAccount ={hasAccount}
changeName = {changeName}
changeBack = {changeBack}
setHasAccount={setHasAccount}
emailError={emailError}
passwordError={passwordError}
/>
)} 
</div>

  
 
  );
}}
export default SignIn;


