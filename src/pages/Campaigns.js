import React, {Component} from 'react';
import '../App.css';
import fire from '../fire';
import firebase from 'firebase';
import '../assets/css/cards.css'

class Campaigns extends React.Component {
    
  constructor(props) {
      
      super(props);
     
      this.state = {campaignslist : []}
      }
      
      componentDidMount=()=>{
        const campaignsRef = firebase.firestore().collection('campaigns');
   const unsub = campaignsRef.onSnapshot((snapshot) => {
    
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    
    }
    ));
    unsub();
    console.log("All data in 'books' collection", data);
    this.setState({campaignslist:data})
    

})
        
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
        </ul>
      </div>
    </div>
  </nav>
<section>
   {/* <table id="example" class="display table">
            <thead class="thead-dark">
                <tr>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
            {this.state.campaignslist.map(data => {
                
                return (
                    <tr>     
                    <td>{data.name}</td>
                    <td>{data.location}</td>
                    <td>{data.description}</td>
                    <td>{data.photoUrl}</td>
                    </tr>
                    
                );
               
                })}
        
               
            </tbody>
            
         </table>  */}


<div className="col-lg-12 text-center">
    <h2 className="section-heading text-uppercase">Active Campaigns</h2>
    <h4 className="section-subheading text-muted">Find out more about these active campaigns by clicking on the button below</h4>
  </div>
  <br/>
 
 
    <div class="card-deck">
    {this.state.campaignslist.map(data => {
                return (
  <div className="card text-black bg-light mb-3">
    <img className="card-img-top" src={data.photoUrl}  height="300"/>
    <div className="card-body">
      <h5 className="card-title">{data.name}</h5>
      <p className="card-text">{data.description}</p>
    </div>
    <a style={{color:"black"}} href={"/viewCampaign/" + data.id}>
    <div class="card-footer">
      <h4>View More</h4>
    </div></a>
  </div>
 );
               
})}
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


export default Campaigns;
