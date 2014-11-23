Spotify-Request
----

Spotify-Request is an API server for the Spotify service that serves requests via Dweet.io. It was created this way to address an issue where our calling site doesn't have new enough libraries to support the spotify api locally. It allows your calling site and this server to run on seperate hosts with no hassle.

Currently the following requests are supported:

* Get Track via Spotify URI
* Get Spotify URI from Track Name (and Artist)