const Loki = require('lokijs');
const async = require('async');
const databaseLokiv1 = require('../lib/io/loki');
const databaseLokiv2 = new Loki('test.db');
const { getRemoteId, getReportingParameter } = require('../lib/stubs/data');


const NUMBER_OF_OPERATIONS = 1e3;
const NUMBER_OF_ENTRYS = 1e5;
const DELAY = 500;
const v1 = databaseLokiv1.addCollection('timebasedData');
const v2 = databaseLokiv2.addCollection('timebasedData');
const v1Indexed = databaseLokiv1.addCollection('timebasedData', { indices: ['timestamp', 'remoteId'] });
const v2Indexed = databaseLokiv2.addCollection('timebasedData', { indices: ['timestamp','remoteId'] });

const v2Unique = databaseLokiv2.addCollection('timebasedData', { unique: ['timestamp'] });
const v2UniqueAndAdaptative = databaseLokiv2.addCollection('timebasedData', { adaptiveBinaryIndices: true, unique: ['timestamp'] });
const v2UniqueAndIndex = databaseLokiv2.addCollection('timebasedData', { indices: ['timestamp', 'remoteId'], unique:['timestamp'] });
const v2AdptiveAndIndex = databaseLokiv2.addCollection('timebasedData', { adaptiveBinaryIndices: true, indices: ['timestamp'] });
const v2UniqueIndexAndAdaptative = databaseLokiv2.addCollection('timebasedData', { adaptiveBinaryIndices: true, indices: ['timestamp', 'remoteId'], unique:['timestamp'] });

const remoteId = getRemoteId();
const payload = getReportingParameter();


let tstamp = 0;

function generateCollection(collection) {
  for (let i = 1; i < NUMBER_OF_ENTRYS; i += 1) {
    if (i % 3 === 0) {
      tstamp = i * Date.now();
      collection.insert({
        timestamp: tstamp,
        remoteId: remoteId,
        payload: payload,
      });
    }
    if (i % 2 === 0) {
      tstamp = Date.now() / i;
      collection.insert({
        timestamp: tstamp,
        remoteId: remoteId,
        payload: payload,
      });
    } else {
      tstamp = Date.now() + (i * i);
      collection.insert({
        timestamp: tstamp,
        remoteId: remoteId,
        payload: payload,
      });
    }
  }
}

findByInterval = (collection, remoteId, lower, upper) => {
  const query = {
    $and: [
      { remoteId },
    ],
  };

  if (lower) {
    query.$and.push({ timestamp: { $gte: lower } });
  }
  if (upper) {
    query.$and.push({ timestamp: { $lte: upper } });
  }

  return collection.find(query);
};


findByIntervalWithoutRId = (collection, lower, upper) => {
  const query = {
    $and: [
    ],
  };

  if (lower) {
    query.$and.push({ timestamp: { $gte: lower } });
  }
  if (upper) {
    query.$and.push({ timestamp: { $lte: upper } });
  }

  return collection.find(query);
};


function testWR(collection){
  for (let i = 1; i <= NUMBER_OF_OPERATIONS; i += 1) {
    if (i % 3 === 0) {
      collection.insert({
        timestamp: Date.now(),
        remoteId: remoteId,
        payload: payload,
      });
    } else {
      const records = findByInterval(collection, remoteId, Date.now() - 1000, Date.now() + 1000)
      return records;
    }
  }
}

function testNoRemoteId(collection){
  for (let i = 1; i <= NUMBER_OF_OPERATIONS; i += 1) {
    if (i % 3 === 0) {
      collection.insert({
        timestamp: Date.now(),
        remoteId: remoteId,
        payload: payload,
      });
    } else {
      const records = findByIntervalWithoutRId(collection, Date.now() - 1000, Date.now() + 1000)
      return records;
    }
  }
}


function testTime(testname, collection, callback) {
  // console.log('Test sans remoteId');
  // let startTime = process.hrtime();
  // for (let i = 0; i < 10; i += 1) {
  //   testNoRemoteId(collection, NUMBER_OF_OPERATIONS);
  // }
  // let stoptime = process.hrtime(startTime);
  // let timeinSec = (stoptime[0] + (stoptime[1] * 1e-9));
  // console.log(testname, ':', timeinSec);

  // console.log('Test avec remoteId');
  startTime = process.hrtime();
  for (let i = 0; i < 10; i += 1) {
    testWR(collection, NUMBER_OF_OPERATIONS);
  }
  stoptime = process.hrtime(startTime);
  timeinSec = (stoptime[0] + (stoptime[1] * 1e-9));
  console.log(testname, ':', timeinSec);



  callback(null);
}

generateCollection(v2Unique);
generateCollection(v2UniqueAndAdaptative);
generateCollection(v2AdptiveAndIndex);
generateCollection(v2UniqueAndIndex);
generateCollection(v2UniqueIndexAndAdaptative);

async.series([
  // cb => setTimeout(() => testTime('v1', v1, cb), DELAY),
  // cb => setTimeout(() => testTime('v2', v2, cb), DELAY),
  // cb => setTimeout(() => testTime('v1 Indexed', v1Indexed, cb), DELAY),
  cb => setTimeout(() => testTime('v2 Indexed', v2Indexed, cb), DELAY),
  cb => setTimeout(() => testTime('v2 Indexed with adaptativeBinaryIndices', v2AdptiveAndIndex, cb), DELAY),
  cb => setTimeout(() => testTime('v2 Indexed with unique', v2UniqueAndIndex, cb), DELAY),
  cb => setTimeout(() => testTime('v2 Indexed with adaptativeBinaryIndices and unique', v2UniqueIndexAndAdaptative, cb), DELAY),
  cb => setTimeout(() => testTime('v2 With only unique', v2Unique, cb), DELAY),
  cb => setTimeout(() => testTime('v2 With unique and adaptativeBinaryIndices', v2UniqueAndAdaptative, cb), DELAY),
], () => console.log('all done'));
