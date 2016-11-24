require('dotenv-safe').load();
const { writeFileSync } = require('fs');
const debug = require('../lib/io/debug')('buildPrimusClient');
const http = require('http');
const app = require('../lib/express');
const { join } = require('path');
const { getNewInstance } = require('../lib/websocket/primus');

const server = http.createServer(app);
const instance = getNewInstance(server);
const output = join(__dirname, '../../../../../../common/src/main/js/common/websocket/primus.js');

// add ws loading to fix a packaging issue
const library = `const WebSocket = require('ws');\n${instance.library()}`;

// save file
writeFileSync(output, library);
debug.info(`primus client generated in ${output}`);
