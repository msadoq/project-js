#!/usr/bin/env node

require('dotenv-safe').load();

const debug = require('../lib/io/debug')('stub:timebar');
const zmq = require('../lib/io/zmq');
const parseArgs = require('minimist');
const check = require('../lib/schemaManager/schemaManager');
const fs = require('fs');
const path = require('path');
const exit = require('exit');

const usage = () =>
  console.log('USAGE: node timebar.js [ -h | --help ] [ -forward time (in ms) | -f time (in ms) ]\
          [ -addtimeline | -a ] [ -removetimeline | -r ]');

const FORWARD = 1000;

// options definitions
const options = {
  boolean: 'h',
  boolean: 'a',
  boolean: 'r',
  number: 'f',
  default: {
    h: false,
    f: FORWARD,
    a: false,
    r: false,
  },
  alias: {
    h: 'help',
    f: 'forward',
    a: 'addtimeline',
    r: 'removetimeline',
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
const errJson = check.validateTbJson((tb));

// Case of errors
if (errJson) {
  debug.error('Error on tbFile :\n', errJson);
  process.exit(1);
}

if (argv.f) {
  // Update current TB
  tb.data.visuWindow.current += argv.f;
  tb.data.action = 'currentTimeUpd';
  tb.data.rulerStart += 5000;
}
if (argv.a) {
  // Add a timeline
  const tlName = 'Session ' + (tb.data.timeLines.length + 3);
  const tl = {
    id: tlName,
    offset: 0,
    kind: 'Session',
    sessionId: 10 + (tb.data.timeLines.length + 3)
  };
  tb.data.timeLines.push(tl);
  tb.data.action = 'tlAdded';
}

if (argv.r) {
  tb.data.action = 'tlRemoved';
  // remove the last timeline
  if (tb.data.timeLines.length > 0) {
    tb.data.timeLines.splice(tb.data.timeLines.length - 1, 1);
  }
}
// ZMQ initialization
zmq.init({
  timebarPush: {
    type: 'push',
    url: process.env.ZMQ_VIMA_TIMEBAR,
  },
}, err => {
  if (err) {
    throw err;
  }

  zmq.send('timebarPush', JSON.stringify(tb), () => {
    debug.info('Tb update sent');
    // close socket
    zmq.closeSockets();

    // Save file for next time
    fs.writeFileSync(pathTb, JSON.stringify(tb), 'utf8');
    exit(0);
  });
});
