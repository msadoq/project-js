const databaseLokiv1 = require('../lib/io/loki');
const Loki = require('lokijs');
const databaseLokiv2 = new Loki('test.db');
const async = require('async');

const NUMBER_OF_OPERATIONS = 1e6;
const NUMBER_OF_ENTRYS = 1e6;
const DELAY = 500;
// TODO const
const v1 = databaseLokiv1.addCollection('randomData');
const v2 = databaseLokiv2.addCollection('randomData');
const v1Indexed = databaseLokiv1.addCollection('randomData', { indices: ['timestamp'] });
const v2Indexed = databaseLokiv2.addCollection('randomData', { indices: ['timestamp'] });
const v2Adptive = databaseLokiv2.addCollection('randomData', { adaptiveBinaryIndices: true, indices: ['timestamp'] });
const initTime = 3568;
let tstamp = 0;

function generateCollection(collection) {
  for (let i = 1; i < NUMBER_OF_ENTRYS; i++) {
    if (i % 3 === 0) {
      tstamp = i * initTime;
      collection.insert({
        timestamp: tstamp,
        stringData: `id${i}`
      });
    }
    if (i % 2 === 0) {
      tstamp = initTime / i;
      collection.insert({
        timestamp: tstamp,
        stringData: `id${i}`
      });
    }
    else {
      tstamp = initTime + i * i;
      collection.insert({
        timestamp: tstamp,
        stringData: `id${i}`
      });
    }
  }
}

function testWR(collection){
  for (let i = 1; i <= NUMBER_OF_OPERATIONS; i++){
    if (i%2 === 0){
      collection.insert({
        timestamp: i * 10,
        stringData: `id${i}`,
      });
    } else {
      const query = {
        $and: [
          // { remoteId },
          { timestamp: { $gte: i * 1000 - i * 250 } },
          { timestamp: { $lte: i * 1000 } },
        ],
      };

      return collection.find(query);
    }
  }
}


function testTime(testname, collection, callback) {
  const startTime = process.hrtime();
  for (let i = 0 ;i < 10 ; i++){
    testWR(collection, NUMBER_OF_OPERATIONS);
  }
  const stoptime = process.hrtime(startTime);
  const timeinSec = (stoptime[0]+stoptime[1]*1e-9);
  console.log(testname, ':', timeinSec);
  callback(null);
}
generateCollection(v1);
generateCollection(v2);
generateCollection(v2Adptive);
generateCollection(v1Indexed);
generateCollection(v2Indexed);

async.series([
  cb => setTimeout(() => testTime('v1', v1, cb), DELAY),
  cb => setTimeout(() => testTime('v2', v2, cb), DELAY),
  cb => setTimeout(() => testTime('v1 Indexed', v1Indexed, cb), DELAY),
  cb => setTimeout(() => testTime('v2 Indexed', v2Indexed, cb), DELAY),
  cb => setTimeout(() => testTime('v2 Indexed with adaptativeBinaryIndices', v2Adptive, cb), DELAY),
], () => console.log('all done'));
