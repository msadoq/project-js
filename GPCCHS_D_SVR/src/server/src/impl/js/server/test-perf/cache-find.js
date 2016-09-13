const debug = require('../lib/io/debug')('test-perf:cache-find');
const _ = require('lodash');

const { Cache } = require('cache');
const { injectParameters, newData } = require('paramInjector');

const cache = new Cache();

const MAX_ITER = 1;

const PARAM_NB = 1000000;
const START_VALUE = 1420675200000;
const END_VALUE = START_VALUE+PARAM_NB;

let startTime = 0;

const PRECISION = 6;

const restart_timer = () => {
  startTime = process.hrtime();
}

const elapsed_time = () => {
    const time = process.hrtime(startTime);
    const elapsed = time[0] + (time[1] / 1000000000);
    return elapsed;
}

restart_timer();
injectParameters(cache, 1000000);
const tinject = elapsed_time();

const data = newData();
const catalog = data.catalog;
const parameter = data.parameter;
const session = data.session;
const dInf = START_VALUE;
const dSup = END_VALUE;

let total1 = 0;

for (let i = 0 ; i < MAX_ITER ; i++) {
  const filterTimestamp = (o) => (o.timestamp <= dSup && o.timestamp >= dInf);
  restart_timer();
  const truc = _.filter(cache.data, filterTimestamp);
  const data1 = _.filter(truc, { catalog, parameter, session, });
  const t1 = elapsed_time();
  total1 += t1;
  debug.info(`LENGTH: ${data1.length}`);
}

const tests = [];
tests.push({ title: 'Test1', total: total1 });

const logAverage = (testsArray) => {
  for (const test of testsArray) {
    const avg = test.total / MAX_ITER;
    console.log(`${test.title}: ${avg.toFixed(PRECISION)}`);
  }
}

const logBestTest = (testsArray) => {
  const bestTest = _.orderBy(testsArray, ['total'])[0];
  const avg = bestTest.total / MAX_ITER;
  console.log(`Best test is ${bestTest.title}: ${avg.toFixed(PRECISION)}`);
}

console.log('PERFORMANCE TEST for finding methods in cache')
console.log(`${PARAM_NB} parameters injected in the cache. Tests over ${MAX_ITER} iterations.`);
console.log();
logAverage(tests);
console.log();
logBestTest(tests);
