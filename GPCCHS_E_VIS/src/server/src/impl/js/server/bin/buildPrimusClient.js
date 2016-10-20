require('dotenv-safe').load();
const debug = require('../lib/io/debug')('buildPrimusClient');
const exit = require('exit');
const http = require('http');
const app = require('../lib/express');
const { join } = require('path');
const { getNewInstance } = require('../lib/websocket/primus');

const server = http.createServer(app);
const instance = getNewInstance(server);
const output = join(__dirname, '../../../../../../common/src/impl/js/common/lib/websocket/primus.js');

instance.save(output, (err) => {
  if (err) {
    return debug.error(err);
  }

  debug.info(`primus client generated in ${output}`);
  return exit(0);
});
