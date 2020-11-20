import React, {Component, useContext} from 'react';
import '../App.css';
import firebase from 'firebase';
import '../assets/css/cards.css'
import Navbar from '../Navbar';
import { AuthContext } from '../Auth';



class CreateThread extends React.Component {
    
  constructor(props) {
      
      super(props);
        
      this.state = {threadCreated : [],campaign:[], current:[],rand:(Math.random().toString(36).slice(2)),uploaded:false};
     
      }

      getCampaigns(id,title)
      {
        document.getElementById("camps").innerHTML +=("# <a style='text-decoration: none' href='/viewCampaign/"  + id+"'<p class='lead'>"+ title+"</p>");
      }
      
      handleSubmit()
      {

    let title = document.getElementById("title").value;
    let desc = document.getElementById("description").value;
    let index = document.getElementById("poster").files.length
    let picture = document.getElementById("poster").files[index-1];
    let id = this.state.current.uid
   let ca= this.props.match.params.camp

if(picture){
    let ref = 'threads/' + this.state.rand
    if(title=="" || desc==""){
        document.getElementById("error").innerText="Please fill All The Above Fields !"
      }else{
     let storageRef = firebase.storage().ref().child('threads/' + this.state.rand)
     let storageTask = storageRef.put(picture)
     storageTask.on('state_changed', function(snapshot){
    }, function(error) {
        // Handle unsuccessful uploads
      }, function() {
        storageRef.getDownloadURL()
        .then((url) => {
            console.log("url", url)
      const userRef = firebase.firestore().collection('users');
       
           
         firebase.firestore().collection('campaigns').doc(ca).collection("threads").doc().set({
           description: desc,
           photoUrl:url,
           title:title,
           userId:id
           
         }).then(()=>
         {
           window.location.replace("/viewCampaign/"+ca)
         })
         
      document.getElementById("error").innerText="Thread added successfully!"
      document.getElementById("poster").value=null;
         document.getElementById("title").value="";
         document.getElementById("description").value="";
  
       
          
      
        }
        )}
        
      
        )
      }
      
    
  
}else{
    document.getElementById("error").innerText="Thread Picture can't be empty!";
}

      }
    componentDidMount() 
    {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({current:user})
            }
        })
        const campaignRef = firebase.firestore().collection('campaigns');
        campaignRef.doc(this.props.match.params.camp).onSnapshot((snapshot) => {
    
          const data = snapshot.data()
    
          this.setState({ campaign: snapshot.data() });
   
        })
        
        const campaignsRef = firebase.firestore().collection('campaigns');
        const unsub = campaignsRef.onSnapshot((snapshot) => {
         
         const data = snapshot.docs.map((doc) => {
                this.getCampaigns(doc.id,doc.data().name)
         }
         
         );
         unsub();
        
     
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
 <h1 className="mt-4" style={{fontFamily: "Work Sans"}}>Add A New Thread</h1>

<p className="lead">Please fill all the fields below correctly!</p>
    </div>
 <br/>
 <div id="editForm">
<fieldset>
  
<div class="form-group">
    <div class="col-md-8">
      <div className="form-group" >
        <label for="campaign">Campaign: </label>
        <input type="text" class="form-control" id="campaign" value={this.state.campaign.name} disabled/>
      </div>
    </div>
    </div>
  <div class="form-group">
    <div class="col-md-8">
      <div className="form-group" >
        <label for="title">Title: </label>
        <input type="text" class="form-control" id="title" placeholder="Thread Title" />
      </div>
    </div>

  </div>
  <div class="form-group">
  <div class="col-md-8">
    <label for="description">Description: </label>
    <textarea class="form-control" id="description" rows="5" placeholder="Thread Description"></textarea>
  </div>
</div>
  <div class="form-group">
  <div class="col-md-8">
    <label for="poster">Thread Picture:</label><br />
    <input type="file" id="poster" accept="image/*" />
    </div>
  </div>
  
  <br />
  <button type="submit" id="submit"  onClick={()=>this.handleSubmit()} className="btn btn-info" style={{ width: 200 }}>Submit</button>
<p id="error"></p>
</fieldset>
         </div>
         </div>
         <div className="col-md-4">
         
         <div class="card-dark" >
             <h3 class="card-header bg-dark text-light" style={{borderBottomColor: "#FED136"}} >Campaigns List
             </h3>
             <div class="card-body bg-dark text-white" id="camps">
           
               </div>
           </div>
           <hr/>
           <div class="card-dark" >
             <h3 class="card-header bg-dark text-light" style={{borderBottomColor: "#FED136"}} >About Protst.org
             </h3>
             <div class="card-body bg-dark text-white">
           <p className="lead" style={{overflow: "hidden",display: "-webkit-box",WebkitLineClamp: 5,WebkitBoxOrient: "vertical"}}>The premise of Protst.org was based on the current state of global affairs. The rise of various groups with differing agenda under the umbrella of protesting against police brutality lead to the idea of creating a platform that would allow these groups to connect with each other. 
Protst.org focuses on creating a platform to allow different groups across different areas of the world to find each other as well as discuss their ideologies and potential long-term goals. We plan on creating a platform that well act as a means for individual grassroot movements to get together as well as give opportunities for individuals to have a larger voice in sharing their opinion and give rise to more leadership and structure within various movements. 
Protst.org is web based and designed to also be available on mobile platforms as well as integration with various social media outlets. We also include various social features like group and individual chat features to allow for discussions among various users.</p>
              <a href="/about" style={{textDecoration:"none"}}><p className="lead">Read More</p></a>
               </div>
           </div>
        
              
               </div>
         </div>
        
           

       
         </section>
         </div>
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
}
}


export default CreateThread;
