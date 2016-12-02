// eslint-disable-next-line
const winstond = require('winstond');
require('./wstransport');

const server = winstond.http.createServer({
  services: ['collect', 'query', 'stream'],
  port: process.env.PORT || 9003,
});

server.add(winstond.transports.WSTransport, {
});

server.listen();
