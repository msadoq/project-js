const _ = require('lodash');
const fs = require('fs');

let isInited = false;

let cpt = 0;

let currentTime;

let avgSecTime;
let avgNanoTime;

let avgRssMemUsage;
let avgHeapMemUsage;
let avgUsedMemUsage;

let rssMemUsages = [];
let heapMemUsages = [];
let usedMemUsages = [];

let secDiffs = [];
let nanoDiffs = [];

const MONITORING_FILE_PATH = './monitoring.json';
const PEAKS_FILE_PATH = './monitoringPeaks.json';

const init = () => {
  const mfd = fs.openSync(MONITORING_FILE_PATH, 'w');
  fs.writeSync(mfd, `HSS monitoring - ${new Date()}\n`);
  fs.closeSync(mfd);
  const pfd = fs.openSync(PEAKS_FILE_PATH, 'w');
  fs.writeSync(pfd, `HSS monitoring peaks - ${new Date()}\n`);
  fs.closeSync(pfd);

  isInited = true;
  currentTime = process.hrtime();
};

const doAverage = (measures, currentAvg, precision = 0) => {
  const mean = _.round(_.mean(measures));
  return (typeof currentAvg === 'undefined') ? mean : _.round(_.mean([currentAvg, mean]), precision);
};

const launch = () => setImmediate(() => {
  const diff = process.hrtime(currentTime);
  const memUsage = process.memoryUsage();
  secDiffs.push(diff[0]);
  nanoDiffs.push(diff[1]);
  rssMemUsages.push(memUsage.rss);
  heapMemUsages.push(memUsage.heapTotal);
  usedMemUsages.push(memUsage.heapUsed);
  if (cpt % 10 === 0) {
    avgSecTime = doAverage(secDiffs, avgSecTime, 9);
    avgNanoTime = doAverage(nanoDiffs, avgNanoTime);
    avgRssMemUsage = doAverage(rssMemUsages, avgRssMemUsage);
    avgHeapMemUsage = doAverage(heapMemUsages, avgHeapMemUsage);
    avgUsedMemUsage = doAverage(usedMemUsages, avgUsedMemUsage);
    secDiffs = [];
    nanoDiffs = [];
    rssMemUsages = [];
    heapMemUsages = [];
    usedMemUsages = [];
  }
  if (cpt % 100000 === 0) {
    const details = {
      eventLoopTimeConsumption: {
        second: avgSecTime,
        nanoSecond: avgNanoTime,
      },
      memoryUsage: {
        rss: avgRssMemUsage,
        heapTotal: avgHeapMemUsage,
        heapUsed: avgUsedMemUsage,
      },
    };
    const mfd = fs.openSync(MONITORING_FILE_PATH, 'a');
    fs.writeSync(mfd, `${JSON.stringify(details)}\n`);
    fs.closeSync(mfd);
    cpt = 0;
  }
  if (diff[0] > 1 || diff[1] > 1e7 /* 10 ms */) {
    const details = {
      eventLoopTimeConsumption: {
        second: diff[0],
        nanoSecond: diff[1],
      },
    };
    const pfd = fs.openSync(PEAKS_FILE_PATH, 'a');
    fs.writeSync(pfd, `EVENT LOOP ${JSON.stringify(details)}\n`);
    fs.closeSync(pfd);
    // console.log('PEAAAAAAAAAK');
  }
  if (memUsage.heapUsed > 500000000 /* 500 MB */) {
    const details = {
      memoryUsage: {
        rss: memUsage.rss,
        heapTotal: memUsage.heapTotal,
        heapUsed: memUsage.heapUsed,
      },
    };
    const pfd = fs.openSync(PEAKS_FILE_PATH, 'a');
    fs.writeSync(pfd, `MEMORY ${JSON.stringify(details)}\n`);
    fs.closeSync(pfd);
  }
  cpt += 1;
  currentTime = process.hrtime();
  launch();
});

module.exports = {
  init,
  launch,
  isInited: () => isInited,
  getAvgTime: () => [avgSecTime, avgNanoTime],
  getAvgMemoryUsage: () => ({
    rss: avgRssMemUsage,
    heapTotal: avgHeapMemUsage,
    heapUsed: avgUsedMemUsage,
  }),
};
