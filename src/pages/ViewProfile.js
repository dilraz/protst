import firebase from "firebase";
import React ,{useState} from 'react';
import { Redirect, useHistory } from "react-router-dom";
import Sidebar from "../Sidebar";
import "../user.css";
import Navbar from "../Navbar"
import fire from "../fire";
import { createPath } from "history";


class ViewProfile extends React.Component {


  constructor(props) {
    super(props);

   
    this.state = { userCreated: [], user: [],isFriend:null, friend: [], activities:0,activity:[],totalPost:0,totalFriend:0,totalUsers:0,totalCamps:0,isUser:null}
  }

  add(){
    fire.firestore().collection('users').doc(this.state.user.uid).collection("friends").doc().set({
      userId: this.props.match.params.user,
    }).then(()=>
    {
        fire.firestore().collection('users').doc(this.props.match.params.user).collection("friends").doc().set({
            userId: this.state.user.uid,
          })
    }
    )
    .then(()=>
    {
      this.setState({isFriend:true})
      window.location.reload()
    })

  }

  checkFriend()
  {
    
const snapshottt = fire.firestore().collection("users").doc(this.state.user.uid).collection("friends").onSnapshot((snapshottt) => {
     
  const dataaa = snapshottt.docs.map((doc) => {
  //  console.log(doc.data().user_id,this.state.user.uid)
    if(doc.data().userId==this.props.match.params.user)
    {
      this.setState({isFriend:true})
    //  console.log(this.state.joined)
    }
  });
})
    
const snapshot3 = fire.firestore().collection("users").doc(this.props.match.params.user).collection("friends").onSnapshot((snapshot3) => {
     
    const dataaa = snapshot3.docs.map((doc) => {
    //  console.log(doc.data().user_id,this.state.user.uid)
      if(doc.data().userId==this.state.user.uid)
      {
        this.setState({isFriend:true})
      //  console.log(this.state.joined)
      }
    });
  })

  }
  remove()
  {
    var delete_query =  fire.firestore().collection('users').doc(this.state.user.uid).collection("friends").where("userId","==",this.props.match.params.user)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete().then(() => {
            
        //  console.log("Document successfully deleted!");
        }).catch(function(error) {
        //  console.error("Error removing document: ", error);
        });
      });
    })
    .catch(function(error) {
   //   console.log("Error getting documents: ", error);
    })
    var delete_query2 =  fire.firestore().collection('users').doc(this.props.match.params.user).collection("friends").where("userId","==",this.state.user.uid)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete().then(() => {
        //  console.log("Document successfully deleted!");
        }) .then(()=>
        {
         this.setState({isFriend:false})
          window.location.reload()
        }).catch(function(error) {
        //  console.error("Error removing document: ", error);
        });
      });
    })
    .catch(function(error) {
   //   console.log("Error getting documents: ", error);
    })



   
  }
 

  loadUsers(id,url)
    {if(id!=this.state.user.uid){
     if(this.state.totalUsers<9){
      document.getElementById("use").innerHTML +=("<span><a style='text-decoration: none' href='/viewProfile/"+id+"'><img src="+url+" width='70' height='70' style='margin:10px;border-radius:50px'/> </a></span>");
     }
    }}
  




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
 useEffect()
 {return(
   this.checkFriend()
 )
   ,[]
 }
  componentDidMount() {
    // this.displayFriend();
    //console.log(this.state.activity)
    this.setState({isUser:false})
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
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
          
          this.setState({user:user})
          this.checkFriend();
        const usersRef = firebase.firestore().collection('users');
        const unsubscribe = usersRef.doc(this.props.match.params.user).onSnapshot((snapshot) => {
            
          const data = snapshot.data()
          this.setState({ userCreated: snapshot.data() });
          if(this.state.userCreated)
          {
            this.state.userCreated.id = snapshot.id;
          }
         
          if(this.state.userCreated && this.state.userCreated.id){
               
          console.log(this.state.user.uid,this.state.userCreated.id)
          if(this.state.user.uid==this.state.userCreated.id)
          {
             this.setState({isUser:true}) 
          }
          //this.checkUpload();
        }
        }

        )
    const friendsRef = firebase.firestore().collection('users').doc(this.props.match.params.user).collection("friends");
    const unsub = friendsRef.onSnapshot((snapshot) => {
     const data = snapshot.docs.map((doc) => {
      this.state.totalFriend+=1;
     const vv = (doc.data().userId);
     if(vv!=""){
     const userR = firebase.firestore().collection('users').doc(vv).onSnapshot((snapshot) => {
       this.setState({members:snapshot.data()})
      // console.log(snapshot.data())
      
     })
   }
   }
     );
     unsub();
     
 })
       }

              const snapshot = fire.firestore().collection("campaigns").where('owner_id', '==', this.props.match.params.user).get().then(snapshot => {
    
                const data = snapshot.docs.map((doc) => 
                {
                 // this.setState({activity:doc.data()})
                  this.addActivity()  
                }
                );
             
    })
    const snapshott = fire.firestore().collectionGroup("posts").where('userId', '==', this.props.match.params.user).get().then(snapshott => {
     
      const dataa = snapshott.docs.map((doc) => {
      
      this.state.totalPost+=1;
        this.addActivity()  
      });
      
    
})
const snapsho = fire.firestore().collectionGroup("threads").where('userId', '==', this.props.match.params.user).get().then(snapsho => {
     
    const dataa = snapsho.docs.map((doc) => {
    
      this.addActivity()  
    });
    
  
})
const snapshottt = fire.firestore().collectionGroup("comments").where('userId', '==', this.props.match.params.user).get().then(snapshottt => {
     
  const dataaa = snapshottt.docs.map((doc) => {
    this.state.totalPost+=1;
    this.addActivity()  
  });
  

})

       })
    

       

  }



  render() {


if(this.state.userCreated){

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
                        <tr> 
                            <td style={{width:"60%"}}><h1>{this.state.userCreated.name}</h1></td>
    <td style={{width:"20%"}}>
        {this.state.isUser ? (""):(
            this.state.isFriend ? (<button className="btn btn-danger" onClick={()=>this.remove()}>Remove Friend</button>):(<button id="bt" onClick={()=>this.add()} className="btn btn-info">Add Friend</button>)
    )}
      
      
      </td>  </tr>
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
                  
                   
              </div></div></div> 
              <div className="col-md-4">
              <div class="card-dark">
              <h3 class="card-header bg-dark text-light" style={{borderBottomColor: "#FED136"}}>User Profiles
              </h3>
              <div class="card-body bg-dark text-white" id="use">
                </div>
            </div>
            
            </div></div></div>

        </section>
        <footer className="footer" >
<div className="container">
<div className="row align-items-center">
  <div className="col-md-4">
    <span className="copyright">Copyright &copy; PROTST.ORG 2020</span>
  </div>
 
  <div className="col-md-8">
    <ul className="list-inline quicklinks">
      <li className="list-inline-item">
       Standardizing the way of protest around the world.&emsp;
      </li>
      <li className="list-inline-item">
       <a href="/about" style={{textDecoration:"none"}}>Read More About Us</a>
      </li>
    </ul>
  </div>
</div>
</div>
</footer>

      </div>


    );
  }else{
      return null;
  }
}
}

export default ViewProfile;