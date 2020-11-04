import React, {useState, useEffect, useContext} from 'react';
import fire from "../fire";
import Sidebar from "../Sidebar"
import "../user.css";
import firebase from "firebase";
import currentUser from '../routes/PrivateRoute';
import handleLogout from "./SignIn"


class Profile extends React.Component {
    

    constructor(props) {
        super(props);
       
        this.state = {userCreated : [],friendsRef : [],user: []}
        }
        
       
    state = {
        showPost: true,
        showEdit:false,
        showFriend:false,
        id:""
    }

 

   displayPost()
   {
    this.setState({showPost:true});
    this.setState({showEdit:false});
    this.setState({showFriend:false});
   }
   displayFriend()
   {
    this.setState({showPost:false});
    this.setState({showEdit:false});
    this.setState({showFriend:true});
   }
  
   displayEdit()
   {
    this.setState({showPost:false});
    this.setState({showEdit:true});
    this.setState({showFriend:false});
   }



  componentDidMount()
  {
 
         firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            const usersRef = firebase.firestore().collection('users');
            const unsubscribe=  usersRef.doc(user.uid).onSnapshot((snapshot) => {
                const data = snapshot.data()
                this.setState({ userCreated: snapshot.data() });
              }
            )
        //     const friendsRef = firebase.firestore().collection('users').doc(this.state.id).collection('friends');
        //     const unsubscribe2= friendsRef.onSnapshot((snapshot) => {
        
        //         const data = snapshot.docs.map((doc) => ({
        //           id: doc.id,
        //           ...doc.data(),
        //         }));
        //         console.log("All friends", data);
        //         this.setState({friendsRef:data})
        //     });
        //  } else {
          
        //      console.log('There is no logged in user');
          }
         })
       
        

        

   
  }

  
 
  render(){
      
      const {id} =this.state
    const { showPost } = this.state;
    const { showAbout} = this.state;
    const { showFriend } = this.state;
    const { showEdit } = this.state;


   

 return(
    <div className="App">
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
    <div className="container">
<a className="navbar-brand js-scroll-trigger" href="/" style={{fontSize:50,fontFamily:"Merienda One"}}>PROTST</a>
<button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">


<i className="fa fa-bars"></i>
</button>
<div className="collapse navbar-collapse" id="navbarResponsive">
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
<br/><br/> 

<section className="page-section">
<div className="container">

  <div className="row">

    <div className="col-lg-8">
	<div className="section1">
			<div>
				<div className="row grid clearfix">
					<div className="col2 first">
						<img src={this.state.userCreated.photoUrl} alt=""/>
						<h1>{this.state.userCreated.name}</h1>
						<p>{this.state.userCreated.bio}</p>
						
					</div>
					<div className="col2 last">
						<div className="grid clearfix">
							<div className="col3 first">
								<h1>34</h1>
								<span>Friends</span>
							</div>
							<div className="col3"><h1>352</h1>
							<span>Activities</span></div>
							<div className="col3 last"><h1>85</h1>
							<span>My Score</span></div>
						</div>
					</div>
				</div>
					<ul className="row2tab">
						<li  onClick={() =>this.displayPost()}><i className="fa fa-list-alt"></i> My posts </li>
						<li onClick={() =>this.displayFriend()}><i className="fa fa-heart" ></i> Friends </li>
						
						<li onClick={() =>this.displayEdit()}><i className="fa fa-thumbs-o-up "></i> Edit Profile </li>
					</ul>
                  
                   
				</div>
                { showPost && ( <div className="hidDiv">you have no posts!</div>)}
                    
                    { showFriend && (  <div className="hidDiv" >You have no friends!</div>)}
                  { showEdit && (  <div className="hidDiv" >What are you even editing?</div>)}
		</div>
</div>  <Sidebar 
    type="u" 
     />
</div>
</div>

</section>
<footer className="footer">
  <div className="container">
    <div className="row align-items-center">
      <div className="col-md-4">
        <span className="copyright">Copyright &copy; Your Website 2019</span>
      </div>
      <div className="col-md-4">
        <ul className="list-inline social-buttons">
          <li className="list-inline-item">
            <a href="#something">
              <i className="fa fa-twitter"></i>
            </a>
          </li>
          <li className="list-inline-item">
            <a href="#something">
              <i className="fa fa-facebook-f"></i>
            </a>
          </li>
          <li className="list-inline-item">
            <a href="#something">
              <i className="fa fa-linkedin-in"></i>
            </a>
          </li>
        </ul>
      </div>
      <div className="col-md-4">
        <ul className="list-inline quicklinks">
          <li className="list-inline-item">
            <a href="#something">Privacy Policy</a>
          </li>
          <li className="list-inline-item">
            <a href="#something">Terms of Use</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</footer>
 
</div>


      );
  }
}

export default Profile;