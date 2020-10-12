import React, {Component} from 'react';
import '../App.css';
import fire from '../fire';
import firebase from 'firebase';
import handleLogout from './SignIn'

class Members  extends React.Component  {
  constructor(props) {
      super(props);
     
      this.state = {userslist : []}
      }
      
    componentDidMount() {
     
     
       
        firebase.database().ref("user-list").on("value", snapshot => {
          let userlist = [];
          snapshot.forEach(snap => {
              // snap.val() is the dictionary with all your keys/values from the 'students-list' path
              userlist.push(snap.val());
          });
          this.setState({ userslist: userlist });
        });
      
      
   }
    
  
    
    
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
          <li className="nav-item">
      <a className="nav-link js-scroll-trigger" href="#contact" onClick={handleLogout}>Logout</a>
          </li>     
        </ul>
      </div>
    </div>
  </nav>
<section>
  <table id="example" class="display table">
            <thead class="thead-dark">
                <tr>
                    <th>name</th>
                    <th>Email</th>
                    <th>Bio</th>
                </tr>
            </thead>
            <tbody>
            {this.state.userslist.map(data => {
                
                return (
                    <tr>     
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.bio}</td>
                    </tr>
                    
                );
               
                })}
        
               
            </tbody>
            
         </table>


  

  
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


export default Members;
