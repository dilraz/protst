const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const video = express();
const path = require('path');
const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const MAX_ALLOWED_SESSION_DURATION = 14400;
const twilioAccountSid = 'AC32142741ea246a2d4b9c7bbb8192b8d0';
const twilioApiKeySID = 'SK302a6fa96d2d7b334d6b1cd254c7e2ad';
const twilioApiKeySecret = 'Lss5SOQE3Jn8eYDx1ueL69g5wwqneaZD';
//video.use(cors({origin:true}));
video.use(express.static(path.join(__dirname, 'build')));

video.post("/token", (req, res) => {
    console.log("i got a request");
    const identity = req.query.identity;
    const room = req.query.room;
    const token = new AccessToken(twilioAccountSid, twilioApiKeySID, twilioApiKeySecret, {
        ttl: MAX_ALLOWED_SESSION_DURATION,
    });
    token.identity = identity;
    const videoGrant = new VideoGrant({ room: room });
    token.addGrant(videoGrant);
    console.log("token", req.query);
    res.send(JSON.stringify({ token: token.toJwt() }));
    console.log("issued token for in room", { identity });
});

//video.get('*', (_, res) => res.sendFile(path.join(__dirname, 'build/index.html')));

//app.listen(8081, () => console.log('token server running on 8081'));

exports.video = functions.https.onRequest(video);
