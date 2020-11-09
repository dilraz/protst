import React, {Component} from 'react';
import '../App.css';
import firebase from 'firebase';
import '../assets/css/cards.css'
import Navbar from '../Navbar';



class Thread extends React.Component {
    
  constructor(props) {
      
      super(props);
        
      this.state = {threadCreated : [],posts:[], user:[]};
     
   
      }
      getThreads(title,id)
      {
        document.getElementById("threads").innerHTML +=("# <a style='text-decoration: none' href='/thread/"+this.props.match.params.camp + "/"  + id+"'<p class='lead'>"+ title+"</p>");
  
      }

      getMembers(url)
      {
        document.getElementById("mem").innerHTML +=("<span><img src="+url+" width='70' height='70' style='margin:10px;border-radius:50px'/> </span>");
     
      }

      componentDidMount() {
     
     //   this.returnUser();
        
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
                      <button type="submit" className="btn btn-primary">Submit</button>
                   <br/>
                   <p id="error"></p>
                  </div>

                </div>

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
