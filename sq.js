#!/usr/bin/env node
var Spotify = require('node-spotify');
var DweetIO = require('./DweetIO');

var SpotifyRequest = function(username, password, readyCallback) {
	var instance = this;
	this.dweetio = new DweetIO();
	this.dweetio.listenFor('jme-spotify-query', function(dweet) {
		console.log("Query received.");
		instance.query(dweet);
	});

	this.spotify = new Spotify({ appkeyFile: 'api_spotify.key' });
	this.spotify.on({
		"ready": readyCallback
	});
	this.spotify.login('joeasaurus', 'password', false, false);

};

SpotifyRequest.prototype.query = function(dweet) {
	var instance = this;
	if (dweet.content['type'] && dweet.content['uri']) {
		if (dweet.content.type == "name-track") {
			this.loadTrack(dweet.content.uri, function(track) {
				if(track.isLoaded == true) instance.dweetio.sendData('jme-spotify-answer', track);
			});
		}
	}
};

SpotifyRequest.prototype.loadTrack = function(trackLink, callback) {
	var track = this.spotify.createFromLink(trackLink);
	if(track.isLoaded !== false) {
		console.log("Track was loaded, serving from cache.");
		callback(track);
	} else {
		console.log("Waiting for track to load.");
		this.spotify.waitForLoaded([track], callback);
	}
};