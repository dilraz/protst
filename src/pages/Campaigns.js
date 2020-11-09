import React, {Component} from 'react';
import '../App.css';
import fire from '../fire';
import firebase from 'firebase';
import Navbar from '../Navbar';

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
    //console.log("All data in 'books' collection", data);
    this.setState({campaignslist:data})
    

})
        
      }
    
    
 render(){

  return (
    
    <div className="App">
     
     <Navbar/>
<div className="container">
<div className="page-section">
  <br/><hr/>
<div className="col-lg-12 text-center">
    <h2 className="section-heading text-uppercase" style={{fontFamily:"Work Sans"}}>Active Campaigns</h2>
    <h4 className="section-subheading text-muted">Find out more about these active campaigns by clicking on the button below</h4>
    <br/>
   <a href="/createCampaign"><button className="btn btn-info" >Create A Campaign</button></a> 
  </div>
  
  <br/>
 

    <div class="card-deck" style={{justifyContent:"center"}}>
    {this.state.campaignslist.map(data => {
                return (
  <div className="card text-white bg-dark mb-3" style={{maxWidth:380,minWidth:380}}>
    <img className="card-img-top" src={data.photoUrl}  height="270"/>
    <div className="card-body">
      <h5 className="card-title" style={{fontFamily:"Work Sans"}}>{data.name}</h5>
      <p className="card-text" >{data.description}</p>
    </div>
    <a style={{color:"#F2C838",textDecoration:"none"}} href={"/viewCampaign/" + data.id}>
    <div class="card-footer">
      <h5>VIEW CAMPAIGN</h5>
    </div></a>
  </div>
 );
               
})}
      </div></div></div>
        
       
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
