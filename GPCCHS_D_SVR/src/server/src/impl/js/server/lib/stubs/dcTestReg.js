const zmq = require('../io/zmq');
const { encode, decode } = require('../protobuf');
const { onMessage } = require('../controllers/dc/onMessage');
const errorHandler = require('../utils/errorHandler');
const constants = require('../constants');
const async = require('async');
const _ = require('lodash');

require('../utils/test');

require('dotenv-safe').load();

/* socketOut.connect('tcp://127.0.0.1:5042');

var uri = 'tcp://127.0.0.1:49165'; */

const myQueryId = 'myQueryId';
const myOtherQueryId = 'myOtherQueryId';

const steps = {
  RESPONSE: 'Response',
  ARCHIVE_DATA: 'ArchiveData',
  PUBSUB_DATA: 'PubSubData',
  DOMAIN_DATA: 'DomainData',
  STOP: 'Stop',
};

let step;

// ZeroMQ
const createZmqConnection = (callback, pullHandler) => {
  step = steps.RESPONSE;
  zmq.open({
    dcPull: {
      type: 'pull',
      url: process.env.ZMQ_GPCCDC_PULL,
      handler: (...args) => pullHandler(callback, ...args),
    },
    dcPush: {
      type: 'push',
      url: process.env.ZMQ_GPCCDC_PUSH,
    },
  }, (err) => {
    if (err) {
      throw err;
    }
  });
};

const sendZmqMessage = (args) => {
  zmq.push('dcPush', args);
};

// DOMAIN DATA
const domainDataPullHandler = (callback, trash, headerBuffer, ...argsBuffers) => {
  console.log('receiving a message from dc');
  console.log()
  const header = decode('dc.dataControllerUtils.Header', headerBuffer);
  header.messageType.should.equal(constants.MESSAGETYPE_DOMAIN_DATA);
  const queryId = decode('dc.dataControllerUtils.String', argsBuffers[0]).string;
  queryId.should.equal(myQueryId);
  (() => decode('dc.dataControllerUtils.Domains', argsBuffers[1])).should.not.throw();
  zmq.closeSockets();
  console.log('...end test');
  callback(null);
};

// ARCHIVE DATA
const archiveDataPullHandler = (callback, trash, headerBuffer, ...argsBuffers) => {
  console.log('receiving a message from dc');
  console.log(step);
  switch (step) {
    case steps.RESPONSE:
      {
        const header = decode('dc.dataControllerUtils.Header', headerBuffer);
        header.messageType.should.equal(constants.MESSAGETYPE_RESPONSE);
        const queryId = decode('dc.dataControllerUtils.String', argsBuffers[0]).string;
        queryId.should.equal(myQueryId);
        step = steps.ARCHIVE_DATA;
        break;
      }
    case steps.ARCHIVE_DATA:
      {
        const header = decode('dc.dataControllerUtils.Header', headerBuffer);
        header.messageType.should.equal(constants.MESSAGETYPE_TIMEBASED_ARCHIVE_DATA);
        (() => decode('dc.dataControllerUtils.String', argsBuffers[0])).should.not.throw();
        (() => decode('dc.dataControllerUtils.DataId', argsBuffers[1])).should.not.throw();
        const isLast = decode('dc.dataControllerUtils.Boolean', argsBuffers[2]).boolean;
        step = (isLast === true) ? steps.STOP : step;
        break;
      }
    default:
      callback(new Error('Error in test'));
  }
  if (step === steps.STOP) {
    zmq.closeSockets();
    console.log('...end test');
    callback(null);
  } else {
    console.log('waiting for a next message');
  }
};

