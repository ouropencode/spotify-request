#!/usr/bin/env node

let socketio = require('socket.io-client');
let socketOut = socketio.connect('http://localhost:3000');

socketOut.emit('track.name', 'spotify:track:5LFVou0vqdFkrLQWPqZiqY');
socketOut.once('spotify:track:5LFVou0vqdFkrLQWPqZiqY', data => { console.log(data); });
