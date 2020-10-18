import React, {Component} from 'react';
import '../App.css';
import firebase from 'firebase';
import Autopilot from 'twilio/lib/rest/Autopilot';
import Sidebar from "../Sidebar"

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
        //  console.log("All data in 'books' collection", this.state.campaign);
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
  {/* <section className="page-section">
    <div className="row">
  <div className="col-lg-8">

<div className="text-center">
  <h2 className="section-heading text-uppercase">{this.state.campaign.name}</h2>
   </div>
 
  <p className="lead">{this.state.campaign.location}</p>
  <img style={{border:"2px solid black"} } className="img-fluid" src={this.state.campaign.photoUrl}  />
 <br/><br/>
 <p className="text-muted lead" style={{width:"90%",margin:"auto"}} >{this.state.campaign.description}</p> 
        
         </div>

         <div className="col-md-3">
<div className="card my-4">
<div className="card-header">Create a Video Group</div>
<div className="card-body">
  <div className="input-group">
    <p className="text-muted">Click below to join the video conference</p>
    <a className="btn btn-warning" href={"/videoGroup/" + this.state.campaign.name} >Join Now!</a>
  </div>
</div>
</div>


         </div>
         </div>
         </section>
         
  */}
  <section className="page-section">
  <div className="container">

    <div className="row">

      <div className="col-lg-8">

        <h1 className="mt-4">{this.state.campaign.name}</h1>

        <p className="lead">
          by
          <a href="#"> Start Bootstrap</a>
        </p>

        <hr/>

        <p>Posted on January 1, 2019 at 12:00 PM</p>

        <hr/>

        <img className="campaign-img" src={this.state.campaign.photoUrl} alt=""/>

        <hr/>

        <p>{this.state.campaign.description}</p>

        <hr/>

        <div className="card my-4">
          <h5 className="card-header">Leave a Comment:</h5>
          <div className="card-body">
            <form>
              <div className="form-group">
                <textarea className="form-control" rows="3"></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>

        <div className="media mb-4">
          <img className="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt=""/>
          <div className="media-body">
            <h5 className="mt-0">Commenter Name</h5>
            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
          </div>
        </div>

        <div className="media mb-4">
          <img className="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt=""/>
          <div className="media-body">
            <h5 className="mt-0">Commenter Name</h5>
            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.

            <div className="media mt-4">
              <img className="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt=""/>
              <div className="media-body">
                <h5 className="mt-0">Commenter Name</h5>
                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
              </div>
            </div>

            <div className="media mt-4">
              <img className="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt=""/>
              <div className="media-body">
                <h5 className="mt-0">Commenter Name</h5>
                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
              </div>
            </div>

          </div>
        </div>

      </div> <Sidebar 
      type="c" 
      campId={this.props.match.params.id}  />
</div></div>

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
