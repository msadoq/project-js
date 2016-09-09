#!/usr/bin/env node

require('dotenv-safe').load();

const debug = require('../lib/io/debug')('stub:timebar');
const zmq = require('../lib/io/zmq');
const parseArgs = require('minimist');

const exit = require('exit');

const usage = () =>
  console.log('USAGE: node timebar.js [ -h | --help ] [ -forward time (in ms) | -f time (in ms) ]\
          [ -addtimeline | -a ] [ -removetimeline | -r ][ -offset val (in ms)| -o val (in ms)]');

const FORWARD = 1000;
const OFFSET = 1000;

// options definitions
const options = {
  boolean: 'h',
  boolean: 'a',
  boolean: 'r',
  number: 'o',
  number: 'f',
  default: {
    h: false,
    a: false,
    r: false,
  },
  alias: {
    h: 'help',
    f: 'forward',
    a: 'addtimeline',
    r: 'removetimeline',
    o: 'offset'
  },
};

// Get arguments
const argv = parseArgs(process.argv.slice(2), options);
if (argv.h) {
  usage();
  process.exit(1);
}
let cmdList = {};
if (argv.f) {
  // Update current TB
  cmdList.currentTimeUpd = argv.f;
}
if (argv.a) {
  // Add a timeline
  const nb = Math.floor(Math.random() * 100);
  const tlName = 'Session ' + nb.toString();
  cmdList.tlAdded = {
    id: nb,
    name: tlName,
    offset: 0,
    kind: 'Session',
    sessionId: nb,
  };
}

if (argv.r) {
  // If 0, delete first element, if 1 delete last element
  cmdList.tlRemoved = Math.round(Math.random());
}
if (argv.o) {
  cmdList.tlOffsetUpd = argv.o;
}

// ZMQ initialization
zmq.open({
  tbCliPush: {
    type: 'push',
    url: process.env.ZMQ_VIMA_STUB_TIMEBAR,
  },
}, err => {
  if (err) {
    throw err;
  }

  zmq.push('tbCliPush', JSON.stringify(cmdList), () => {
    // close socket
    zmq.closeSockets();
    exit(0);
  });
});
