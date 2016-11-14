// eslint-disable-next-line import/no-extraneous-dependencies
const zmq = require('../zmq');
const { encode, decode } = require('../protobuf');
const constants = require('../constants');
const async = require('async');
const {
  each: _each,
  chunk: _chunk,
  slice: _slice,
} = require('lodash');

require('../utils/test');

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
      role: 'server',
      url: process.env.ZMQ_GPCCDC_PULL,
      handler: (...args) => pullHandler(callback, ...args),
    },
    dcPush: {
      type: 'push',
      role: 'client',
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

let trashFlag = true;
// TRASH DATA
const trashPullHandler = (callback, trash, headerBuffer, ...argsBuffers) => {
  console.log('receiving trash from dc');
  console.log();
  if (trashFlag) {
    console.log('...end test');
  }
  zmq.closeSockets();
  callback(null);
};

// DOMAIN DATA
const domainDataPullHandler = (callback, trash, headerBuffer, ...argsBuffers) => {
  console.log('receiving a message from dc');
  console.log();
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
        decode('dc.dataControllerUtils.Status', argsBuffers[1]).status.should.equal(constants.STATUS_SUCCESS);
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
        decode('dc.dataControllerUtils.Status', argsBuffers[1]).status.should.equal(constants.STATUS_SUCCESS);
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
          (() => decode('dc.dataControllerUtils.String', argsBuffers[0])).should.not.throw();
          const dataId = decode('dc.dataControllerUtils.DataId', argsBuffers[1]);
          dataId.should.have.properties(myDataId);
          (_slice(argsBuffers, 2).length % 2).should.equal(0);
          _each(_chunk(_slice(argsBuffers, 2), 2), (argBuffer) => {
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

const now = Date.now();
const ts1 = { ms: now/*1430810001000*/ };
const ts2 = { ms: now + 1000/*1430820001000*/ };
//const ts2 = { ms: 1431920001000 };
const timeInterval = {
  startTime: ts1,
  endTime: ts2,
};

const sessionIdTest = 65535;
const domainIdTest = 1;

const myDataId = {   // corresponds to SubscriptionID ?
  parameterName: 'ATT_BC_STR1VOLTAGE',
  catalog: 'Reporting',
  comObject: 'ReportingParameter',
  sessionId: sessionIdTest, // TODO type is currently uint32, should be uint16 (bytes)
  domainId: domainIdTest,  // TODO type is currently uint32, should be uint16 (bytes)
  // url: 'theUrl',  // for FDS params
  // version: 'theVersion',  //for FDS params
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


// ARCHIVE TEST
const domainTest =
  (callback) => {
    console.log('> Test Domain');
    createZmqConnection(callback, domainDataPullHandler);
    sendZmqMessage(domainQueryMessageArgs);
  };
// ARCHIVE TEST
const archiveTest =
  (callback) => {
    console.log('> Test Archive');
    createZmqConnection(callback, archiveDataPullHandler);
    sendZmqMessage(tbQueryMessageArgs);
  };
// PUBSUB TEST
const pubSubTest =
  (callback) => {
    console.log('> Test PubSub');
    createZmqConnection(callback, pubSubDataPullHandler);
    sendZmqMessage(tbStartSubMessageArgs);
  };
// TRASH TEST
const trashTest =
  (callback) => {
    console.log('> Trash Test');
    createZmqConnection(callback, trashPullHandler);
    setTimeout(() => {
      trashFlag = false;
    }, 2000);
  };


let testFunctions = [];

const parseArgs = require('minimist');
const options = {
  boolean: ['d', 'p', 'a', 'all', 't'],
  default: {
    all: true,
    d: false,
    p: false,
    a: false,
    t: false,
  },
  alias: {
    d: 'domains',
    p: 'pubsub',
    a: 'archive',
    t: 'trash',
  },
};
const argv = parseArgs(process.argv.slice(2), options);
if (argv.domains) {
  argv.all = false;
  testFunctions.push(domainTest);
}
if (argv.archive) {
  argv.all = false;
  testFunctions.push(archiveTest);
}
if (argv.pubsub) {
  argv.all = false;
  testFunctions.push(pubSubTest);
}
if (argv.trash) {
  argv.all = false;
  testFunctions = [trashTest];
}
if (argv.all) {
  testFunctions = [];
  testFunctions.push(domainTest);
  testFunctions.push(archiveTest);
  testFunctions.push(pubSubTest);
}


async.series(testFunctions, (err) => {
  if (err) {
    console.log(err.message);
  }
});
