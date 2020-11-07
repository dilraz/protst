import React from 'react';

const FriendCard = ({
  username,
  photourl,
  id
}) => {
  
  return (
    <div class="container">
  <div class="row">
    <div class="col-4"></div>
    <div class="friend-col-3 friend-coverProfile friend-mT20 col-xs-offset-2 friend-dropShadow">
     <div class="row">
       <div class="friend-col friend-rel friend-dropShadow">
         <a class="friend-btn friend-viewBtn" href="#">View Profile</a>
    <img class="img-fluid" src={photourl}/>
       </div>
      </div>

      <div class="friend-col friend-rubyColor friend-profileDetails ">
          <h3>{username}</h3>
          <hr/>
       
    
    
    <div class="friend-col"></div>
  </div>
</div>
</div></div>
  )
}
export default FriendCard;