import firebase from "firebase";
import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import '../App.css';
import { AuthContext } from "../Auth";
import fire from "../fire";
import Login from '../Login';

function SignIn() {
 

  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [user, setUser] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);


  var history = useHistory();
  const vals = history.location.pathname.toString().split("signin/");
  var next;
  const length = vals.length - 1;

  if (vals[length].includes("login")) {
    next = "";
  } else {
    next = vals[length];
  }
  const changeName = () => {
    document.getElementById("name-input").hidden = true;

  }
  const changeBack = () => {
    document.getElementById("name-input").hidden = false;

  }


  const clearInputs = () => {
    setEmail('');
    setPassword('');

  }

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  }

  const handleLogin = () => {
    clearErrors();

        fire
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((user) => {
            if (user) {
              // console.log("is verified: ",user.emailVerified);
              if (!user.user.emailVerified) {
                user.user.sendEmailVerification().then(function () {
                  window.alert("Please confirm Your email!");
                  handleLogout();
                }
                )
              }
              localStorage.setItem("isThere" , "yes");
            }
          })

          .catch(err => {
            console.log(err.message);
            switch (err.code) {
              case "auth/invalid-email":
              case "auth/user-disabled":
              case "auth/user-not-found":
                setEmailError(err.message);
                break;
              case "auth/wrong-password":
                setPasswordError(err.message);
                break;
            }
          })
    
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });

  }

  const handleGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    fire.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
     // fire.auth().sendSignInLinkToEmail(result.user.email);
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      
      var clientToken = user.getIdToken();
      firebase.auth().verifyIdToken(clientToken)
        .then(function (decodedToken) {
          var uid = decodedToken.uid;
          
        })

    }).then(
        firebase.auth().onAuthStateChanged(function(user)
        {
          if(user){
            localStorage.setItem("isThere","yes");
            //console.log(user.uid)
          var check = fire.firestore().collection('users').doc(user.uid).onSnapshot((snapshot) => {

            const data = snapshot.data()
      if(!data){
           fire.firestore().collection('users').doc(user.uid).set({
              name: user.displayName,
              email: user.email,
              bio: "Hey! I am new here. Feel free to add me.",
              photoUrl: user.photoURL
            }, fire.firestore().collection('users').doc(user.uid).collection("friends").doc().set({
              userId: "60462bzVBSOuBbMAjKi40o3mUpa2"
            })
            )

      }
          })
          
          
          }
        })
      )
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        console.log(errorCode);
        //alert(errorCode);
      
        var errorMessage = error.message;
        console.log(errorMessage);
       // alert(errorMessage);
      });

  }

  const handleFacebook = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    fire.auth().signInWithPopup(provider).then(function (result) {
    //  fire.auth().sendSignInLinkToEmail(result.user.email);
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      
     
      var clientToken = user.getIdToken();
      fire.auth().verifyIdToken(clientToken)
        .then(function (decodedToken) {
          var uid = decodedToken.uid;
        
      // ...
    }
  )}).then(

      firebase.auth().onAuthStateChanged(function(user)
        {
          if(user){

            localStorage.setItem("isThere","yes");
           // console.log(user)
      //     var check = fire.firestore().collection('users').doc(user.uid).onSnapshot((snapshot) => {

      //       const data = snapshot.data()
      // if(!data){
      //      fire.firestore().collection('users').doc(user.uid).set({
      //         name: user.displayName,
      //         email: user.email,
      //         bio: "Hey! I am new here. Feel free to add me.",
      //         photoUrl: user.photoURL
      //       }, fire.firestore().collection('users').doc(user.uid).collection("friends").doc().set({
      //         userId: "60462bzVBSOuBbMAjKi40o3mUpa2"
      //       })
      //       )

      // }
      //     })
          
          
          }
        })
    )
     
      .catch(function (error) {
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

  const handleTwitter = () => {
    var provider = new firebase.auth.TwitterAuthProvider();
    fire.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a Twitter Access Token. You can use it to access the Twitter API.
      
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      var clientToken = user.getIdToken();
      fire.auth().verifyIdToken(clientToken)
        .then(function (decodedToken) {
          var uid = decodedToken.uid;
          
        })
      // ...
    })
    .then(
      firebase.auth().onAuthStateChanged(function(user)
      {
        if(user){
          localStorage.setItem("isThere","yes");
          //console.log(user.uid)
        var check = fire.firestore().collection('users').doc(user.uid).onSnapshot((snapshot) => {

          const data = snapshot.data()
    if(!data){
         fire.firestore().collection('users').doc(user.uid).set({
            name: user.displayName,
            email: "twitteruser@protst.org",
            bio: "Hey! I am new here. Feel free to add me.",
            photoUrl: user.photoURL
          }, fire.firestore().collection('users').doc(user.uid).collection("friends").doc().set({
            userId: "60462bzVBSOuBbMAjKi40o3mUpa2"
          })
          )

    }
        })
        
        
        }
      })
    )
      .catch(function (error) {
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

  const handleSignUp = () => {
    clearErrors();

    if (document.getElementById("name-input").value != "") {
      fire
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(cred => {
          if (cred) {
            if (!cred.user.emailVerified) {
              cred.user.sendEmailVerification().then(function () {
                window.alert("Please confirm Your email!");

                handleLogout();
              }
              )
            }
          }
          return (fire.firestore().collection('users').doc(cred.user.uid).set({
            name: name,
            email: email,
            bio: "Hey! I am new here. Feel free to add me.",
            photoUrl: "https://firebasestorage.googleapis.com/v0/b/protst.appspot.com/o/photos%2Fuser.png?alt=media&token=bcd3ba4f-cd14-4b9f-9ddd-e05fada45f2f"
          }, fire.firestore().collection('users').doc(cred.user.uid).collection("friends").doc().set({
            userId: "60462bzVBSOuBbMAjKi40o3mUpa2"
          })
          )
          )

        })
        .catch(err => {
          switch (err.code) {
            case "auth/email-already-in-use":
            case "auth/invalid-email":
              setEmailError(err.message);
              break;
            case "auth/weak-password":
              setPasswordError(err.message);
              break;
          }

        })
    } else {
      setPasswordError("Please enter your name!");
    }
  }

  const handleLogout = () => {
   localStorage.setItem("isThere",null)
    fire.auth().signOut().then(()=>
    {
      window.location.replace("/login");
    });
    
  
  }

  const authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        clearInputs();
        setUser(user);

      } else {
        setUser("");
      }
    })
  }

  useEffect(() => {
    authListener();
  }, [])


  const { currentUser } = useContext(AuthContext);

  return (

    <div>

      {currentUser ? (

        <Redirect to={"/" + next} />

      ) : (

          <Login

            user={currentUser}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleGoogle={handleGoogle}
            handleTwitter={handleTwitter}
            handleFacebook={handleFacebook}
            handleLogin={handleLogin}
            handleSignUp={handleSignUp}
            handleLogout={handleLogout}
            hasAccount={hasAccount}
            changeName={changeName}
            changeBack={changeBack}
            setHasAccount={setHasAccount}
            emailError={emailError}
            passwordError={passwordError}
          />
        )}
    </div>
  );
}


export default SignIn;


