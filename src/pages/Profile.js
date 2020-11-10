import firebase from "firebase";
import React ,{useState} from 'react';
import { Redirect, useHistory } from "react-router-dom";
import Sidebar from "../Sidebar";
import "../user.css";
import Navbar from "../Navbar"
import fire from "../fire";
import { createPath } from "history";


class Profile extends React.Component {


  constructor(props) {
    super(props);

   
    this.state = { userCreated: [], friendsRef: [], user: [], friend: [], picture: [],
       imgUrl: [],activities:0,activity:[],totalPost:0,totalFriend:0,totalUsers:0,totalCamps:0,noPost:null,noFriend:null}
  }


  state = {
    showPost: false,
    showEdit: false,
    showFriend: false,
    id: ""

  }

  loadUsers(id,url)
    {if(id!=this.state.userCreated.uid){
     if(this.state.totalUsers<9){
      document.getElementById("use").innerHTML +=("<span><a style='text-decoration: none' href='/viewProfile/"+id+"'><img src="+url+" width='70' height='70' style='margin:10px;border-radius:50px'/> </a></span>");
     }
    }}

    loadCampaigns(id,title)
    {
      if(this.state.totalCamps<6){
      document.getElementById("camps").innerHTML +=("# <a style='text-decoration: none' href='/viewCampaign/" + id+"'<p class='lead'>"+ title+"</p>");
      }
    }
    noFriends()
    {
      if(this.state.totalFriend<1){
        this.setState({noFriend:true}); 
          }
    }
    noPost()
    {
      if(this.state.totalPost<1){
      this.setState({noPost:true}); 
      }
    }
  loadPosts(title,desc)
  {
   // console.log(this.state.totalFriend,this.state.totalPost)
 this.setState({noPost:false})
document.getElementById("pos").innerHTML+=" <legend>Your Recent Posts:</legend><div class='card-dark' style='margin-top:20px'><h3 class='card-header bg-dark text-light' style='border-bottom: 2px solid #FED136'>"+title+"</h3><div class='card-body bg-dark'> <div class='input-group'><p class='text-white'>"+desc+"</p></div></div></div>"
  
}

