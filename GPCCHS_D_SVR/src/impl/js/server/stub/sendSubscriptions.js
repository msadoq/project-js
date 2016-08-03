const debug = require('../lib/io/debug')('stub:sendSubscriptions');
const async = require('async');
const exec = require('child_process').exec;

const debugOptions = `DEBUG="${process.env.DEBUG}" LEVEL="${process.env.LEVEL}"`;

const TIMEOUT = 5000;

let cpt = 1;

const execSub = (callback, command) =>
  exec(`${debugOptions} ${command}`, (error, stdout, stderr) => {
    if (error) {
      debug.info(error);
      process.exit(1);
    }
    console.log(stderr);
    debug.info(`POST Sub ${cpt++} Done.`);
    callback();
  }
);

const sub1 = (callback) => execSub(callback, 'node ./stub/postSub.js -p 1 --no-filter');
const sub2 = (callback) => execSub(callback, 'node ./stub/postSub.js -p 2 --no-filter');
const sub3 = (callback) => execSub(callback, 'node ./stub/postSub.js -p 3 --no-filter');
const sub4 = (callback) => execSub(callback, 'node ./stub/postSub.js -p 4 --no-filter');
const sub5 = (callback) => execSub(callback, 'node ./stub/postSub.js -p 1 --filter');
const sub6 = (callback) => execSub(callback, 'node ./stub/postSub.js -p 2 --filter');

const wait = (callback) => {
  setTimeout(callback, TIMEOUT);
};

async.waterfall([
  wait,
  sub1,
  sub2,
  sub3,
  sub4,
  sub5,
  sub6,
], (err) => {
  if (err) throw err;
  debug.info('Subscriptions sended');
});
