import React from 'react';
import Sidebar from "../Sidebar"
import "../user.css"

function changeData(val)
    {
        var posts =document.getElementById("posts-div");
        var friends = document.getElementById("friends-div");
        var about = document.getElementById("about-div");
        var edit = document.getElementById("edit-div");

        if(val == "posts")
        {
                posts.hidden=true;
                friends.hidden=false;
                about.hidden=false;
                edit.hidden=false;
        }
        else if(val == "about")
        {
            posts.hidden=false;
            friends.hidden=false;
            about.hidden=true;
            edit.hidden=false;
        }
        else if(val == "friends")
        {
            posts.hidden=false;
            friends.hidden=true;
            about.hidden=false;
            edit.hidden=false;
        }else if(val =="edit")
        {
            posts.hidden=false;
            friends.hidden=false;
            about.hidden=false;
            edit.hidden=true;
        }
    }

class Profile extends React.Component {
 
   

  render(){
      
 return(
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
<div className="container">

  <div className="row">

    <div className="col-lg-8">
	<div className="section1">
			<div>
				<div className="row grid clearfix">
					<div className="col2 first">
						<img src="http://images.contactmusic.com/newsimages/david_beckham_1133321.jpg" alt=""/>
						<h1>david beckham</h1>
						<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
						
					</div>
					<div className="col2 last">
						<div className="grid clearfix">
							<div className="col3 first">
								<h1>694</h1>
								<span>Following</span>
							</div>
							<div className="col3"><h1>452</h1>
							<span>Likes</span></div>
							<div className="col3 last"><h1>1207</h1>
							<span>Bookmarks</span></div>
						</div>
					</div>
				</div>
					<ul className="row2tab">
						<li><i className="fa fa-list-alt" onclick={changeData("posts")}></i> My posts </li>
						<li><i className="fa fa-heart" onclick={changeData("friends")}></i> Friends </li>
						<li><i className="fa fa-check" onclick={changeData("about")}></i> About Me </li>
						<li><i className="fa fa-thumbs-o-up " onclick={changeData("edit")}></i> Edit Profile </li>
					</ul>
                    <div id="posts-div"></div>
                    <div id="friends-div"></div>
                    <div id="about-div"></div>
                    <div id="edit-div"></div>
				</div>
			
		</div>
</div>  <Sidebar 
    type="u" 
     />
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

export default Profile;