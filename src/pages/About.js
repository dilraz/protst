import React, {Component, useContext} from 'react';
import '../App.css';
import firebase from 'firebase';
import '../assets/css/cards.css'
import Navbar from '../Navbar';
import { AuthContext } from '../Auth';



class About extends React.Component {
    
  constructor(props) {
      
      super(props);
        
      this.state = {user:[]};
     
      }

      getCampaigns(id,title)
      {
        document.getElementById("camps").innerHTML +=("# <a style='text-decoration: none' href='/viewCampaign/"  + id+"'<p class='lead'>"+ title+"</p>");
  
      }

    componentDidMount() 
    {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({user:user})
            }
        })
       
        const campaignsRef = firebase.firestore().collection('campaigns');
        const unsub = campaignsRef.onSnapshot((snapshot) => {
         
         const data = snapshot.docs.map((doc) => {
                this.getCampaigns(doc.id,doc.data().name)
         }
         
         );
         unsub();
         //console.log("All data in 'books' collection", data);
        
         
     
     })
      
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
 <div className="col-md-8">
 <h1 className="mt-4" style={{fontFamily: "Work Sans"}}>About PROTST.Org</h1>


    </div>
 <br/>
 <p className="lead">The premise of Protst.org was based on the current state of global affairs. The rise of various groups with differing agenda under the umbrella of protesting against police brutality lead to the idea of creating a platform that would allow these groups to connect with each other. 
Protst.org focuses on creating a platform to allow different groups across different areas of the world to find each other as well as discuss their ideologies and potential long-term goals. We plan on creating a platform that well act as a means for individual grassroot movements to get together as well as give opportunities for individuals to have a larger voice in sharing their opinion and give rise to more leadership and structure within various movements. 
Protst.org is web based and designed to also be available on mobile platforms as well as integration with various social media outlets. We also include various social features like group and individual chat features to allow for discussions among various users.</p>
         </div>
         <div className="col-md-4">
         
         <div class="card-dark" >
             <h3 class="card-header bg-dark text-light" style={{borderBottomColor: "#FED136"}} >Campaigns List
             </h3>
             <div class="card-body bg-dark text-white" id="camps">
           
               </div>
           </div></div></div>
          
                 
           

       
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


export default About;
