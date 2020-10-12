import React, {Component} from 'react';
import '../App.css';
import firebase from 'firebase';
import '../assets/css/cards.css'



class Wall extends React.Component {
    
  constructor(props) {
      
      super(props);
        
      this.state = {thread : [],posts:[], user:[]};
     
   
      }
      
        returnUser=()=>
        {
            console.log("posts", this.state.posts);
  const userRef = firebase.firestore().collection('users');
  userRef.doc("QrIudL4A0tOKqTVqAKeVU6vUpI72").onSnapshot((snapshot) => {
          
    const data = snapshot.data()
    //console.log("All data in  names collection", data.name);
        this.state.user = data.name;
        })}
    
      componentDidMount() {
     
        this.returnUser();
        
        const threadRef = firebase.firestore().collection('threads');
        threadRef.where("tag", "==", (this.props.match.params.tag)).get().then(querySnapshot => {
            /* ... */
            querySnapshot.forEach(snapshot => {
                
                 this.setState({ thread: snapshot.data() });
                 this.state.thread.id = snapshot.id;
            console.log("All data in 'books' collection", this.state.thread);
              }); 
              if(this.state.thread.id!=null){
              const postRef = firebase.firestore().collection('posts');
              postRef.where("thread_id", "==", (this.state.thread.id)).get().then(snapshot => {
                  let postlist = [];
                  snapshot.forEach(snap => {
                      // snap.val() is the dictionary with all your keys/values from the 'students-list' path
                      postlist.push(snap.data());
                  });
                  this.setState({ posts: postlist });
                });
                
            }
            
          }
          
        )

       
           
            
         
    };
      
   
 render(){

  return (
    
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
    <div className="row">
  <div className="col-lg-8">
      <div className="row" style={{margin:20}}>
<div className="col-lg-3">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRxR6F7m5d1kJJyyL99JZzRQnmKoX9Useq1aw&usqp=CAU" className="rounded-circle img-fluid"/>
  <h2 align="right" class="section-heading text-uppercase">#{this.state.thread.tag}</h2>
  </div>
 <div className="col-md-8">
    <form action="" className="post-form">
      <div class="form-group">
        <label class="control-label string required" for="post_caption">Feel free to share your thoughts below!</label>
        <textarea class="form-control string required" rows="3" required="required" aria-required="true" type="text" name="post[caption]" id="post_caption"></textarea>
      </div>
      <button type="submit" class="btn btn-info btn-lg btn-block">Post</button>
    </form>

 </div>
 </div>
 <br/>
 <table id="example" class="display table">
            <thead class="thead-dark">
                <tr>
                    <th>Comment</th>
                    <th>Posted By</th>
                </tr>
            </thead>
            <tbody>
            { this.state.posts.map(data => {
                
                return (
                    <tr>     
                    <td>{data.title}</td>
                <td>{this.state.user.name}</td>
                    </tr>
                    
                );
               
                })} 
        
               
            </tbody>
            
         </table>
        
         </div>

         <div className="col-md-3">
<div className="card my-4">
<div className="card-header">Create a Video Group</div>
<div class="card-body">
  <div className="input-group">
    <p class="text-muted">Click below to join the video conference</p>
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


export default Wall;
