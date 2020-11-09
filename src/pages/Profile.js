import firebase from "firebase";
import React ,{useState} from 'react';
import { Redirect, useHistory } from "react-router-dom";
import Sidebar from "../Sidebar";
import "../user.css";
import Navbar from "../Navbar"


class Profile extends React.Component {


  constructor(props) {
    super(props);

   
    this.state = { userCreated: [], friendsRef: [], user: [], friend: [], picture: [], imgUrl: []}
  }


  state = {
    showPost: false,
    showEdit: false,
    showFriend: false,
    id: ""

  }

  
  loadFriends(url,name,bio)
  {
    document.getElementById("mem").innerHTML +=("<td><div class='card bg-dark mb-3 tour shadow' style='float:left;margin:10px;max-width:200px'><img style='width:200px;height:200px;padding-bottom:8px;border-bottom:2px solid #fed136;' class='card-img-top tour-image' src='" +url +"'>"
    +"<div class='card-body bg-dark text-light tour-body text-center'><h5 class='card-title tour-title'>"+ name+"</h5><p style ='overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;' class='card-text tour-description'>"+bio+"</p>"
        + "</a></div></div></div></td>");
  }

  displayPost() {
    if(!this.state.showPost){
    var val = !this.state.showPost;
    this.setState({ showPost: val });
    this.setState({ showEdit: false });
    this.setState({ showFriend: false });
    }
  }
  displayFriend() {
    if(!this.state.showFriend){
    var val = !this.state.showFriend;
    this.setState({ showFriend: val });
    this.setState({ showEdit: false });
    this.setState({ showPost: false });
    this.getFriend();
    }
  }

  displayEdit() {
    if(!this.state.showEdit){
    var val = !this.state.showEdit;
    this.setState({ showEdit: val });
    this.setState({ showPost: false });
    this.setState({ showFriend: false });
  }
}


  getFriend() 
  {
   
  }

  checkUpload() {
    //console.log(this.state.userCreated.id);
    let storageRef = firebase.storage().ref().child('photos/' + this.state.userCreated.id);
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
       
      }).catch(err => {
        //   console.log(err.code);

      })
   
    document.getElementById("message").innerText = "Updated Successfully. Refresh to View Changes !"
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
    const friendsRef = firebase.firestore().collection('users').doc(user.uid).collection("friends");
    const unsub = friendsRef.onSnapshot((snapshot) => {
     const data = snapshot.docs.map((doc) => {
     const vv = (doc.data().userId);
     if(vv!=""){
     const userR = firebase.firestore().collection('users').doc(vv).onSnapshot((snapshot) => {
       this.setState({members:snapshot.data()})
      // console.log(snapshot.data())
       this.loadFriends(snapshot.data().photoUrl,snapshot.data().name,snapshot.data().bio)
     })
   }
   }
 
     );
     unsub();
     
 })
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
     
      <Navbar/>
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
                  
                    <ul className="row2tab">
                      <li onClick={() => this.displayPost()}><i className="fa fa-list-alt"></i> My posts </li>
                      <li onClick={() => this.displayFriend()}><i className="fa fa-heart" ></i> Friends </li>

                      <li onClick={() => this.displayEdit()}><i className="fa fa-thumbs-o-up "></i> Edit Profile </li>
                    </ul>


                  </div>
                  <div className="hidDiv" style={{ display: (showPost ? 'block' : 'none') }}>you have no posts!</div>

                  <div className="hidDiv" style={{ display: (showFriend ? 'block' : 'none') }}>
                   <div id="mem" ></div>

                  
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