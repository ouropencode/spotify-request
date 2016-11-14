FROM node:6
MAINTAINER Joe Eaves <jinux@alluha.net>

WORKDIR /opt/sr
RUN npm install nodemon -g && npm install spotify-request

ENV SPOTIFY_API_KEY XXXX
ENV SPOTIFY_API_SECRET XXXX
ENV LISTEN_PORT 3000

EXPOSE $LISTEN_PORT

COPY examples/server.js /opt/sr
CMD ["nodemon", "server.js"]
