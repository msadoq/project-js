const zmq = require('zmq');
const protoBuf = require('protobufjs');
const { join } = require('path');

const socketOut = zmq.socket('req');
console.log('binding tcp://127.0.0.1:5042');
socketOut.connect('tcp://127.0.0.1:5042');
socketOut.on('message', msg => {
  console.log('NEW INCOMING MESSAGE ++++++++++++++++++++++++++++');
  const did = DcResponse.decode(new Buffer(msg));
  console.log(did.toRaw());
  switch (did.toRaw().status) {
    case 'ERROR':
      console.log('error :', did.reason);
      break;
    case 'OK':
      console.log('OK');
      break;
    case 'WARNING':
      console.log('warning ', did.reason);
      break;
    default:
      console.error('unimplemented status', did.toRaw().status);
  }
  console.log('ENDOF INCOMING MESSAGE ++++++++++++++++++++++++++');
});

const builder = protoBuf.newBuilder();
const build = (protos) => {
  protos.map(file => protoBuf.loadProtoFile({
    root: join(__dirname, '../proto/dc'),
    file,
  }, builder));
};
build([
  'dataControllerUtils/DataQuery.proto',
  'dataControllerUtils/DataSubscribe.proto',
  'dataControllerUtils/DcResponse.proto',
  'dataControllerUtils/TimeFilterMessage.proto',
]);

const {
  DataId,
  DataQuery,
  DcResponse,
  DataSubscribe,
  TimeInterval,
  Timestamp,
} = builder.build('dataControllerUtils').protobuf;

// let queryFilter1 = new ValueFilter({
//     'lhs' : 'extractedValue',
//     'comp' : ValueFilter.LT,                       // TODO make an enum with comparison operators
//     'rhs' : '42'
// })

// let queryFilter2 = new ValueFilter({
//     'lhs' : 'extractedValue',
//     'comp' : ValueFilter.LT,                       // TODO make an enum with comparison operators
//     'rhs' : '420'
// })

const ts1 = new Timestamp({ ms: 1438413300000 });
const ts2 = new Timestamp({ ms: 1438413400000 });
const timeInterval = new TimeInterval({
  lowerTs: ts1, // 8 aout 2015 9h15
  upperTs: ts2, // 8 aout 2015 9h15:XX
});

const sessionIdTest = 1;

const dataId = new DataId({              // corresponds to SubscriptionID ?
  parameterName: 'ATT_BC_STR1VOLTAGE',
  catalog: 'Reporting',
  comObject: 'ReportingParameter',
  sessionId: sessionIdTest,              // TODO type is currently uint32, should be uint16 (bytes)
  domainId: 1,                           // TODO type is currently uint32, should be uint16 (bytes)
  url: 'theUrl',                         // for FDS params
  version: 'theVersion',                 // for FDS params
});

const dataIdWithTypo = new DataId({
  parameterName: 'ATT_BC_STR1VOLAGE',      // typo error on parameterName
  catalog: 'Reporting',
  comObject: 'ReportingParameter',
  sessionId: sessionIdTest,
  domainId: 1,
  url: 'theUrl',
  version: 'theVersion',
});

// A full request for data
const dataQuery = new DataQuery({
  id: '42',
  dataId,
  interval: timeInterval,
});

// A full request for data, with a wrong parameter (doesn't exist)
const wrongDataQuery = new DataQuery({
  id: '43',
  dataId: dataIdWithTypo,
  interval: timeInterval,
});

// a filter to send to PubSub (Real time) with only DataId
const dataFilter = new DataSubscribe({
  action: 0,
  id: '1424',
  dataId,
});

// a filter to send to PubSub (Real time) with only DataId, which is wrong
const wrongDataFilter = new DataSubscribe({
  action: 0,
  id: '1425',
  dataId: dataIdWithTypo,
});

// a time filter with a sessionID and the same timeInterval as the query to Archive
// there can be several time filter for the same sessionId (useful in edge cases)
// let timeFilterMsg = new TimeFilterMessage({
//     'action' : 0,
//     'id' : 5666,
//     'sessionId' : sessionIdTest, //same sessionIs as dataId of previoussly defined dataFilter
//     'interval' : timeInterval
// });

// Removal of an existing filter on data for PubSub
const dataFilterRemoval = new DataSubscribe({
  action: 2,
  id: dataFilter.id, // same ID as previously defined dataFilter
});

// Removal of an existing time filter on session for PubSub
// let timeFilterRemoval = new DataSubscribe({
//     'action' : 2,
//     'id' : dataFilter.id // same ID as previously defined dataFilter
// });

const sendProtobuf = protoObj => {
  console.log('SENDING MESSAGE ---------------------------------------');
  console.log(protoObj);
  const byteBuffer = protoObj.encode();
  const buffer = byteBuffer.toBuffer();
  console.log(socketOut.send(buffer));
  console.log('ENDOF SENDING MESSAGE ---------------------------------');
};

setTimeout(() => {
  // Expected DcResponse : OK
  sendProtobuf(dataQuery);

  // Expected DcResponse : ERROR
  // sendProtobuf(wrongDataQuery);

  // Expected DcResponse : OK
  sendProtobuf(dataFilter);

  // Expected DcResponse : ERROR
  sendProtobuf(wrongDataFilter);

  // Expected DcResponse : OK
  // sendProtobuf(timeFilterMsg);

  // Expected DcResponse : OK
  // sendProtobuf(dataFilterRemoval);

  // Expected DcResponse : OK
  // sendProtobuf(timeFilterRemoval);

  setTimeout(() => process.exit(0), 100);
}, 200);
