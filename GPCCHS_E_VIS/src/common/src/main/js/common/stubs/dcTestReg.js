/* eslint no-console:0 no-use-before-define:0 */
const async = require('async');
const _each = require('lodash/each');
const _chunk = require('lodash/chunk');
const _slice = require('lodash/slice');
const parseArgs = require('minimist');
const {
  encodeAttribute,
  decodeAttribute,
} = require('../protobuf/adapters/lpisis/types');

require('../utils/test');

const zmq = require('../zmq');
const { getType, encode, decode } = require('../protobuf');
const constants = require('../constants');

const sessionIdTest = 65535;
const domainIdTest = 1;
const myQueryId = 'myQueryId';
const myOtherQueryId = 'myOtherQueryId';


const myOid = 'myOid';

const queryArguments = {
  filters: [],
};


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
const trashPullHandler = (callback) => {
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
  header.messageType.should.equal(constants.MESSAGETYPE_FMD_GET_DATA);
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
        // header.messageType.should.equal(constants.MESSAGETYPE_RESPONSE);
        const queryId = decode('dc.dataControllerUtils.String', argsBuffers[0]).string;
        queryId.should.equal(myQueryId);
        // decode('dc.dataControllerUtils.Status', argsBuffers[1]).status.should.equal(constants.STATUS_SUCCESS);
        step = steps.ARCHIVE_DATA;
        break;
      }
    case steps.ARCHIVE_DATA:
      {
        const header = decode('dc.dataControllerUtils.Header', headerBuffer);
        console.log(header);
        if (header.messageType == constants.MESSAGETYPE_TIMEBASED_ARCHIVE_DATA) {
          (() => decode('dc.dataControllerUtils.String', argsBuffers[0])).should.not.throw();
          const dataId = decode('dc.dataControllerUtils.DataId', argsBuffers[1]);
          const isLast = decode('dc.dataControllerUtils.Boolean', argsBuffers[2]).boolean;
          (_slice(argsBuffers, 3).length % 2).should.equal(0);
          _each(_chunk(_slice(argsBuffers, 3), 2), (argBuffer) => {
            (() => decode('dc.dataControllerUtils.Timestamp', argBuffer[0])).should.not.throw();
            (() => decode(getType(dataId.comObject), argBuffer[1])).should.not.throw();
          });
        step = (isLast === true) ? steps.STOP : step;
        break;
        }
      }
    default:
  }
  if (step === steps.STOP) {
    zmq.closeSockets();
    console.log('...end test');
    callback(null);
  } else {
    console.log('waiting for a next message (archive)');
  }
};

const documentCreatePullHandler = (onOidCreated = (oid) => undefined) => (callback, trash, headerBuffer, ...argsBuffers) => {
  const header = decode('dc.dataControllerUtils.Header', headerBuffer);
  header.messageType.should.equal(constants.MESSAGETYPE_FMD_CREATE_DATA);
  const [queryId, status, fmdFileInfoOrReason] = argsBuffers;
  const statusPb = decode('dc.dataControllerUtils.Status', status);
  if (statusPb.status == constants.STATUS_ERROR){
    const reasonPb = decode('dc.dataControllerUtils.String', fmdFileInfoOrReason);
    console.log("documentCreatePullHandler error from create : ", reasonPb.string);
  } else {
    const fileInfoPb = decode('dc.dataControllerUtils.FMDFileInfo', fmdFileInfoOrReason);
    console.log(fileInfoPb);
    onOidCreated(fileInfoPb.serializedOid);
  }
  zmq.closeSockets();
}


const documentGetPullHandler = (waitedFilename = undefined) => (callback, trash, headerBuffer, ...argsBuffers) => {
  const header = decode('dc.dataControllerUtils.Header', headerBuffer);
  header.messageType.should.equal(constants.MESSAGETYPE_FMD_GET_DATA);
  const [queryId, status, fmdFileInfoOrReason, documentData] = argsBuffers;
  const statusPb = decode('dc.dataControllerUtils.Status', status);
  if (statusPb.status == constants.STATUS_ERROR){
    const reasonPb = decode('dc.dataControllerUtils.String', fmdFileInfoOrReason);
    console.log("documentGetPullHandler error from get : ", reasonPb.string);
  } else {
    const fileInfoPb = decode('dc.dataControllerUtils.FMDFileInfo', fmdFileInfoOrReason);
    switch (fileInfoPb.type){
      case constants.FILE_TYPE_DOCUMENT:
        const documentDataPb = decode('lpisis.file.Document', documentData);
        console.log(documentDataPb);
        if (typeof(waitedFilename) !== undefined) {
            documentDataPb.basename.value.should.equal(waitedFilename);
        }

    }

  }
  zmq.closeSockets();
  // (() => decode('dc.dataControllerUtils.Timestamp', argsBuffers[2])).should.not.throw();
  //  console.log("toto");
}

