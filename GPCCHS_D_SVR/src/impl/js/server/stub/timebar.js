#!/usr/bin/env node

require('dotenv-safe').load();

const debug = require('../lib/io/debug')('stub:timebar');
const zmq = require('../lib/io/zmq');
const parseArgs = require('minimist');
const check = require('../lib/schemaManager/schemaManager');
const fs = require('fs');
const path = require('path');

const usage = () =>
  console.log('USAGE: node timebar.js [ -h | --help ] [ -forward time (in ms) | -f time (in ms) ]');

const FORWARD = 1000;

// options definitions
const options = {
  boolean: 'h',
  default: {
    h: false,
    f: FORWARD,
  },
  alias: {
    h: 'help',
    f: 'forward',
  },
};

// Get arguments
const argv = parseArgs(process.argv.slice(2), options);
if (argv.h) {
  usage();
  process.exit(1);
}
const pathTb = path.join(__dirname, 'tmp/tb.json') ;
// Get latest version of timebar in tmp/tb.json
const tb = JSON.parse(fs.readFileSync(pathTb, 'utf8'));

if (!tb) {
  debug.error("Error reading tb file");
  process.exit(1);
}

// check validity of data
const err = check.validateTbJson((tb));

// Case of errors
if (err) {
  debug.error('Error on tbFile :\n', err);
  process.exit(1);
}

// Update current TB
tb.data.visuWindow.current += argv.f;
tb.data.action = 'currentTimeUpd';

// ZMQ initialization
zmq.init({
  timebarPush: {
    type: 'push',
    url: process.env.ZMQ_VIMA_TIMEBAR,
  },
});

setTimeout(() => {
  zmq.send('timebarPush', tb);
  debug.info('Tb update sent');

  // close socket
  zmq.closeSockets();

  // Save file for next time
  fs.writeFileSync(pathTb, JSON.stringify(tb), 'utf8');
}, 100);
