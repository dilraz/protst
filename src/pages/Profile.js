import firebase from "firebase";
import React from 'react';
import { Redirect, useHistory } from "react-router-dom";
import Sidebar from "../Sidebar";
import "../user.css";
import FriendCard from "../FriendCard"


class Profile extends React.Component {


  constructor(props) {
    super(props);

    this.state = { userCreated: [], friendsRef: [], user: [], friend: [], picture: [], imgUrl: [] }
  }


  state = {
    showPost: false,
    showEdit: false,
    showFriend: false,
    id: "",

  }



  displayPost() {
    var val = !this.state.showPost;
    this.setState({ showPost: val });
    this.setState({ showEdit: false });
    this.setState({ showFriend: false });
    document.getElementById("urls").innerText="";
  }
  displayFriend() {
    var val = !this.state.showFriend;
    this.setState({ showFriend: val });
    this.setState({ showEdit: false });
    this.setState({ showPost: false });
    this.getFriend();
  }

  displayEdit() {
    var val = !this.state.showEdit;
    this.setState({ showEdit: val });
    this.setState({ showPost: false });
    this.setState({ showFriend: false });
    document.getElementById("urls").innerText="";
  }


  getFriend() {


    const friendref = firebase.firestore().collection('users');
    let length = this.state.friendsRef.length
    let i=0;
    for(i=0;i<length;i++)
    {
    
      const unsubscribe = friendref.doc(this.state.friendsRef[i].userId).onSnapshot((snapshot) => {
        const data = snapshot.data()
     
       this.state.friend.push(data);
        
        
      
       
      }
      )
    }
   // console.log(this.state.friend)
   
    // const unsub = friendref.doc(id).onSnapshot((snapshot) => {
    //   const data = snapshot.data()
    //   this.setState({ friend: snapshot.data() });
    //   // console.log("friend", this.state.friend);

    // }

    // )

  }


  checkUpload() {
    //console.log(this.state.userCreated.id);
    let storageRef = firebase.storage().ref('photos/' + this.state.userCreated.id);
    let fileUpload = document.getElementById("imageInput");
    let fileSubmit = document.getElementById("submit");
    let firstFile;
    fileUpload.addEventListener('change', function (evt) {
      firstFile = evt.target.files[0]
      fileSubmit.addEventListener('click', function (evt) {
        if (firstFile) {
          // upload the first file only
          let uploadTask = storageRef.put(firstFile)
        }
      })
    })





  }

 
  handleSubmit() {
    let nameInput = document.getElementById("name").value;
    let bioInput = document.getElementById("bio").value;

    if (nameInput == "") {
      nameInput = this.state.userCreated.name;
    }
    if (bioInput == "") {
      bioInput = this.state.userCreated.bio;
    }

    let storageRef = firebase.storage().ref('photos/' + this.state.userCreated.id);

    storageRef.getDownloadURL()
      .then((url) => {

        firebase.firestore().collection("users").doc(this.state.userCreated.id).update({
          "name": nameInput,
          "bio": bioInput,
          "photoUrl": url
        }
        );
        this.props.history.go(0)
      }).catch(err => {
        //   console.log(err.code);

      })
    //  console.log("called", image);
   
    document.getElementById("message").innerText = "Updated Successfully !"
  }

  componentDidMount() {
    // this.displayFriend();


    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const usersRef = firebase.firestore().collection('users');
        const unsubscribe = usersRef.doc(user.uid).onSnapshot((snapshot) => {
          const data = snapshot.data()
          this.setState({ userCreated: snapshot.data() });
          this.state.userCreated.id = user.uid;
          this.checkUpload();
        }

        )
        const friendsRef = firebase.firestore().collection('users').doc(user.uid).collection('friends');
        const unsubscribe2 = friendsRef.onSnapshot((snapshot) => {

          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          this.setState({ friendsRef: data });
        });
      } else {

        console.log('There is no logged in user');
      }
    })





  }



  render() {

    const { id } = this.state
    const { showPost } = this.state;
    const { showAbout } = this.state;
    const { showFriend } = this.state;
    const { showEdit } = this.state;




    return (

      <div className="App">
     
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
          <div className="container">
            <a className="navbar-brand js-scroll-trigger" href="/" style={{ fontSize: 50, fontFamily: "Merienda One" }}>PROTST</a>
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
        <br /><br />

        <section className="page-section">

          <div className="container">

            <div className="row">
          
              <div className="col-lg-8">
                <div className="section1">
                  <div>
               
                    <div className="row grid clearfix">
                      <div className="col2 first">
                        <img src={this.state.userCreated.photoUrl} alt="" />
                        <h1>{this.state.userCreated.name}</h1>
                        <p>{this.state.userCreated.bio}</p>

                      </div>
                      <div className="col2 last">
                        <div className="grid clearfix">
                          <div className="col3 first">
                            <h1>{this.state.friendsRef.length}</h1>
                            <span>Friends</span>
                          </div>
                          <div className="col3"><h1>352</h1>
                            <span>Activities</span></div>
                          <div className="col3 last"><h1>85</h1>
                            <span>My Score</span></div>
                        </div>
                      </div>
                    </div>
                    {this.state.friend.map(data => {
                      console.log(data.name);
                     // console.log(data)
                      return (
                        <FriendCard username={data.name} photourl={data.photoUrl}/>
                      )

                    })}
                    <ul className="row2tab">
                      <li onClick={() => this.displayPost()}><i className="fa fa-list-alt"></i> My posts </li>
                      <li onClick={() => this.displayFriend()}><i className="fa fa-heart" ></i> Friends </li>

                      <li onClick={() => this.displayEdit()}><i className="fa fa-thumbs-o-up "></i> Edit Profile </li>
                    </ul>


                  </div>
                  <div className="hidDiv" style={{ display: (showPost ? 'block' : 'none') }}>you have no posts!</div>

                  <div className="hidDiv" style={{ display: (showFriend ? 'block' : 'none') }}>
                    <p id="urls"></p>

                  
                  </div>
                  <div className="hidDiv" style={{ display: (showEdit ? 'block' : 'none') }} >

                    <div class="container">
                      <div class="row">
                        <div class="col-lg-12" id="editForm">

                          <fieldset>
                            <legend>Edit Personal Information:</legend>
                            <br />
                            <div class="form-group row">
                              <div class="col-md-8">
                                <div className="form-group" >
                                  <label for="Name">Name </label>
                                  <input type="text" class="form-control" id="name" placeholder={this.state.userCreated.name} />
                                </div>
                              </div>

                            </div>

                            <div class="form-group">
                              <label for="Bio">Bio </label>
                              <textarea class="form-control" id="bio" placeholder={this.state.userCreated.bio}></textarea>
                            </div>

                            <div class="form-group">
                              <label for="Bio">Profile Picture </label><br />
                              <input type="file" id="imageInput" accept="image/*" />
                            </div>

                            <br />

                            <button type="submit" id="submit" onClick={() => this.handleSubmit()} className="btn btn-info" style={{ width: 200 }}>Submit</button>
                          </fieldset>
                         
                          <br />
                          <p id="message"></p>
                        </div>
                      </div>
                    </div>
                  </div>
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