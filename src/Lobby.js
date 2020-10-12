import React from 'react';

const Lobby = ({
  username,
  handleUsernameChange,
  roomName,
  handleRoomNameChange,
  handleSubmit
}) => {
  
  return (
    <form onSubmit={handleSubmit}>
    <div className="col-lg-12 text-center">
    <h2 className="section-heading text-uppercase">Create/Join A Room</h2>
    <h3 className="section-subheading text-muted">Please enter the details below carefully.</h3>
  </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="field"
          value={username}
          onChange={handleUsernameChange}
          required
        />
      </div>

      <div>
        <label htmlFor="room">Room name:</label>
        <input
          type="text"
          id="room"
          value={roomName}
          onChange={handleRoomNameChange}
          disabled
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Lobby;
