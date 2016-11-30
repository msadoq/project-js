require('dotenv-safe').load();
const { writeFileSync } = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const logger = require('common/log')('buildPrimusClient');
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
logger.info(`primus client generated in ${output}`);
