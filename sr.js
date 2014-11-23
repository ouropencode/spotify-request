#!/usr/bin/env node
var Spotify = require('node-spotify');
var DweetIO = require('./DweetIO');

var SpotifyRequest = function(username, password, readyCallback) {
	var instance = this;
	this.dweetio = new DweetIO();
	this.dweetio.listenFor('jme-spotify-request', function(dweet) {
		console.log("Request received.");
		instance.request(dweet);
	});

	this.spotify = new Spotify({ appkeyFile: 'api_spotify.key' });
	this.spotify.on({
		"ready": readyCallback
	});
	this.spotify.login(username, password, false, false);

};

SpotifyRequest.prototype.request = function(dweet) {
	var instance = this;
	var callback = function(track) {
		if (track.isLoaded === true) {
			console.log("Sending Answer.");
			instance.dweetio.sendData('jme-spotify-answer', track);
		}
	};
	if (dweet.content['type'] &&
		(dweet.content['uri'] || dweet.content['search']))
	{
		console.log("Request type: " + dweet.content.type + ".");
		if (dweet.content.type == "name-track") {
			this.loadTrack(dweet.content.uri, callback);
		} else if (dweet.content.type == "search-track") {
			this.searchTrack(dweet.content.search, callback);
		}
	}
};

SpotifyRequest.prototype.loadTrack = function(trackLink, callback) {
	var track = this.spotify.createFromLink(trackLink);
	if (track.isLoaded !== false) {
		console.log("Track was loaded, serving from cache.");
		callback(track);
	} else {
		console.log("Waiting for track to load.");
		this.spotify.waitForLoaded([track], callback);
	}
};

SpotifyRequest.prototype.searchTrack = function(searchText, callback) {
	var instance = this;
	var search = new this.spotify.Search(searchText);
	search.execute(function(err, searchResult) {
		console.log("Search Executed.");
		if (!err) {
			if (search.totalTracks > 0) {
				callback(search.tracks[0]);
			}
		}
	});
};

var sq = new SpotifyRequest('joeasaurus', 'password');
