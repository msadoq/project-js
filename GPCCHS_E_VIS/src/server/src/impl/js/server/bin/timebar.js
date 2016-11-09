#!/usr/bin/env node

require('dotenv-safe').load();

const debug = require('../lib/io/debug')('stub:timebar');
// eslint-disable-next-line import/no-extraneous-dependencies
const zmq = require('common/zmq');
const parseArgs = require('minimist'); // eslint-disable-line  no-extraneous-dependencies

const exit = require('exit');

const usage = () =>
  debug.debug('USAGE: node timebar.js [ -h | --help ] [ -forward time (in ms) | -f time (in ms) ]',
          '[ -addtimeline | -a ] [ -removetimeline | -r ][ -offset val (in ms)| -o val (in ms)]');

// options definitions
const options = {
  help: {
    type: 'boolean',
    alias: 'h',
    default: false,
  },
  forward: {
    type: 'number',
    alias: 'f',
    default: 0,
  },
  addTimeline: {
    type: 'boolean',
    alias: 'a',
    default: false,
  },
  removeTimeline: {
    type: 'boolean',
    alias: 'r',
    default: false,
  },
  offset: {
    type: 'number',
    alias: 'o',
    default: 0,
  },
};

// Get arguments
const argv = parseArgs(process.argv.slice(2), options);
if (argv.h) {
  usage();
  process.exit(1);
}
const cmdList = {};
if (argv.f) {
  // Update current TB
  cmdList.currentTimeUpd = argv.f;
}
if (argv.a) {
  // Add a timeline
  const nb = Math.floor(Math.random() * 100);
  const tlName = `Session ${nb}`;
  cmdList.tlAdded = {
    id: nb.toString(),
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
  vimaTbCliPush: {
    type: 'push',
    url: process.env.ZMQ_VIMA_STUB_TIMEBAR,
  },
}, (err) => {
  if (err) {
    throw err;
  }

  zmq.push('vimaTbCliPush', JSON.stringify(cmdList), () => {
    // close socket
    zmq.closeSockets();
    exit(0);
  });
});
