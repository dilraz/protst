import React, { useState, useCallback } from 'react';
import Lobby from './Lobby';
import Room from './Room';

const VideoChat = (props) => {

  const campaign = props
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const [token, setToken] = useState(null);


  const handleUsernameChange = useCallback(event => {
    setUsername(event.target.value);
  }, []);

  const handleRoomNameChange = useCallback(event => {
    setRoomName(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    async event => {
      //console.log("data: ", (campaign.name.toString() ));
      event.preventDefault();
      var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  var targetUrl = 'https://us-central1-protst.cloudfunctions.net/video/token';
  let url = new URL(proxyUrl+targetUrl);
url.search = new URLSearchParams({
    identity:username,
    room:campaign.name
})    

  const data = await fetch((url), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json());
      setToken(data.token);
    },
    [roomName, username]
  );

  const handleLogout = useCallback(event => {
    setToken(null);
  }, []);

  let render;
  if (token) {
    render = (
      <Room roomName={campaign.name} token={token} handleLogout={handleLogout} />
    );
  } else {
    render = (
      <Lobby
      props={props}
        username={username}
        roomName={campaign.name}
        handleUsernameChange={handleUsernameChange}
        handleRoomNameChange={handleRoomNameChange}
        handleSubmit={handleSubmit}
      />
      
    );
  }
  return render;
};

export default VideoChat;
