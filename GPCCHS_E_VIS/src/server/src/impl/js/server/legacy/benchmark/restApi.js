const debug = require('../lib/io/debug')('stub:utils:restApi');
const http = require('http');

const request = (options) => {
  const req = http.request(options, (res) => {
    res.on('data', (data) => {
      debug.info('REST result:');
      debug.info(new Buffer(data).toString());
    });
    res.on('end', () => {
      debug.info('REST result completed.');
    });
  });

  req.on('error', (e) => {
    console.log(`REST request error: ${e.message}`);
  });

  return req;
};

const postRequest = (hostname, port, route) => {
  const options = {
    hostname,
    port,
    path: route,
    method: 'POST',
    headers: {
      'Content-Type': 'application/vnd.api+json',
      Accept: 'application/vnd.api+json',
    },
  };
  return request(options);
};

const writeData = (req, data) => {
  req.write(data);
  req.end();
};

module.exports = { postRequest, writeData };
