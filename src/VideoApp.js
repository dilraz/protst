import React from 'react';
import './Video.css';
import './App.css'
import VideoChat from './VideoChat';
import Navbar from './Navbar';

class VideoApp extends React.Component {
  constructor(props) {
    super(props);
    const reactStringReplace = require('react-string-replace')
   const roomName =  reactStringReplace(this.props.match.params.name, "%20", () => " ");
    }
    
render()
{
 return (
    <div className="App">
     <Navbar/>
  <section>
  <div className="container">
  <br/>
<div className="row">
  
 
  <VideoChat
  name = {this.props.match.params.name}/>

</div>

</div>
</section>
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
};


export default VideoApp;
