Spotify-Request
----

Spotify-Request is an API server for the Spotify service that serves requests via Socket.io. It allows remote query against the spotify api without local keys.

Currently the following requests are supported:

* Get Track via Spotify URI

### Using the library ###
There are two ways to use this library:

* Hosting a socket.io API server
	```node
let spotreq    = require('spotify-request');
let api_server = new spotreq.APIServer(3000, 'Spotify WEB API KEY', 'Corresponding secret');
```

* Access to the underlying Spotify API proxy (SpotifyRequest)
	```node
let spotreq  = require('spotify-request');
let proxy    = new spotreq.SpotifyRequest('Spotify WEB API KEY', 'Corresponding secret');
```

There are slightly larger examples in `./examples`, but you should be able to follow the source for more details :)
