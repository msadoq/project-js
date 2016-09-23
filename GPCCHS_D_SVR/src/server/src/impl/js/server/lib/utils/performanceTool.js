const _ = require('lodash');
const fs = require('fs');

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

const FILE_PATH = './performances.json';

const init = () => {
  const fd = fs.openSync(FILE_PATH, 'a');
  fs.writeSync(fd, `HSS performances - ${new Date()}\n`);
  fs.closeSync(fd);
  currentTime = process.hrtime();
};

const doAverage = (measures, currentAvg) => {
  const mean = _.mean(measures);
  return (typeof currentAvg === 'undefined') ? mean : _.mean([currentAvg, mean]);
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
    avgSecTime = doAverage(secDiffs, avgSecTime);
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
    const fd = fs.openSync(FILE_PATH, 'a');
    fs.writeSync(fd, `${JSON.stringify(details)}\n`);
    fs.closeSync(fd);
    cpt = 0;
  }
  cpt += 1;
  currentTime = process.hrtime();
  launch();
});

module.exports = {
  init,
  launch,
};
