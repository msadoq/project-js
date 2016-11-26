// eslint-disable-next-line no-underscore-dangle
const _round = require('lodash/round');
const debug = require('debug');

const bytesToString = require('../utils/bytesConverter');

const debugHelper = require('../debug');


const display = debugHelper(debug)('monitoring').warn;

let ticks = 0;
let currentTime;
let avgTime;
let memUsage;
let monitorTimeout;
const TIMESTEP = 5000;

const leftPad = number => ((number < 10) ? `0${number}` : number);
const getTime = () => {
  const now = new Date();
  let time = `${now.getFullYear()}-${leftPad(now.getMonth() + 1)}-${leftPad(now.getDate())}`;
  time += ` ${leftPad(now.getHours())}:${leftPad(now.getMinutes())}:${leftPad(now.getSeconds())}`;
  return time;
};

const countTicks = () => setImmediate(() => {
  ticks += 1;
  countTicks();
});

const monitor = () => {
  const time = getTime();
  const diffTime = process.hrtime(currentTime);
  avgTime = _round((diffTime[0] / (ticks * 1e-3)) + (diffTime[1] / (ticks * 1e6)), 6);
  ticks = 0;
  memUsage = process.memoryUsage();
  display(`= monitoring ======== (${time})`);
  display('average time consumption by loop', avgTime, 'ms');
  display('memory consumption');
  display('  rss', bytesToString(memUsage.rss));
  display('  heapTotal', bytesToString(memUsage.heapTotal));
  display('  heapUsed', bytesToString(memUsage.heapUsed));
  display('---------------------');

  currentTime = process.hrtime();
  monitorTimeout = setTimeout(monitor, TIMESTEP);
};

const start = () => {
  if (process.env.MONITORING === 'on') {
    currentTime = process.hrtime();
    countTicks();
    monitorTimeout = setTimeout(monitor, TIMESTEP);
  }
};

const stop = () => {
  if (process.env.MONITORING === 'on') {
    clearTimeout(monitorTimeout);
    clearImmediate(countTicks);
    ticks = 0;
  }
};

module.exports = {
  start,
  stop,
  getMemoryUsage: () => memUsage,
  getAverageTime: () => avgTime,
};
