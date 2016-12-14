const async = require('async');
const _each = require('lodash/each');
const _chunk = require('lodash/chunk');
const _slice = require('lodash/slice');

require('../utils/test');

const zmq = require('../zmq');
const { encode, decode } = require('../protobuf');
const constants = require('../constants');


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

// SESSION DATA
const sessionDataPullHandler = (callback, trash, headerBuffer, ...argsBuffers) => {
  console.log('receiving a message from dc');
  console.log();
  const header = decode('dc.dataControllerUtils.Header', headerBuffer);
  header.messageType.should.equal(constants.MESSAGETYPE_SESSION_DATA);
  const queryId = decode('dc.dataControllerUtils.String', argsBuffers[0]).string;
  queryId.should.equal(myQueryId);
  (() => decode('dc.dataControllerUtils.Sessions', argsBuffers[1])).should.not.throw();
  zmq.closeSockets();
  console.log('...end test');
  callback(null);
};

// FILEPATH DATA
const filepathDataPullHandler = (callback, trash, headerBuffer, ...argsBuffers) => {
  console.log('receiving a message from dc');
  console.log();
  const header = decode('dc.dataControllerUtils.Header', headerBuffer);
  header.messageType.should.equal(constants.MESSAGETYPE_FILEPATH_DATA);
  const queryId = decode('dc.dataControllerUtils.String', argsBuffers[0]).string;
  queryId.should.equal(myQueryId);
  const oid = decode('dc.dataControllerUtils.String', argsBuffers[1]).string;
  oid.should.equal(myOid);
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
          if (dataId.catalog) {
            dataId.should.have.properties(myDataId);
          } else {
            dataId.should.have.properties(myComObjectDataId);
          }
          (_slice(argsBuffers, 2).length % 2).should.equal(0);
          _each(_chunk(_slice(argsBuffers, 2), 2), (argBuffer) => {
            (() => decode('dc.dataControllerUtils.Timestamp', argBuffer[0])).should.not.throw();
            (() => decode(`lpisis.decommutedParameter.${dataId.comObject}`, argBuffer[1])).should.not.throw();
          });
          sendZmqMessage(tbStopSubMessageArgs(dataId));
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

const myComObjectDataId = {   // corresponds to SubscriptionID ?
  comObject: 'ReportingParameter',
  sessionId: sessionIdTest,
  domainId: domainIdTest,
  // url: 'theUrl',  // for FDS params
  // version: 'theVersion',  //for FDS params
};

const myOid = 'myOid';

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

// session query
const sessionQueryMessageArgs = [
  encode('dc.dataControllerUtils.Header', { messageType: constants.MESSAGETYPE_SESSION_QUERY }),
  encode('dc.dataControllerUtils.String', { string: myQueryId }),
];

// filepath query
const filepathQueryMessageArgs = [
  encode('dc.dataControllerUtils.Header', { messageType: constants.MESSAGETYPE_FILEPATH_QUERY }),
  encode('dc.dataControllerUtils.String', { string: myQueryId }),
  encode('dc.dataControllerUtils.String', { string: myOid }),
];

// timebased subscription start
const tbStartSubMessageArgs = [
  encode('dc.dataControllerUtils.Header', { messageType: constants.MESSAGETYPE_TIMEBASED_SUBSCRIPTION }),
  encode('dc.dataControllerUtils.String', { string: myQueryId }),
  encode('dc.dataControllerUtils.DataId', myDataId),
  encode('dc.dataControllerUtils.Action', { action: constants.SUBSCRIPTIONACTION_ADD }),
];

// timebased subscription start
const tbStartWholeComObjectSubMessageArgs = [
  encode('dc.dataControllerUtils.Header', { messageType: constants.MESSAGETYPE_TIMEBASED_SUBSCRIPTION }),
  encode('dc.dataControllerUtils.String', { string: myQueryId }),
  encode('dc.dataControllerUtils.DataId', myComObjectDataId),
  encode('dc.dataControllerUtils.Action', { action: constants.SUBSCRIPTIONACTION_ADD }),
];

// timebased subscription stop
const tbStopSubMessageArgs = (dataId = myDataId) => [
  encode('dc.dataControllerUtils.Header', { messageType: constants.MESSAGETYPE_TIMEBASED_SUBSCRIPTION }),
  encode('dc.dataControllerUtils.String', { string: myOtherQueryId }),
  encode('dc.dataControllerUtils.DataId', dataId),
  encode('dc.dataControllerUtils.Action', { action: constants.SUBSCRIPTIONACTION_DELETE }),
];


// DOMAIN TEST
const domainTest =
  (callback) => {
    console.log('> Test Domain');
    createZmqConnection(callback, domainDataPullHandler);
    sendZmqMessage(domainQueryMessageArgs);
  };
// SESSION TEST
const sessionTest =
  (callback) => {
    console.log('> Test Session');
    createZmqConnection(callback, sessionDataPullHandler);
    sendZmqMessage(sessionQueryMessageArgs);
  };
// FILEPATH TEST
const filepathTest =
  (callback) => {
    console.log('> Test Filepath');
    createZmqConnection(callback, filepathDataPullHandler);
    sendZmqMessage(filepathQueryMessageArgs);
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
// PUBSUB WHOLE COM OBJECT TEST
const pubSubWholeTest =
  (callback) => {
    console.log('> Test PubSub Whole Com Object');
    createZmqConnection(callback, pubSubDataPullHandler);
    sendZmqMessage(tbStartWholeComObjectSubMessageArgs);
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
  boolean: ['d', 'p', 'a', 's', 'f', 'all', 't', 'w'],
  default: {
    all: true,
    d: false,
    p: false,
    a: false,
    t: false,
    s: false,
    w: false,
    f: false,
  },
  alias: {
    d: 'domains',
    p: 'pubsub',
    a: 'archive',
    t: 'trash',
    s: 'sessions',
    w: 'pubsubwhole',
    f: 'filepath',
  },
};
const argv = parseArgs(process.argv.slice(2), options);
if (argv.domains) {
  argv.all = false;
  testFunctions.push(domainTest);
}
if (argv.sessions) {
  argv.all = false;
  testFunctions.push(sessionTest);
}
if (argv.archive) {
  argv.all = false;
  testFunctions.push(archiveTest);
}
if (argv.pubsub) {
  argv.all = false;
  testFunctions.push(pubSubTest);
}
if (argv.pubsubwhole) {
  argv.all = false;
  testFunctions.push(pubSubWholeTest);
}
if (argv.filepath) {
  argv.all = false;
  testFunctions.push(filepathTest);
}
if (argv.trash) {
  argv.all = false;
  testFunctions = [trashTest];
}
if (argv.all) {
  testFunctions = [];
  testFunctions.push(domainTest);
  testFunctions.push(sessionTest);
  testFunctions.push(archiveTest);
  testFunctions.push(pubSubTest);
  testFunctions.push(pubSubWholeTest);
  testFunctions.push(filepathTest);
}


async.series(testFunctions, (err) => {
  if (err) {
    console.log(err.message);
  }
});