// START PUBSUB DATA
const pubSubDataPullHandler = (callback, trash, headerBuffer, ...argsBuffers) => {
  console.log('receiving a message from dc');
  console.log(step);
  switch (step) {
    case steps.RESPONSE:
      {
        const header = decode('dc.dataControllerUtils.Header', headerBuffer);
        header.messageType.should.equal(constants.MESSAGETYPE_RESPONSE);
        const queryId = decode('dc.dataControllerUtils.String', argsBuffers[0]).string;
        queryId.should.equal(myQueryId);
        step = steps.PUBSUB_DATA;
        break;
      }
    case steps.PUBSUB_DATA:
      {
        const header = decode('dc.dataControllerUtils.Header', headerBuffer);
        header.messageType.should.be.oneOf([
          constants.MESSAGETYPE_TIMEBASED_PUBSUB_DATA,
          constants.MESSAGETYPE_RESPONSE,
        ]);
        if (header.messageType === constants.MESSAGETYPE_TIMEBASED_PUBSUB_DATA) {
          const dataId = decode('dc.dataControllerUtils.DataId', argsBuffers[0]);
          dataId.should.have.properties(myDataId);
          (_.slice(argsBuffers, 1).length % 2).should.equal(0);
          _.each(_.chunk(_.slice(argsBuffers, 1), 2), argBuffer => {
            (() => decode('dc.dataControllerUtils.Timestamp', argBuffer[0])).should.not.throw();
            (() => decode(`lpisis.decommutedParameter.${dataId.comObject}`, argBuffer[1])).should.not.throw();
          });
          sendZmqMessage(tbStopSubMessageArgs);
        }
        if (header.messageType === constants.MESSAGETYPE_RESPONSE) {
          step = steps.STOP;
        }
        break;
      }
    default:
      callback(new Error('Error in test'));
  }
  if (step === steps.STOP) {
    zmq.closeSockets();
    console.log('...end test');
    callback(null);
  } else {
    console.log('waiting for a next message');
  }
};

//const ts1 = { ms: 1 };
const ts1 = { ms: 1455403400000 };
const ts2 = { ms: 1455413400000 };
const timeInterval = {
  startTime: ts1, // 8 aout 2015 9h15
  endTime: ts2, // 8 aout 2015 9h15:XX
};

const sessionIdTest = 1;

const myDataId = {   // corresponds to SubscriptionID ?
  parameterName: 'ATT_BC_STR1VOLTAGE',
  catalog: 'Reporting',
  comObject: 'ReportingParameter',
  sessionId: sessionIdTest, // TODO type is currently uint32, should be uint16 (bytes)
  domainId: 1,  // TODO type is currently uint32, should be uint16 (bytes)
  url: 'theUrl',  // for FDS params
  version: 'theVersion',  //for FDS params
};


const dataIdWithTypo = {
  parameterName: 'ATT_BC_STR1VOLAGE',      // typo error on parameterName
  catalog: 'Reporting',
  comObject: 'ReportingParameter',
  sessionId: sessionIdTest,
  domainId: 1,
  url: 'theUrl',
  version: 'theVersion',
};

const queryArguments = {
  filters: [],
};

// timebased query
const tbQueryMessageArgs = [
  encode('dc.dataControllerUtils.Header', { messageType: constants.MESSAGETYPE_TIMEBASED_QUERY }),
  encode('dc.dataControllerUtils.String', { string: myQueryId }),
  encode('dc.dataControllerUtils.DataId', myDataId),
  encode('dc.dataControllerUtils.TimeInterval', timeInterval),
  encode('dc.dataControllerUtils.QueryArguments', queryArguments),
];

// domain query
const domainQueryMessageArgs = [
  encode('dc.dataControllerUtils.Header', { messageType: constants.MESSAGETYPE_DOMAIN_QUERY }),
  encode('dc.dataControllerUtils.String', { string: myQueryId }),
];

// timebased subscription start
const tbStartSubMessageArgs = [
  encode('dc.dataControllerUtils.Header', { messageType: constants.MESSAGETYPE_TIMEBASED_SUBSCRIPTION }),
  encode('dc.dataControllerUtils.String', { string: myQueryId }),
  encode('dc.dataControllerUtils.DataId', myDataId),
  encode('dc.dataControllerUtils.Action', { action: constants.SUBSCRIPTIONACTION_ADD }),
];