const sessionMasterDataHandler = (callback, trash, headerBuffer, ...argsBuffers) => {
  console.log("sessionMasterDataHandler");
  console.log(decode('lpisis.ccsds_mal.UINTEGER', argsBuffers[1]));
  (() => decode('lpisis.ccsds_mal.uinteUINTEGERger', argsBuffers[1])).should.not.throw();
  zmq.closeSockets();
 }

const sessionTimeDataHandler = (callback, trash, headerBuffer, ...argsBuffers) => {
  console.log(decode('dc.dataControllerUtils.Timestamp', argsBuffers[1]));
  (() => decode('dc.dataControllerUtils.Timestamp', argsBuffers[1])).should.not.throw();
  zmq.closeSockets();
}

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
        // TODO give myQueryId as argument to the pull handler.
        // queryId.should.equal(myQueryId);
        decode('dc.dataControllerUtils.Status', argsBuffers[1]).status.should.equal(constants.STATUS_SUCCESS);
        step = steps.PUBSUB_DATA;
        break;
      }
    case steps.PUBSUB_DATA:
      {
        console.log(headerBuffer);
        if (headerBuffer.length ==0) {
          step = steps.PUBSUB_DATA;
          break;
        }
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
          // (_slice(argsBuffers, 2).length % 2).should.equal(0);
          _each(_chunk(_slice(argsBuffers, 2), 2), (argBuffer) => {
            (() => decode('dc.dataControllerUtils.Timestamp', argBuffer[0])).should.not.throw();
            (() => decode(getType(dataId.comObject), argBuffer[1])).should.not.throw();
          });
          sendZmqMessage(tbStopSubMessageArgs(dataId));
        }
        if (header.messageType === constants.MESSAGETYPE_RESPONSE) {
          step = steps.PUBSUB_DATA;
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
    console.log('waiting for a next message (pubsub)');
  }
};

const now = Date.now();
const ts1 = { ms: now }; /* 1430810001000 */
const ts2 = { ms: now + 1000 }; /* 1430820001000 */
const timeInterval = {
  startTime: ts1,
  endTime: ts2,
};

// All supsup parameters
const ParameterNames = ["STAT_SU_PID",
 "STAT_SU_COMM",
 "STAT_SU_STATE",
 "STAT_SU_PPID",
 "STAT_SU_PGRP",
 "STAT_SU_SESSION",
 "STAT_SU_TTY_NR",
 "STAT_SU_TPGID",
 "STAT_SU_FLAGS",
 "STAT_SU_MINFLT",
 "STAT_SU_CMINFLT",
 "STAT_SU_MAJFLT",
 "STAT_SU_CMAJFLT",
 "STAT_SU_UTIME",
 "STAT_SU_STIME",
 "STAT_SU_CUTIME",
 "STAT_SU_CSTIME",
 "STAT_SU_PRIORITY",
 "STAT_SU_NICE",
 "STAT_SU_NUM_THREADS",
 "STAT_SU_ITREALVALUE",
 "STAT_SU_STARTTIME",
 "STAT_SU_VSIZE",
 "STAT_SU_RSS",
 "STAT_SU_RSSLIM",
 "STAT_SU_STARTCODE",
 "STAT_SU_ENDCODE",
 "STAT_SU_STARTSTACK",
 "STAT_SU_KSTKESP",
 "STAT_SU_KSTKEIP",
 "STAT_SU_SIGNAL",
 "STAT_SU_BLOCKED",
 "STAT_SU_SIGIGNORE",
 "STAT_SU_SIGCATCH",
 "STAT_SU_WCHAN",
 "STAT_SU_NSWAP",
 "STAT_SU_CNSWAP",
 "STAT_SU_EXIT_SIGNAL",
 "STAT_SU_PROCESSOR",
 "STAT_SU_RT_PRIORITY",
 "STAT_SU_POLICY",
 "STAT_SU_DELAYACCT_BLKIO_T",
 "STAT_SU_GUEST_TIME",
 "STAT_SU_CGUEST_TIME",
 "STAT_SU_START_DATA",
 "STAT_SU_END_DATA",
 "STAT_SU_START_BRK",
 "STAT_SU_ARG_START",
 "STAT_SU_ARG_END",
 "STAT_SU_ENV_START",
 "STAT_SU_ENV_END",
 "STAT_SU_EXIT_CODE"];


const createDocumentProto = (filename) => {
  return {
    name : filename,
    path : '/',
    mimeType : 'HistoryViewDoc',
    domainId : 1,
  };
};



const myDataId = {
  parameterName: 'STAT_SU_ENV_END',
  catalog: 'Reporting',
  comObject: 'ReportingParameter',
  sessionId: sessionIdTest, // TODO type is currently uint32, should be uint16 (bytes)
  domainId: domainIdTest,  // TODO type is currently uint32, should be uint16 (bytes)
};

