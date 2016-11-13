#!/usr/bin/env node

let spotreq  = require('../');
let proxy    = new spotreq.SpotifyRequest('Spotify WEB API KEY', 'Corresponding secret');

proxy.getTrack('7viD5dkEm7eaeGuvi4ZWBv').then(data => {
	console.log(data);
});