// timebased subscription stop
const tbStopSubMessageArgs = [
  encode('dc.dataControllerUtils.Header', { messageType: constants.MESSAGETYPE_TIMEBASED_SUBSCRIPTION }),
  encode('dc.dataControllerUtils.String', { string: myOtherQueryId }),
  encode('dc.dataControllerUtils.DataId', myDataId),
  encode('dc.dataControllerUtils.Action', { action: constants.SUBSCRIPTIONACTION_DELETE }),
];

async.series([
// ARCHIVE TEST
  (callback) => {
    console.log('> Test Domain');
    createZmqConnection(callback, domainDataPullHandler);
    sendZmqMessage(domainQueryMessageArgs);
  },
// ARCHIVE TEST
  (callback) => {
    console.log('> Test Archive');
    createZmqConnection(callback, archiveDataPullHandler);
    sendZmqMessage(tbQueryMessageArgs);
  },
// PUBSUB TEST
  (callback) => {
    console.log('> Test PubSub');
    createZmqConnection(callback, pubSubDataPullHandler);
    sendZmqMessage(tbStartSubMessageArgs);
  },
], (err) => {
  if (err) {
    console.log(err.message);
  }
});


/*//Treat data from DC
socketIn.on('message',(header, msg) => {
  let servMsg = decode('dc.dataControllerUtils.DcServerMessage',msg);
  switch (servMsg.messageType){
    case 'NEW_DATA_MESSAGE':
      let dataMsg = decode('dc.dataControllerUtils.NewDataMessage',servMsg.payload);
      switch (dataMsg.dataSource){
        case 'UNKNOWN':
          //shouldn't happen
          console.log('dataSource from outter space');
          onNewDataMessage(servMsg.payload);
          break;
        case 'REAL_TIME':
          console.log('received real time data for ', dataMsg.dataId);
          onNewDataMessage(servMsg.payload);
          break;
        case 'ARCHIVE':
          if (dataMsg.isEndOfQuery){
            console.log('received all data from dataId ',dataMsg.dataId);
          } else {
            console.log('received incomplete data from ',dataMsg.dataId);
          }
          onNewDataMessage(servMsg.payload);
          break;
      }
      break;
    case 'DC_RESPONSE':{
      let dcResp = decode('dc.dataControllerUtils.DcResponse',servMsg.payload);
      console.log(dcResp);
      switch (dcResp.status){
        case 'OK':
          console.log('received  OK dcResponse for ', dcResp.id);
          break;
        case 'ERROR':
          console.log('received ERROR dcResponse for ', dcResp.id);
          break;
        case 'WARNING':
          console.log('received WARNING dcResponse for ', dcResp.id);
          break;
      }
      break;
    }
    case 'DOMAIN_RESPONSE':{
      dcResp = decode('dc.dataControllerUtils.DcResponse',servMsg.payload);
      console.log('received Domain Response for ');
      break;
    }
  }

});*/
// socketIn.on('message',(msg) => console.log(msg));


