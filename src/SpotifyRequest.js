#!/usr/bin/env node

var SpotifyWebApi = require('spotify-web-api-node');

class SpotifyRequest {
	constructor(clientId, clientSecret) {
		this.spotify = new SpotifyWebApi({
			clientId : clientId,
			clientSecret : clientSecret
		});

		this.spotify.clientCredentialsGrant().then(data => {
			// console.log('The access token expires in ' + data.body['expires_in']);
			// console.log('The access token is ' + data.body['access_token']);
			// Save the access token so that it's used in future calls
		    this.spotify.setAccessToken(data.body['access_token']);
		}, (err) => {
			console.log('Something went wrong when retrieving an access token', err);
		});
	}

	deuri(uri) {
		return uri.replace(/^spotify:([^:]+:){1,3}/, '');
	}

	getTrack(uri) {
		uri = this.deuri(uri);
		return this.spotify.getTrack(uri).then(data => {
			data = data.body;
			return {'artist': data.artists[0].name, 'track': data.name}
		}, err => {
			return null;
		});
	}
};

module.exports = SpotifyRequest;
//
// SpotifyRequest.prototype.request = function(dweet) {
// 	var instance = this;
// 	var callback = instance.sendReply;
// 	if (dweet.content['type'] &&
// 		(dweet.content['uri'] || dweet.content['search']))
// 	{
// 		console.log("Request type: " + dweet.content.type + ".");
// 		if (dweet.content.type == "name-track") {
// 			this.loadTrack(dweet.content.uri, function(track) {callback(dweet.content.type, track);});
// 		} else if (dweet.content.type == "search-track") {
// 			this.searchTrack(dweet.content.search, function(track) {callback(dweet.content.type, track);});
// 		} else if (dweet.content.type == "list-playlist") {
// 			this.listPlaylist(dweet.content.uri, function(playlist) {callback(dweet.content.type, playlist);});
// 		}
// 	}
// };
//
// SpotifyRequest.prototype.sendReply = function(reqType, answer) {
// 	if (answer.isLoaded === true) {
// 		console.log("Sending Answer.");
// 		instance.dweetio.sendData('jme-spotify-answer', {
// 			"type": reqType,
// 			"answer": answer
// 		});
// 	}
// }''
//
// SpotifyRequest.prototype.loadTrack = function(trackLink, callback) {
// 	var track = this.spotify.createFromLink(trackLink);
// 	// There's a reason we don't use true I think
// 	if (track.isLoaded !== false) {
// 		console.log("Track was loaded, serving from cache.");
// 		callback(track);
// 	} else {
// 		console.log("Waiting for track to load.");
// 		this.spotify.waitForLoaded([track], callback);
// 	}
// };
//
// SpotifyRequest.prototype.searchTrack = function(searchText, callback) {
// 	var instance = this;
// 	var search = new this.spotify.Search(searchText);
// 	search.execute(function(err, searchResult) {
// 		console.log("Search Executed.");
// 		if (!err) {
// 			if (search.totalTracks > 0) {
// 				callback(search.tracks[0]);
// 			}
// 		}
// 	});
// };
//
// SpotifyRequest.prototype.listPlaylist = function(playlistLink, callback) {
// 	var instance = this;
// 	var playlist = this.spotify.createFromLink(playlistLink);
// 	// There's a reason we don't use true I think
// 	if (playlist.isLoaded !== false) {
// 		console.log("Playlist was loaded, serving from cache.");
// 		callback(playlist);
// 	} else {
// 		console.log("Waiting for playlist to load.");
// 		this.spotify.waitForLoaded([playlist], callback);
// 	}
// }
