#!/usr/bin/env node

let APIServer  = require('spotify-request').APIServer;

let port   = process.env['LISTEN_PORT'] || 3000;
let key    = process.env.SPOTIFY_API_KEY;
let secret = process.env.SPOTIFY_API_SECRET;

let server = new APIServer(port, key, secret);
