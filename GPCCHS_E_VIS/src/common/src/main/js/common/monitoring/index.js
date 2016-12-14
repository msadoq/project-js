const { get } = require('../parameters');

const getLogger = require('../log');

const logger = getLogger('monitoring');

let memUsage;
let reportLoop;
let latencyLoop;
let avgTime;

const latencyData = {
  count: 0,
  min: 60 * 1000,
  max: 0,
  total: 0,
};
const REPORT_INTERVAL = 5000;
const CHECK_LATENCY_INTERVAL = 500;

const checkLatency = () => {
  const start = process.hrtime();
  setImmediate((_start) => {
    const delta = process.hrtime(_start);
    const latency = (delta[0] * 1000) + (delta[1] / 1000000);
    latencyData.count += 1;
    latencyData.min = Math.min(latencyData.min, latency);
    latencyData.max = Math.max(latencyData.max, latency);
    latencyData.total += latency;
  }, start);
};

const latencyReport = () => {
  if (latencyData.count === 0) {
    return {
      min: 0,
      max: 0,
      avg: 0,
    };
  }
  const latency = {
    min: latencyData.min,
    max: latencyData.max,
    avg: latencyData.total / latencyData.count,
  };

  avgTime = latency.avg;

  latencyData.count = 0;
  latencyData.min = 60 * 1000;
  latencyData.max = 0;
  latencyData.total = 0;

  return latency;
};

const report = () => {
  memUsage = process.memoryUsage();

  logger.info('data', {
    memUsage: Object.assign({}, memUsage, {
      time: Date.now(),
    }),
    latency: Object.assign({}, latencyReport(), {
      time: Date.now(),
    }),
  });
};

const start = () => {
  if (get('MONITORING') === 'on') {
    reportLoop = setInterval(report, REPORT_INTERVAL);
    latencyLoop = setInterval(checkLatency, CHECK_LATENCY_INTERVAL);
  }
};

const stop = () => {
  if (get('MONITORING') === 'on') {
    clearInterval(reportLoop);
    clearInterval(latencyLoop);
  }
};

module.exports = {
  start,
  stop,
  getMemoryUsage: () => memUsage,
  getLatency: () => latencyData,
  getAverageTime: () => avgTime,
};
