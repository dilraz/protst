import React, {Component} from 'react';
import './App.css';
import fire from './fire';
import firebase from 'firebase';
import handleLogout from './pages/SignIn'

class Members  extends React.Component  {
  
  constructor(props) {
    super(props);
     const campId = props;
      this.state = {userslist : [],campId :campId,campaign:[],user:[]};
      
      }
      
    componentDidMount() {
      console.log("camp id", this.state.campId.campId);
       
      const campRef = firebase.firestore().collection('campaignmember');
            campRef.where("campaigns_id", "==", (this.state.campId.campId)).get().then(querySnapshot => {
              /* ... */
              querySnapshot.forEach(snapshot => {
                  
                   this.setState({ campaign: snapshot.data() });
                   this.state.campaign.id = snapshot.id;
              console.log("All data in 'books' collection", this.state.campaign);
                }); 
                
              })
             
              const userRef = firebase.firestore().collection('campaignmember');
              // campRef.doc("dat.users_id").then(querySnapshot => {
              //   /* ... */
              //   querySnapshot.forEach(snapshot => {
                    
              //        this.setState({ campaign: snapshot.data() });
              //        this.state.campaign.id = snapshot.id;
              //   console.log("All data in 'books' collection", this.state.campaign);
              //     }); 
                  
              //   })
              
        //       const userlist=[];
        // this.state.campaign.forEach(dat =>
        //   {
           
        //     console.log(dat.users_id);
           
        //       if(dat.users_id!=null){
        //     const postRef = firebase.firestore().collection('users');

        //     postRef.doc(dat.users_id).then(snapshot => {
        //       snapshot.forEach(doc => {
        //         const data = doc.data();
        //         console.log(doc.id, data);
        //       });
        //     })
        //       this.setState({ user: userlist });
        //  }
         
        //   })
          
          
        
        

     

      
   }
    
  
    
    
 render(){

  return (
    
  <table id="example" class="display table">
            <thead class="thead-dark">
                <tr>
                    <th>name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
            {this.state.userslist.map(data => {
                
                return (
                    <tr>     
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    </tr>
                    
                );
               
                })}
        
               
            </tbody>
            
         </table>


  

  );
}
}


export default Members;
