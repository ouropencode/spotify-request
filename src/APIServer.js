#!/usr/bin/env node

let express  = require('express');
let http     = require('http');
let socketio = require('socket.io');
let spotireq = require('./SpotifyRequest');

class APIServer {
	constructor(port, apikey, apisecret) {
		this.app       = express();
		this.server    = http.Server(this.app);
		this.io_server = socketio(this.server);
		this.spotify   = new spotireq(apikey, apisecret);

		this.io_server.on('connection', socket => {
			this.configureSocket(socket);
		});

		this.server.listen(port);
	}

	configureSocket(socket) {
		this.socket = socket;
		this.socket.on('track.name', data => this.trackName(data));
	}

	trackName(trackuri) {
		this.spotify.getTrack(trackuri).then(data => {
			this.socket.emit(trackuri, data);
		});
	}
}

module.exports = APIServer
