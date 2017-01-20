const _ = require('lodash/fp');

// Returns a timer function to measure time in ms between to calls
const getTimer = () => {
  let prev;
  let curr;
  return () => {
    curr = +new Date();
    const diff = curr - (prev || curr);
    prev = curr;
    return diff;
  };
};

const formatArgs = (...args) =>
  JSON.stringify(args);

const formatProductLog = (uid, ...args) =>
  `${uid}${args.length ? [' ', formatArgs(...args)].join('') : ''}\n`;

const pruneCb =
  _.cond([
    [_.compose(_.isFunction, _.last), _.slice(0, -1)],
    [_.stubTrue, _.identity],
  ]);

const triggerCb =
  _.cond([
    [_.compose(_.isFunction, _.last), cb => cb()],
  ]);

module.exports = {
  getTimer,
  formatProductLog,
  pruneCb,
  triggerCb,
};