  loadFriends(id,url,name,bio)
  {
    this.setState({noFriend:false})
    document.getElementById("mem").innerHTML +=("<td><a style='text-decoration: none' href='/viewProfile/"+id+"'><div class='card bg-dark mb-3 tour shadow' style='float:left;margin:10px;max-width:200px'><img style='width:200px;height:200px;padding-bottom:8px;border-bottom:2px solid #fed136;' class='card-img-top tour-image' src='" +url +"'>"
    +"<div class='card-body bg-dark text-light tour-body text-center'><h5 class='card-title tour-title'>"+ name+"</h5><p style ='overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;' class='card-text tour-description'>"+bio+"</p>"
        + "</a></div></div></div></a></td>");
    
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


  calculateScore()
  {
    var a = this.state.activities;
    var score=Math.floor((a/69)*100);
    return score;
  }

 addActivity()
 {
  this.state.activities+=1;
  
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
    let index = document.getElementById("imageInput").files.length
    let picture = document.getElementById("imageInput").files[index-1];
    let storage = firebase.storage().ref().child('photos/' + this.state.userCreated.id);
    let id = this.state.userCreated.id;
if(picture){
 
  let uploadTask = storage.put(picture)
  uploadTask.on('state_changed', function(snapshot){
  }, function(error) {
      // Handle unsuccessful uploads
    }, function() {
     
      storage.getDownloadURL()
        .then((url) => {
          if(url){
          firebase.firestore().collection("users").doc(id).update({
            "name": nameInput,
            "bio": bioInput,
            "photoUrl": url
          }
          ).then(()=>
          {
            window.location.reload()
          })
        }
      }).catch(err => {
           // console.log(err.code);
        })
    })
}else
{
  firebase.firestore().collection("users").doc(id).update({
    "name": nameInput,
    "bio": bioInput
  }
  ).then(()=>
  {
    window.location.reload()
  })
}

   
    
    document.getElementById("message").innerText = "Updated Successfully!"
  }

  componentDidMount() {
    // this.displayFriend();
    //console.log(this.state.activity)
    this.displayPost();
   this.noFriends();
    this.noPost();
    this.noPost();
    this.noFriends();
    this.setState({totalFriend:0})
    this.setState({totalPost:0})
    this.setState({totalUsers:0})
    this.setState({totalCamps:0})
    const uRef = firebase.firestore().collection('users');
    const unub = uRef.onSnapshot((snapshot) => {
     
     const data = snapshot.docs.map((doc) =>
     {
       if(doc)
       {
         this.state.totalUsers+=1;
        this.loadUsers(doc.id,doc.data().photoUrl)
       }
     })
     unub();
   //  console.log("All data in 'books' collection", data);
   
     
 
 })
 const uuRef = firebase.firestore().collection('campaigns');
 const unuub = uuRef.onSnapshot((snapshot) => {
  
  const data = snapshot.docs.map((doc) =>
  {
    if(doc)
    {
      this.state.totalCamps+=1;
    //  console.log(doc.id,doc.data().name)
     this.loadCampaigns(doc.id,doc.data().name)
    }
  })
  unuub();
 // console.log("All data in 'books' collection", data);

  

})
         
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const usersRef = firebase.firestore().collection('users');
        const unsubscribe = usersRef.doc(user.uid).onSnapshot((snapshot) => {
          const data = snapshot.data()
          this.setState({ userCreated: snapshot.data() });
          this.state.userCreated.id = user.uid;
          //this.checkUpload();
        }

        )
    const friendsRef = firebase.firestore().collection('users').doc(user.uid).collection("friends");
    const unsub = friendsRef.onSnapshot((snapshot) => {
     const data = snapshot.docs.map((doc) => {
      this.state.totalFriend+=1;
     const vv = (doc.data().userId);
     if(vv!=""){
     const userR = firebase.firestore().collection('users').doc(vv).onSnapshot((snapshot) => {
       this.setState({members:snapshot.data()})
      // console.log(snapshot.data())
      
       this.loadFriends(vv,snapshot.data().photoUrl,snapshot.data().name,snapshot.data().bio)
     })
   }
   }
     );
     unsub();
     
 })
       }

              const snapshot = fire.firestore().collection("campaigns").where('owner_id', '==', user.uid).get().then(snapshot => {
    
                const data = snapshot.docs.map((doc) => 
                {
                 // this.setState({activity:doc.data()})
                  this.addActivity()  
                }
                );
             
    })
    const snapshott = fire.firestore().collectionGroup("posts").where('userId', '==', user.uid).get().then(snapshott => {
     
      const dataa = snapshott.docs.map((doc) => {
      
      this.loadPosts(doc.data().title,doc.data().description)
      this.state.totalPost+=1;
        this.addActivity()  
        console.log(doc.data(),this.state.totalPost)
      });
      
    
})
const snapsho = fire.firestore().collectionGroup("threads").where('userId', '==', user.uid).get().then(snapsho => {
     
  const dataa = snapsho.docs.map((doc) => {
  
    this.addActivity()  
  });
  

})
const snapshottt = fire.firestore().collectionGroup("comments").where('userId', '==', user.uid).get().then(snapshottt => {
     
  const dataaa = snapshottt.docs.map((doc) => {
    this.loadPosts(doc.data().title,doc.data().description)
    this.state.totalPost+=1;
    this.addActivity()  
  });
  

})

       })
    

    

  }



  render() {
   
    const { id } = this.state
    const { showPost } = this.state;
    const { showFriend } = this.state;
    const { showEdit } = this.state;




    return (

      <div className="App">
     
      <Navbar/>
        <br /><br />

        <section className="page-section">
          {/* {this.state.activity.map(data=>
            {
                console.log(data)
            })} */}
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
                            <h1>{this.state.totalFriend}</h1>
                            <span>Friends</span>
                          </div>
    <div className="col3"><h1>{this.state.activities}</h1>
                            <span>Activities</span></div>
    <div className="col3 last"><h1>{this.calculateScore()}</h1>
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
                  <div className="hidDiv"  style={{ display: (showPost ? 'block' : 'none') }}>
                  <br></br>
                  
               <div id="pos" className="col-md-12"></div>
           {this.state.noPost ? (<img src="https://firebasestorage.googleapis.com/v0/b/protst.appspot.com/o/noPost.jpg?alt=media&token=c974d3de-c33f-4625-b28d-be6aa597e265" class="img-fluid"/>):("")}
            
                  </div>

                  <div className="hidDiv" style={{ display: (showFriend ? 'block' : 'none') }}>
                   <div id="mem" ></div>
                   
                   {this.state.noFriend ? (<img src="https://firebasestorage.googleapis.com/v0/b/protst.appspot.com/o/noFriend.jpg?alt=media&token=10318a95-b20f-4dab-98f5-6e0305f830d9" class="img-fluid"/>):("")}
             
                  </div>
                  <div className="hidDiv" style={{ display: (showEdit ? 'block' : 'none') }} >

                    <div className="container">
                      <div className="row">
                        <div className="col-lg-12" id="editForm">

                          <fieldset>
                            <legend>Edit Personal Information:</legend>
                            <br />
                            <div className="form-group row">
                              <div className="col-md-8">
                                <div className="form-group" >
                                  <label for="Name">Name </label>
                                  <input type="text" className="form-control" id="name" defaultValue={this.state.userCreated.name} />
                                </div>
                              </div>

                            </div>

                            <div className="form-group">
                              <label for="Bio">Bio </label>
                              <textarea className="form-control" id="bio" defaultValue={this.state.userCreated.bio}></textarea>
                            </div>

                            <div className="form-group">
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
              </div> 
              <div className="col-md-4">
              <div class="card-dark">
              <h3 class="card-header bg-dark text-light" style={{borderBottomColor: "#FED136"}}>User Profiles
              </h3>
              <div class="card-body bg-dark text-white" id="use">
                </div>
            </div>
            
            <hr/>
            <div class="card-dark">
              <h3 class="card-header bg-dark text-light" style={{borderBottomColor: "#FED136"}}>Campaign List
              </h3>
              <div class="card-body bg-dark text-white" >
                <div id="camps"></div>
              <a href="/campaigns" style={{textDecoration:'none'}}><p className="lead" >View More</p></a>
                </div>
               
            </div>
            </div>
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