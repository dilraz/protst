import React, {Component, useContext} from 'react';
import '../App.css';
import firebase from 'firebase';
import '../assets/css/cards.css'
import Navbar from '../Navbar';
import { AuthContext } from '../Auth';



class EditCampaign extends React.Component {
    
  constructor(props) {
      
      super(props);
        
      this.state = {threadCreated : [],campaign:[], current:[],rand:(Math.random().toString(36).slice(2)),uploaded:false};
     
      }

      getCampaigns(id,title)
      {
          if( document.getElementById("camps")){
        document.getElementById("camps").innerHTML +=("# <a style='text-decoration: none' href='/viewCampaign/"  + id+"'<p class='lead'>"+ title+"</p>");
          }
      }

      handleSubmit()
      {

    let title = document.getElementById("title").value;
    let location = document.getElementById("location").value;
    let desc = document.getElementById("description").value;
    let index = document.getElementById("poster").files.length
    let picture = document.getElementById("poster").files[index-1];
    let cid = this.props.match.params.cid;
    if (title == "") {
      title = this.state.campaign.name;
    }
    if (location == "") {
      location = this.state.campaign.location;
    }
    if (desc == "") {
        desc = this.state.campaign.description;
      }
let final;
      if(this.state.campaign.photoUrl.toString().includes("protst.appspot")){
     let name  = (this.state.campaign.photoUrl).toString().split("%2F")
     let name2 = (name[1]).toString().split("?")
        
    final=name2[0];
      }
      else{
final  = this.state.rand
      }

    let storage = firebase.storage().ref().child('campaigns/' + final);
    let id = this.state.current.uid;
if(picture){
 
  let uploadTask = storage.put(picture)
  uploadTask.on('state_changed', function(snapshot){
  }, function(error) {
      // Handle unsuccessful uploads
    }, function() {
     
      storage.getDownloadURL()
        .then((url) => {
          if(url){
          firebase.firestore().collection("campaigns").doc(cid).update({
            "name": title,
            "description": desc,
            "location":location,
            "photoUrl": url
          }
          ).then(()=>
          {
            window.location.replace("/viewCampaign/"+cid)
          })
        }
      }).catch(err => {
           // console.log(err.code);
        })
    })
}else
{
  firebase.firestore().collection("campaigns").doc(cid).update({
    "name": title,
    "description": desc,
    "location":location,
  }
  ).then(()=>
  {
    window.location.replace("/viewCampaign/"+cid)
  })
}

   
    
    document.getElementById("error").innerText = "Campaign Updated Successfully!"
      }
    componentDidMount() 
    {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({current:user})
            }
        })
        const campaignRef = firebase.firestore().collection('campaigns');
        campaignRef.doc(this.props.match.params.cid).onSnapshot((snapshot) => {
    
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
         //console.log("All data in 'books' collection", data);
        
         
     
     })
      
    };
      
   
 render(){
if(this.state.campaign){
  return (
    
    <div className="App">
      
     <Navbar/>

  <br/><br/>
  <div className="container">
  <section className="page-section">
    <div className="row">
    <div className="col-lg-8">
 <div className="col-md-8">
 <h1 className="mt-4" style={{fontFamily: "Work Sans"}}>Edit Your Campaign</h1>

<p className="lead">Please fill all the fields below correctly!</p>
    </div>
 <br/>
 <div id="editForm">
<fieldset>
  <div class="form-group">
    <div class="col-md-8">
      <div className="form-group" >
        <label for="title">Title: </label>
        <input type="text" class="form-control" id="title" defaultValue={this.state.campaign.name} />
      </div>
    </div>

  </div>
  <div class="form-group">
    <div class="col-md-8">
      <div className="form-group" >
        <label for="location">Location: </label>
        <input type="text" class="form-control" id="location" defaultValue={this.state.campaign.location} />
      </div>
    </div>

  </div>
  <div class="form-group">
  <div class="col-md-8">
    <label for="description">Description: </label>
    <textarea class="form-control" id="description" rows="5"  defaultValue={this.state.campaign.description}></textarea>
  </div>
</div>
  <div class="form-group">
  <div class="col-md-8">
    <label for="poster">Campaign Poster:</label><br />
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
}else{
    return null;
}
 }
}


export default EditCampaign;
