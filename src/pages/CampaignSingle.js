import firebase from 'firebase';
import React from 'react';
import '../App.css';
import fire from '../fire';
import Navbar from '../Navbar';
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  EmailIcon,
  FacebookIcon,
  TwitterIcon,
} from 'react-share';

class CampaignSingle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campaign: [],
      comments: [],
      owner: [],
      joined: null,
      user: [],
      members: [],
      supporters: 0,
      isOwner: false,
    };
  }

  loadMembers(id, url, name) {
    document.getElementById('mem').innerHTML +=
      "<span><a  style='text-decoration: none'  href='/viewProfile/" +
      id +
      "'><img src=" +
      url +
      " width='70' height='70' style='margin:10px;border-radius:50px'/> </a></span>";
  }

  loadThreads(title, id) {
    document.getElementById('threads').innerHTML +=
      "# <a style='text-decoration: none' href='/thread/" +
      this.props.match.params.id +
      '/' +
      id +
      "'<p class='lead'>" +
      title +
      '</p>';
  }

  addComment() {
    let title = document.getElementById('title').value;
    let comment = document.getElementById('comments').value;
    const userRef = firebase.firestore().collection('users');
    userRef.doc(this.state.user.uid).onSnapshot(snapshot => {
      const data = snapshot.data().photoUrl;
      if (title == '' || comment == '') {
        document.getElementById('error').innerText = 'Please fill All The Above Fields !';
      } else {
        fire
          .firestore()
          .collection('campaigns')
          .doc(this.props.match.params.id)
          .collection('posts')
          .doc()
          .set({
            userId: this.state.user.uid,
            description: comment,
            media_url: '',
            supportScore: 0,
            title: title,
            created: firebase.firestore.Timestamp.now(),
            pic: data,
          });
        document.getElementById('error').innerText = 'Shared Successfully!';
        document.getElementById('title').value = '';
        document.getElementById('comments').value = '';
      }
    });
  }

  join() {
    fire
      .firestore()
      .collection('campaigns')
      .doc(this.props.match.params.id)
      .collection('members')
      .doc()
      .set({
        user_id: this.state.user.uid,
      })
      .then(() => {
        this.setState({ joined: true });
        window.location.reload();
      });
  }

  checkJoinCampaign() {
    const snapshottt = fire
      .firestore()
      .collection('campaigns')
      .doc(this.props.match.params.id)
      .collection('members')
      .onSnapshot(snapshottt => {
        const dataaa = snapshottt.docs.map(doc => {
          //  console.log(doc.data().user_id,this.state.user.uid)
          if (doc.data().user_id == this.state.user.uid) {
            this.setState({ joined: true });
            //  console.log(this.state.joined)
          }
        });
      });
  }
  leave() {
    var delete_query = fire
      .firestore()
      .collection('campaigns')
      .doc(this.props.match.params.id)
      .collection('members')
      .where('user_id', '==', this.state.user.uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref
            .delete()
            .then(() => {})
            .then(() => {
              this.state.joined = false;
              window.location.reload();
            })
            .catch(function(error) {});
        });
      })
      .catch(function(error) {});
  }

  deleteCampaign() {
    var delete_query = fire
      .firestore()
      .collection('campaigns')
      .doc(this.props.match.params.id)
      .delete()
      .then(() => {
        window.location.replace('/campaigns');
      });
  }

  deleteComment(id) {
    var delete_query = fire
      .firestore()
      .collection('campaigns')
      .doc(this.props.match.params.id)
      .collection('posts')
      .doc(id)
      .delete();
  }
  useEffect() {
    return this.checkJoinCampaign(), [];
  }

  componentDidMount() {
    // console.log("user", firebase.auth().currentUser);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: user });
      } else {
        // console.log('There is no logged in user');
      }
    });
    this.checkJoinCampaign();

    const campaignsRef = firebase.firestore().collection('campaigns');
    campaignsRef.doc(this.props.match.params.id).onSnapshot(snapshot => {
      const data = snapshot.data();

      this.setState({ campaign: snapshot.data() });

      //  console.log("All data in 'books' collection", this.state.campaign);
      if (this.state.campaign && this.state.campaign.owner_id) {
        const ownerRef = firebase.firestore().collection('users');
        ownerRef.doc(this.state.campaign.owner_id).onSnapshot(snapshot => {
          const data = snapshot.data();
          this.setState({ owner: data });
          if (snapshot.id == this.state.user.uid) {
            this.setState({ isOwner: true });
            //console.log("yes")
          }

          // console.log("Owner", );
        });
      }
    });
    const commentsRef = firebase
      .firestore()
      .collection('campaigns')
      .doc(this.props.match.params.id)
      .collection('posts')
      .orderBy('created', 'desc');
    commentsRef.onSnapshot(snapshot => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      this.setState({ comments: data });
      //console.log("All data in 'books' collection", data);
    });
    const membersRef = firebase
      .firestore()
      .collection('campaigns')
      .doc(this.props.match.params.id)
      .collection('members');
    const unsub = membersRef.onSnapshot(snapshot => {
      const data = snapshot.docs.map(doc => {
        if (doc) {
          this.state.supporters += 1;
          const vv = doc.data().user_id;
          //console.log(vv)
          if (vv) {
            const userR = firebase
              .firestore()
              .collection('users')
              .doc(vv)
              .onSnapshot(snapshot => {
                this.setState({ members: snapshot.data() });
                // console.log(snapshot.data())
                this.loadMembers(snapshot.id, snapshot.data().photoUrl, snapshot.data().name);
              });
          }
        }
      });
      unsub();
    });

    const threadsRef = firebase
      .firestore()
      .collection('campaigns')
      .doc(this.props.match.params.id)
      .collection('threads');
    const unsub2 = threadsRef.onSnapshot(snapshot => {
      const data = snapshot.docs.map(doc => {
        const vv = doc.data().title;

        this.loadThreads(vv, doc.id);
      });
      unsub2();
    });
  }

  render() {
    if (this.state.campaign) {
      return (
        <div className="App">
          <Navbar />
          <br />
          <br />

          <section className="page-section">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <h1 className="mt-4" style={{ fontFamily: 'Work Sans' }}>
                    {this.state.campaign.name}
                  </h1>

                  <tr>
                    <td style={{ width: '20%' }}>
                      <p className="lead">
                        <strong> By:</strong> &nbsp;
                        <a href="#" style={{ textDecoration: 'none' }}>
                          {this.state.owner.name}
                        </a>
                      </p>
                    </td>
                    <td style={{ width: '33%' }}>
                      <p className="lead">
                        <strong>Location:</strong> &nbsp;
                        <a href="#" style={{ textDecoration: 'none' }}>
                          {this.state.campaign.location}
                        </a>
                      </p>
                    </td>
                    <td style={{ width: '33%' }}>
                      {' '}
                      <p className="lead">
                        <strong> Supporters: </strong> {this.state.supporters}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: '20%' }}>
                      {this.state.isOwner ? null : this.state.joined ? (
                        <button className="btn btn-danger" onClick={() => this.leave()}>
                          LEAVE
                        </button>
                      ) : (
                        <button id="bt" onClick={() => this.join()} className="btn btn-info">
                          JOIN
                        </button>
                      )}
                    </td>
                    <td style={{ width: '40%' }}>
                      {this.state.isOwner ? (
                        <a href={'/editCampaign/' + this.props.match.params.id} style={{ textDecoration: 'none' }}>
                          <button className="btn btn-info">Edit Campaign</button>
                        </a>
                      ) : null}
                    </td>
                    <td style={{ width: '30%' }}>
                      {this.state.isOwner ? (
                        <button className="btn btn-danger" onClick={() => this.deleteCampaign()}>
                          Delete Campaign
                        </button>
                      ) : null}
                    </td>{' '}
                  </tr>

                  <hr />
                  <img className="campaign-img" src={this.state.campaign.photoUrl} alt="" />
                  <hr />
                  <p>{this.state.campaign.description}</p>
                  <hr />
                  <div className="card my-4">
                    <h5 className="card-header  bg-dark text-white">Share your Thoughts:</h5>
                    <div className="card-body">
                      <div className="form-group">
                        <input type="text" id="title" className="form-control" placeholder="What are your opinions?" />
                      </div>
                      <div className="form-group">
                        <textarea id="comments" className="form-control" rows="3" placeholder="Description"></textarea>
                      </div>
                      <button type="submit" onClick={() => this.addComment()} className="btn btn-primary">
                        Submit
                      </button>
                      <br />
                      <p id="error"></p>
                    </div>
                  </div>
                  {/* {  this.state.members.map(data=>
      {
        console.log(data)
      })} */}
                  {this.state.comments.map(data => {
                    if (data.userId == this.state.user.uid) {
                      return (
                        <div className="media mb-4">
                          <img className="d-flex mr-3 rounded-circle" src={data.pic} width="50" height="50" alt="" />
                          <div className="media-body">
                            <h5 className="mt-0">{data.title}</h5>
                            {data.description}
                          </div>
                          <button className="btn btn-danger" onClick={() => this.deleteComment(data.id)}>
                            Delete
                          </button>
                        </div>
                      );
                    } else {
                      return (
                        <div className="media mb-4">
                          <img className="d-flex mr-3 rounded-circle" src={data.pic} width="50" height="50" alt="" />
                          <div className="media-body">
                            <h5 className="mt-0">{data.title}</h5>
                            {data.description}
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>

                <div className="col-md-4">
                  <div class="card-dark">
                    <h3 class="card-header bg-dark text-light" style={{ borderBottomColor: '#FED136' }}>
                      Share This Campaign
                    </h3>
                    <div class="card-body bg-dark text-white">
                      <td style={{ width: '30%' }}>
                        <EmailShareButton
                          url={'https://protst.org' + this.props.location.pathname}
                          subject={'Sharing Campaign: "' + this.state.campaign.name + '" '}
                          body={'Hey! Take a look at this campaign on Protst.org using the link below \n '}
                        >
                          <EmailIcon></EmailIcon>
                        </EmailShareButton>
                      </td>{' '}
                      <td style={{ width: '30%' }}>
                        <FacebookShareButton
                          url={'https://protst.org' + this.props.location.pathname}
                          quote={this.state.campaign.name}
                        >
                          <FacebookIcon />
                        </FacebookShareButton>
                      </td>{' '}
                      <td style={{ width: '30%' }}>
                        {' '}
                        <TwitterShareButton
                          title={'Sharing Campaign: "' + this.state.campaign.name + '" '}
                          url={'https://protst.org' + this.props.location.pathname}
                        >
                          <TwitterIcon></TwitterIcon>
                        </TwitterShareButton>
                      </td>
                    </div>
                  </div>
                  <hr />
                  <div className="card-dark">
                    <h3 className="card-header bg-dark text-light" style={{ borderBottomColor: '#FED136' }}>
                      Join The Video Group
                    </h3>

                    <div className="card-body bg-dark">
                      <div className="input-group">
                        <p className="text-white">Click below to join the video conference</p>
                        <a className="btn btn-warning" href={'/vid/' + this.state.campaign.name + '>?'}>
                          Join Now!
                        </a>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div class="card-dark">
                    <h3 class="card-header bg-dark text-light" style={{ borderBottomColor: '#FED136' }}>
                      Campaign Members
                    </h3>
                    <div class="card-body bg-dark text-white" id="mem"></div>
                  </div>
                  <hr />
                  <div class="card-dark">
                    <h3 class="card-header bg-dark text-light" style={{ borderBottomColor: '#FED136' }}>
                      Campaign Threads
                      <a style={{ textDecoration: 'none' }} href={'/createThread/' + this.props.match.params.id}>
                        &emsp;<span className="lead">Add New Thread</span>
                      </a>
                    </h3>
                    <div class="card-body bg-dark text-white">
                      <div id="threads"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <footer className="footer">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-4">
                  <span className="copyright">Copyright &copy; PROTST.ORG 2020</span>
                </div>

                <div className="col-md-8">
                  <ul className="list-inline quicklinks">
                    <li className="list-inline-item">Standardizing the way of protest around the world.&emsp;</li>
                    <li className="list-inline-item">
                      <a href="/about" style={{ textDecoration: 'none' }}>
                        Read More About Us
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default CampaignSingle;
