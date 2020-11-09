import React, {Component} from 'react';
import '../App.css';
import firebase from 'firebase';
import '../assets/css/cards.css'
import Navbar from '../Navbar';



class Thread extends React.Component {
    
  constructor(props) {
      
      super(props);
        
      this.state = {threadCreated : [],posts:[], user:[],comments:[]};
     
   
      }

      addComment()
  {
    let title = document.getElementById("title").value;
    let comment = document.getElementById("comments").value;
    const userRef = firebase.firestore().collection('users');
  //  console.log(this.state.user.uid)
    userRef.doc(this.state.user.uid).onSnapshot((snapshot) => {

      const data = snapshot.data().photoUrl
      if(title=="" || comment==""){
        document.getElementById("error").innerText="Please fill All The Above Fields !"
      }else{
       firebase.firestore().collection('campaigns').doc(this.props.match.params.camp).collection("threads").doc(this.props.match.params.thread).collection("comments").doc().set({
         userId: this.state.user.uid,
         description: comment ,
         media_url:"",
         supportScore:0,
         title:title,
         created: firebase.firestore.Timestamp.now(),
         pic:data
       })
       document.getElementById("error").innerText="Shared Successfully!";
       document.getElementById("title").value="";
       document.getElementById("comments").value="";
     }
       
       // console.log("Owner", );
    }
    )


 
  }

  deleteComment(id)
  {
    var delete_query =  firebase.firestore().collection('campaigns').doc(this.props.match.params.camp).collection("threads").doc(this.props.match.params.thread).collection("comments").doc(id).delete();
    
     
  }

      getThreads(title,id)
      {
        var user = localStorage.getItem("isThere");
        if(user =="yes"){
        document.getElementById("threads").innerHTML +=("# <a style='text-decoration: none' href='/thread/"+this.props.match.params.camp + "/"  + id+"'<p class='lead'>"+ title+"</p>");
        }
      }

      getMembers(url)
      {
        var user = localStorage.getItem("isThere");
        if(user =="yes"){
        document.getElementById("mem").innerHTML +=("<span><img src="+url+" width='70' height='70' style='margin:10px;border-radius:50px'/> </span>");
        }
      }

      componentDidMount() {
     
     //   this.returnUser();
        
        firebase.auth().onAuthStateChanged(user=>
          {
            if(user)
            {
              this.setState({user:user})
            //  console.log(user)
            }
          })

        const threadsRef = firebase.firestore().collection('campaigns').doc(this.props.match.params.camp).collection('threads');
        const unsubscribe = threadsRef.doc(this.props.match.params.thread).onSnapshot((snapshot) => {
          const data = snapshot.data()
          this.setState({ threadCreated: snapshot.data() });
        }

        )
        const membersRef = firebase.firestore().collection('campaigns').doc(this.props.match.params.camp).collection("members");
        const unsub = membersRef.onSnapshot((snapshot) => {
         const data = snapshot.docs.map((doc) => {
         const vv = (doc.data().user_id);
         if(vv!=""){
         const userR = firebase.firestore().collection('users').doc(vv).onSnapshot((snapshot) => {
           this.setState({members:snapshot.data()})
          // console.log(snapshot.data())
           this.getMembers(snapshot.data().photoUrl,snapshot.data().name)
         }) }}
     ); unsub();})

       
const threadRef = firebase.firestore().collection('campaigns').doc(this.props.match.params.camp).collection("threads");
const unsub2 = threadRef.onSnapshot((snapshot) => {
 const data = snapshot.docs.map((doc) => {
 const vv = (doc.data().title);
 if(doc.id!=this.props.match.params.thread){
   this.getThreads(vv,doc.id)}
}

); unsub2();})
           
const commentsRef = firebase.firestore().collection('campaigns').doc(this.props.match.params.camp).collection("threads").doc(this.props.match.params.thread).collection("comments").orderBy('created', 'desc');
commentsRef.onSnapshot((snapshot) => {

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }

  ));
  this.setState({ comments: data })
  //console.log("All data in 'books' collection", data);
}
)
         
    };
      
   
 render(){

  return (
    
    <div className="App">
      
     <Navbar/>

  <br/><br/>
  <div className="container">
  <section className="page-section">
    <div className="row">
  <div className="col-lg-8">
      <div className="row" style={{margin:20}}>
<div className="col-lg-3">
    <img src={this.state.threadCreated.photoUrl} className="rounded-circle img-fluid"/>
 
  </div>
 <div className="col-md-9">
 <h2 class=" text-uppercase">{this.state.threadCreated.title}</h2>
 <p className="lead">{this.state.threadCreated.description}</p>
 </div>
 <div className="col-md-12">
 <div className="card my-4">
                  <h5 className="card-header text-white bg-dark">Comment on this thread:</h5>
                  <div className="card-body">
                  <div className="form-group">
                        <input type="text" id="title" className="form-control" placeholder="Comment Title" />
                      </div>
                      <div className="form-group">
                        <textarea id="comments" className="form-control" rows="3" placeholder="Description"></textarea>
                      </div>
                      <button type="submit" onClick={()=>this.addComment()} className="btn btn-primary">Submit</button>
                   <br/>
                   <p id="error"></p>
                  </div>

                </div>
                {this.state.comments.map(data => {
                  //console.log(data.userId,this.state.user.uid)
if(data.userId == this.state.user.uid){

                  return (
                    <div className="media mb-4">
                      <img className="d-flex mr-3 rounded-circle"  src={data.pic} width="50" height="50" alt="" />
                      <div className="media-body">
                        <h5 className="mt-0">{data.title}</h5>
                        {data.description}
                      </div>
                      <button className="btn btn-danger" onClick={()=>this.deleteComment(data.id)}>Delete</button>
                    </div>
                  );
}else {
 
  return (
    
    <div className="media mb-4">
      <img className="d-flex mr-3 rounded-circle"  src={data.pic} width="50" height="50" alt="" />
      <div className="media-body">
        <h5 className="mt-0">{data.title}</h5>
        {data.description}
      </div>
     
    </div>
  );
}
                })}
    </div>
 </div>
 <br/>
 
        
         </div>
         
         <div className="col-md-4">
         <div class="card-dark">
              <h3 class="card-header bg-dark text-light" style={{borderBottomColor: "#FED136"}}>Related Threads
              </h3>
              <div class="card-body bg-dark text-white" id="threads">
            
                </div>
            </div>
            <hr/>
                <div class="card-dark">
              <h3 class="card-header bg-dark text-light" style={{borderBottomColor: "#FED136"}}>Campaign Members
              </h3>
              <div class="card-body bg-dark text-white" id="mem">
            
                </div>
            </div>
           
               
                </div>
           

       
         </div>
         </section>
         </div>
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


export default Thread;
