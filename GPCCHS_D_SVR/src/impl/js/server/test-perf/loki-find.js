const debug = require('../lib/io/debug')('test-perf:loki-find');
const _ = require('lodash');

const Loki = require('lokijs');
const cache = new Loki('cache.json');
const collection = cache.addCollection('collection');

const { injectParameters, newData } = require('../stub/paramInjector');

const MAX_ITER = 1;

const PARAM_NB = 25000000;
const START_VALUE = 1420675200000;
const END_VALUE = START_VALUE+PARAM_NB;

let startTime = 0;

const PRECISION = 6;

const restart_timer = () => {
  startTime = process.hrtime();
}

const elapsed_time = (note) => {

    const time = process.hrtime(startTime);
    const elapsed = time[0] + (time[1] / 1000000000); // divide by a million to get nano to milli
    //console.log(`${note} - ${elapsed.toFixed(PRECISION)} s`);
    return elapsed;
}

const tx = [
  {
    type: 'find',
    value: {
      $and: [
        {
          timestamp: {
            $gte: '[%lktxp]lower',
          },
        }, {
          timestamp: {
            $lte: '[%lktxp]upper',
          },
        },
        {
          catalog: '[%lktxp]catalog',
        }, {
          parameter: '[%lktxp]parameter',
        }, {
          session: '[%lktxp]session',
        },
      ]
    }
  },
];
filteredData = collection.addDynamicView('MyFilteredData');
collection.addTransform('FindFilter', tx);

console.log('PERFORMANCE TEST for finding methods in cache')
console.log(`${PARAM_NB} parameters injected in the cache. Tests over ${MAX_ITER} iterations.`);

restart_timer();
injectParameters(collection, PARAM_NB, START_VALUE);
const tinject = elapsed_time('injection');

console.log(`Injection: ${tinject.toFixed(PRECISION)} s`);


const data = newData();
const catalog = data.catalog;
const parameter = data.parameter;
const session = data.session;
const dInf = START_VALUE;
const dSup = END_VALUE;

const tests = []

let total1 = 0;
let total2 = 0;
let total2bis = 0;
let total2ter = 0;
let total3 = 0;
let total4 = 0;

let totala = 0;
let totalb = 0;
let totalc = 0;
let totald = 0;
let totale = 0;

////////////////////////////////////////
for (let i = 0 ; i < MAX_ITER ; i++) {
  const findFilter = {
    $and: [
      {
        catalog,
      }, {
        parameter,
      }, {
        timestamp: {
          $gte: dInf,
        },
      }, {
        timestamp: {
          $lte: dSup,
        },
      }, {
        session,
      },
    ],
  };

  debug.info(findFilter);

  debug.info('test1');
  restart_timer();
  const data1 = collection.find(findFilter);
  const t1 = elapsed_time('test1');
  total1 += t1;
  debug.info('Fin test1');
  debug.info(`LENGTH: ${data1.length}`);

  ////////////////////////////////////////////

  debug.info('test2');
  restart_timer();
  const data2 = collection.chain()
    .find({
      $and: [
        {
          timestamp: {
            $gte: dInf,
          },
        }, {
          timestamp: {
            $lte: dSup,
          },
        },
      ]
    })
    .find({ catalog, })
    .find({ parameter, })
    .find({ session, })
    .data();
  const t2 = elapsed_time('test2');
  total2 += t2;
  debug.info('Fin test2');
  debug.info(`LENGTH: ${data2.length}`);

  ////////////////////////////////////////////////

  debug.info('test2bis');
  restart_timer();
  const data2bis = collection.chain()
    .find({ catalog, })
    .find({ parameter, })
    .find({ session, })
    .where((obj) => (obj.timestamp <= dSup && obj.timestamp >= dInf))
    .data();
  const t2bis = elapsed_time('test2bis');
  total2bis += t2bis;
  debug.info('Fin test2bis');
  debug.info(`LENGTH: ${data2bis.length}`);

  ////////////////////////////////////////////

  debug.info('test2ter');
  restart_timer();
  const a = collection.chain()
    .find(
      {
        timestamp: {
          $gte: dInf,
        },
      });
  const ta = elapsed_time('test2ter');
  const b = a.find(
    {
      timestamp: {
        $lte: dSup,
      },
    });
  const tb = elapsed_time('test2ter');
  const c = b.find({ parameter, });
  const tc = elapsed_time('test2ter');
  const d = b.find({ catalog, });
  const td = elapsed_time('test2ter');
  const data2ter = c.find({ session, }).data();
  const t2ter = elapsed_time('test2ter');
  total2ter += t2ter;
  totala += ta;
  totalb += (tb - ta);
  totalc += (tc - tb);
  totald += (td - tc);
  totale += (t2ter - td);
  debug.info('Fin test2ter');
  debug.info(`LENGTH: ${data2ter.length}`);

  ////////////////////////////////////////////////

  const params = {
    catalog,
    parameter,
    lower: dInf,
    upper: dSup,
    session,
  };

  debug.info('test3');
  restart_timer();
  const data3 = collection.chain('FindFilter', params).data();
  const t3 = elapsed_time('test3');
  total3 += t3;
  debug.info('Fin test3');
  debug.info(`LENGTH: ${data3.length}`);

  ////////////////////////////////////////////////

  debug.info('test4');
  restart_timer();
  const data4 = filteredData.branchResultset('FindFilter', params).data();
  const t4 = elapsed_time('test4');
  total4 += t4;
  debug.info('Fin test4');
  debug.info(`LENGTH: ${data4.length}`);
}

tests.push({ title: 'Test1', total: total1 });
tests.push({ title: 'Test2', total: total2 });
tests.push({ title: 'Test2b', total: total2bis });
tests.push({ title: 'Test2t', total: total2ter });
tests.push({ title: 'Test3', total: total3 });
tests.push({ title: 'Test4', total: total4 });

const tests_2ter = [];
tests_2ter.push({ title: 'Test2t', total: total2ter });
tests_2ter.push({ title: '-- a', total: totala });
tests_2ter.push({ title: '-- b', total: totalb });
tests_2ter.push({ title: '-- c', total: totalc });
tests_2ter.push({ title: '-- d', total: totalc });
tests_2ter.push({ title: '-- e', total: totalc });

const logAverage = (testsArray) => {
  for (const test of testsArray) {
    const avg = test.total / MAX_ITER;
    console.log(`${test.title}: ${avg.toFixed(PRECISION)} s`);
  }
}

const logBestTest = (testsArray) => {
  const bestTest = _.orderBy(testsArray, ['total'])[0];
  const avg = bestTest.total / MAX_ITER;
  console.log(`Best test is ${bestTest.title}: ${avg.toFixed(PRECISION)} s`);
}

console.log();
logAverage(tests);
console.log();
logAverage(tests_2ter);
console.log();
logBestTest(tests);