const myTcId = {
  comObject: 'TCHistory',
  sessionId: sessionIdTest, // TODO type is currently uint32, should be uint16 (bytes)
  domainId: domainIdTest,  // TODO type is currently uint32, should be uint16 (bytes)
};

const myComObjectDataId = {
  comObject: 'IsisAggregation',
  sessionId: sessionIdTest,
  domainId: domainIdTest,
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



let makeQueries = (parameter) => {
  let dataId = Object.assign({}, myDataId);
  dataId.parameterName = parameter;
  // console.log(dataId);
  return  [
    encode('dc.dataControllerUtils.Header', { messageType: constants.MESSAGETYPE_TIMEBASED_QUERY }),
    encode('dc.dataControllerUtils.String', { string: myQueryId }),
    encode('dc.dataControllerUtils.DataId', dataId),
    encode('dc.dataControllerUtils.TimeInterval', timeInterval),
    encode('dc.dataControllerUtils.QueryArguments', queryArguments),
  ];
}

let makeSub = (parameter) => {
  let dataId = Object.assign({}, myDataId);
  dataId.parameterName = parameter;
  return  [
    encode('dc.dataControllerUtils.Header', { messageType: constants.MESSAGETYPE_TIMEBASED_SUBSCRIPTION }),
    encode('dc.dataControllerUtils.String', { string: dataId.parameterName }),
    encode('dc.dataControllerUtils.DataId', dataId),
    encode('dc.dataControllerUtils.Action', { action: constants.SUBSCRIPTIONACTION_ADD }),
  ]
}

let makeUnsub = (parameter) => {
  let dataId = Object.assign({}, myDataId);
  dataId.parameterName = parameter;
  return  [
    encode('dc.dataControllerUtils.Header', { messageType: constants.MESSAGETYPE_TIMEBASED_SUBSCRIPTION }),
    encode('dc.dataControllerUtils.String', { string: dataId.parameterName }),
    encode('dc.dataControllerUtils.DataId', dataId),
    encode('dc.dataControllerUtils.Action', { action: constants.SUBSCRIPTIONACTION_DELETE }),
  ]
}

let allSubs = ParameterNames.map(makeSub);
let allUnsubs = ParameterNames.map(makeUnsub);
let allQueries = ParameterNames.map(makeQueries);
//console.log(allSubs);


// timebased subscription start
const sessionTimeQueryMessage = [
  encode('dc.dataControllerUtils.Header', { messageType: constants.MESSAGETYPE_SESSION_TIME_QUERY }),
  encode('dc.dataControllerUtils.String', { string: myQueryId }),
  encode('dc.dataControllerUtils.SessionGetTime', { id : 1 }),
];

// timebased subscription start
const sessionMasterQueryMessage = [
  encode('dc.dataControllerUtils.Header', { messageType: constants.MESSAGETYPE_SESSION_MASTER_QUERY }),
  encode('dc.dataControllerUtils.String', { string: myQueryId }),
];

const logAttributes = [
    "1st paramemeter",
    "2nd parameter",
];

// timebased subscription start
const sendLogMessageArgs = [
  encode('dc.dataControllerUtils.Header', { messageType: constants.MESSAGETYPE_LOG_SEND }),
  encode('dc.dataControllerUtils.String', { string: myQueryId }),
  encode('dc.dataControllerUtils.SendLog', { uid : 3401, arguments : logAttributes }),
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

// timebased subscription stop
const documentCreateQueryMessageArgs = [
  encode('dc.dataControllerUtils.Header', { messageType: constants.MESSAGETYPE_FMD_CREATE_DOCUMENT_QUERY}),
  encode('dc.dataControllerUtils.String', { string: myOtherQueryId }),
  encode('dc.dataControllerUtils.FMDCreateDocument', createDocumentProto("HistoryViewTest42.vihv")),
];


const makeDocumentGetQueryMessageArgs = oid => [
  encode('dc.dataControllerUtils.Header', { messageType: constants.MESSAGETYPE_FMD_GET_QUERY}),
  encode('dc.dataControllerUtils.String', { string: myOtherQueryId }),
  encode('dc.dataControllerUtils.FMDGet',  { serializedOid : oid }),
];

// document get from an oid example.
const documentGetQueryMessageArgs = makeDocumentGetQueryMessageArgs('0067000801000000010000000000000404');



// SESSION MASTER TEST
const sessionMasterTest =
  (callback) => {
    console.log('> Test Get session master');
    createZmqConnection(callback, sessionMasterDataHandler);
    sendZmqMessage(sessionMasterQueryMessage);
  };

// SESSION TIME TEST
const sessionTimeTest =
  (callback) => {
    console.log('> Test Get session time');
    createZmqConnection(callback, sessionTimeDataHandler);
    sendZmqMessage(sessionTimeQueryMessage);
  };

// SESSION TIME TEST
const sendLogTest =
    (callback) => {
      console.log('> Test log');
      // no handler for log (no response from DC)
      createZmqConnection(callback, undefined);
      sendZmqMessage(sendLogMessageArgs);
    };


// DOCUMENT CREATE TEST
const documentCreateTest =
  (callback) => {
    console.log('> Test Document create');
    createZmqConnection(callback, documentCreatePullHandler);
    sendZmqMessage(documentCreateQueryMessageArgs);
  };

// DOMAIN TEST
const documentGetTest =
  (callback) => {
    console.log('> Test Document get');
    createZmqConnection(callback, documentGetPullHandler);
    sendZmqMessage(documentGetQueryMessageArgs);
  };


// Oid of the document to get, filename to check on the gotten document
const getAndCheckFilename = (oid,filename) => {
    console.log('getAndCheckFilename');
    createZmqConnection( () => undefined, documentGetPullHandler(filename));
    sendZmqMessage(makeDocumentGetQueryMessageArgs(oid));
}

  // DOMAIN TEST
const documentCreateAndGetTest =
  (callback) => {
    console.log('> Test Document create and get');

    let fileName = "HistoryViewCreated.vihv";
    const documentCreateQueryMessageArgs = [
      encode('dc.dataControllerUtils.Header', { messageType: constants.MESSAGETYPE_FMD_CREATE_DOCUMENT_QUERY}),
      encode('dc.dataControllerUtils.String', { string: myOtherQueryId }),
      encode('dc.dataControllerUtils.FMDCreateDocument', createDocumentProto(fileName)),
    ];

    // after reception of Create data from DC, wait 2 seconds, and send a "Get" message on oid created.
    createZmqConnection(callback, documentCreatePullHandler(oid => setTimeout(() => getAndCheckFilename(oid,fileName), 2000)));
    sendZmqMessage(documentCreateQueryMessageArgs);
  };


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

// ARCHIVE TEST
const archiveTest =
  (callback) => {
    console.log('> Test Archive');
    createZmqConnection(callback, archiveDataPullHandler);
    // setInterval(() =>  allQueries.map((query) => sendZmqMessage(query)), 2000);
    allQueries.map((query) => sendZmqMessage(query))
    // sendZmqMessage(allQueries[0]);
  };
// PUBSUB TEST
const pubSubTest =
  (callback) => {
    console.log('> Test PubSub');
    createZmqConnection(callback, pubSubDataPullHandler);
    allSubs.map((sub) => sendZmqMessage(sub));
    // setInterval(() =>  allUnsubs.map((query) => sendZmqMessage(query)), 2000);
    // setTimeout(() => setInterval(() =>  allSubs.map((query) => sendZmqMessage(query)), 2000), 1000);
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

const options = {
  boolean: ['d', 'p', 'a', 's', 'f', 'all', 't', 'w', "dc", "dg", "st", "log", "sm", "dcg"],
  default: {
    all: true,
    dcg : false,
    dc: false,
    dg: false,
    st: false,
    log: false,
    sm: false,
    d: false,
    p: false,
    a: false,
    t: false,
    s: false,
    w: false,
    f: false,
  },
  alias: {
    dcg : 'documentCreateGet',
    dc : 'documentcreate',
    dg : 'documentget',
    st: 'sessiontime',
    log: 'sendLog',
    sm: 'sessionmaster',
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


if (argv.dcg) {
  argv.all = false;
  testFunctions.push(documentCreateAndGetTest);
}

if (argv.domains) {
  argv.all = false;
  testFunctions.push(domainTest);
}
if (argv.dc) {
  argv.all = false;
  testFunctions.push(documentCreateTest);
}
if (argv.dg) {
  argv.all = false;
  testFunctions.push(documentGetTest);
}

if (argv.log) {
  argv.all = false;
  testFunctions.push(sendLogTest);
}

if (argv.st) {
  argv.all = false;
  testFunctions.push(sessionTimeTest);
}

if (argv.sm) {
  argv.all = false;
  testFunctions.push(sessionMasterTest);
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

if (argv.trash) {
  argv.all = false;
  testFunctions = [trashTest];
}


if (argv.all) {
  testFunctions = [];
  testFunctions.push(domainTest);
  testFunctions.push(sessionTest);
  testFunctions.push(archiveTest);
  // these tests pubsub tests are problematic when executing all test, because they wait for a first
  // data answer that might never come.

  // testFunctions.push(pubSubTest);
  // testFunctions.push(pubSubWholeTest);
  testFunctions.push(documentCreateTest);
  testFunctions.push(documentGetTest);
}


async.series(testFunctions, (err) => {
  if (err) {
    console.log(err.message);
  }
});
