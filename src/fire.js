import firebase from 'firebase';
   var firebaseConfig = {
    apiKey: "AIzaSyCN2jS1xRbUNytqDC1TX4K67IwF2Wgiooo",
    authDomain: "protst.firebaseapp.com",
    databaseURL: "https://protst.firebaseio.com",
    projectId: "protst",
    storageBucket: "protst.appspot.com",
    messagingSenderId: "296526279066",
    appId: "1:296526279066:web:f9a31e05fa08473add4a23",
    measurementId: "G-Y7T6DKHNX5"
  };
 


  const fire = firebase.initializeApp(firebaseConfig);

  export default fire;