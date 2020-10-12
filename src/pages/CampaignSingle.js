import React, {Component} from 'react';
import '../App.css';
import firebase from 'firebase';
import Autopilot from 'twilio/lib/rest/Autopilot';

class CampaignSingle  extends React.Component  {
  constructor(props) {
      super(props);
     
      this.state = {campaign : []}
      }
      
    componentDidMount() {
     
      const campaignsRef = firebase.firestore().collection('campaigns');
      campaignsRef.doc(this.props.match.params.id).onSnapshot((snapshot) => {
          
          const data = snapshot.data()
          this.setState({ campaign: snapshot.data() });
          console.log("All data in 'books' collection", this.state.campaign);
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

<div class="text-center">
  <h2 class="section-heading text-uppercase">{this.state.campaign.name}</h2>
   </div>
 
  <p className="lead">{this.state.campaign.location}</p>
  <img style={{border:"2px solid black"} } className="img-fluid" src={this.state.campaign.photoUrl}  />
 <br/><br/>
 <p className="text-muted lead" style={{width:"90%",margin:"auto"}} >{this.state.campaign.description}</p> 
        
         </div>

         <div className="col-md-3">
<div className="card my-4">
<div className="card-header">Create a Video Group</div>
<div class="card-body">
  <div className="input-group">
    <p class="text-muted">Click below to join the video conference</p>
    <a className="btn btn-warning" href={"/videoGroup/" + this.state.campaign.name} >Join Now!</a>
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


export default CampaignSingle;