/*const ts1 = { ms: 1 };
const ts2 = { ms: 1455413400000 };
const timeInterval = {
  startTime: ts1, // 8 aout 2015 9h15
  endTime: ts2, // 8 aout 2015 9h15:XX
};

const sessionIdTest = 1;

const dataId = {   // corresponds to SubscriptionID ?
  parameterName: 'ATT_BC_STR1VOLTAGE',
  catalog: 'Reporting',
  comObject: 'ReportingParameter',
  sessionId: sessionIdTest, // TODO type is currently uint32, should be uint16 (bytes)
  domainId: 1,  // TODO type is currently uint32, should be uint16 (bytes)
  url: 'theUrl',  // for FDS params
  version: 'theVersion',  //for FDS params
};


const dataIdWithTypo = {
  parameterName: 'ATT_BC_STR1VOLAGE',      // typo error on parameterName
  catalog: 'Reporting',
  comObject: 'ReportingParameter',
  sessionId: sessionIdTest,
  domainId: 1,
  url: 'theUrl',
  version: 'theVersion',
};

// A full request for data
const dataQuery = {
  id: '42',
  dataId,
  interval: timeInterval,
};


// A full request for data, with a wrong parameter (doesn't exist)
const wrongDataQuery = {
  id: '43',
  dataId: dataIdWithTypo,
  interval: timeInterval,
};


// a filter to send to PubSub (Real time) with only DataId
const dataFilter = {
  action: 0,
  id: '1424',
  dataId,
};

// a filter to send to PubSub (Real time) with only DataId, which is wrong
const wrongDataFilter = {
  action: 0,
  id: '1425',
  dataId: dataIdWithTypo,
};

const domainQuery = {
  id: 'tartampion',
}
// a time filter with a sessionID and the same timeInterval as the query to Archive
// there can be several time filter for the same sessionId (useful in edge cases)
// let timeFilterMsg = new TimeFilterMessage({
//     'action' : 0,
//     'id' : 5666,
//     'sessionId' : sessionIdTest, //same sessionIs as dataId of previoussly defined dataFilter
//     'interval' : timeInterval
// });

// Removal of an existing filter on data for PubSub
let dataFilterRemoval = {
    'action' : 2,
    'id' : dataFilter.id // same ID as previously defined dataFilter
};


let callbackQueue = [];
var onResponse = function (reply) {
    //Take out the first callback and call it.
    let callback = callbackQueue.shift();
    if (typeof(callback) != 'undefined'){
        callback(reply);
    }
}
let sendRequest = function (request, callback){
    //put the callback in the queue and send request
    console.log(request);
    callbackQueue.push(callback);
    socketOut.send(request);
}


// Response received from DC
let checkDcAnswer =  (waitedAnswer) => function (msg) {
    var did = decode('dc.dataControllerUtils.DcServerMessage',msg);
    var resp = decode('dc.dataControllerUtils.DcResponse',did.payload);
    console.log('checkDcAnswer')
    console.log(resp);
    console.log(waitedAnswer == resp.status)
    if (waitedAnswer != resp.status){
      throw 'checkDcAsnwer failure';
    }
}
*/

//Expected DcResponse : OK

//for (i = 0; i < 50; i++){

//}
//Expected DcResponse : ERROR


//Expected DcResponse : OK

/*socketOut.on('message',onResponse);

let dataQueryPb = encode('dc.dataControllerUtils.DataQuery',dataQuery);


let wrongDataQueryPb = encode('dc.dataControllerUtils.DataQuery',wrongDataQuery);
//sendRequestProtobuf(dataQueryPb);
domainQuery = encode('dc.dataControllerUtils.DomainQuery',domainQuery);

let wrappedDataQuery ={
  'messageType' : 'DATA_QUERY',
  'payload' : dataQueryPb
}
wrappedDataQueryPb = encode('dc.dataControllerUtils.DcClientMessage', wrappedDataQuery);


let i = 0;
for (i = 0; i < 5; i++){
  sendRequest(wrappedDataQueryPb, checkDcAnswer('OK'));
}*/
//
// sendRequest(wrongDataQueryPb, checkDcAnswer('ERROR'));
// sendRequest(wrongDataQueryPb, checkDcAnswer('ERROR'));
// sendRequest(wrongDataQueryPb, checkDcAnswer('ERROR'));
// sendRequest(wrongDataQueryPb, checkDcAnswer('ERROR'));
// sendRequest(wrongDataQueryPb, checkDcAnswer('ERROR'));
// sendRequest(dataQueryPb, checkDcAnswer('OK'));
// sendRequest(domainQuery, msg => {
//   console.log(decode('dc.dataControllerUtils.DomainResponse',msg))
// });
//
// let dataFilterPb = encode('dc.dataControllerUtils.DataSubscribe',dataFilter);
// // sendRequestProtobuf(dataFilterPb , onMessage);
//
// //Expected DcResponse : ERROR
// // let wrongDataFilterPb = encode('dc.dataControllerUtils.DataSubscribe',dataFilter);
// // sendRequestProtobuf(wrongDataFilterPb, onMessage);
// sendRequest(dataFilterPb, checkDcAnswer('OK'));


//Expected DcResponse : OK
// sendProtobuf(timeFilterMsg);

//Expected DcResponse : OK
// sendProtobuf(dataFilterRemoval);

//Expected DcResponse : OK
// sendProtobuf(timeFilterRemoval);
