const parameters = require('../common/configurationManager');
const async = require('async');
const parseArgs = require('minimist');
const _each = require('lodash/each');
const _chunk = require('lodash/chunk');
const _slice = require('lodash/slice');
const zmq = require('common/zmq/index');
const { encode, decode } = require('../utils/adapters');
const constants = require('../constants');

const sessionIdTest = 1;
const domainIdTest = 4;
const myQueryId = 'myQueryId';
const myOtherQueryId = 'myOtherQueryId';

// eslint-disable-next-line no-console, "DV6 TBC_CNES Integration test file, output on console"
const logger = (...args) => console.log(...args);

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
      url: parameters.get('ZMQ_GPCCDC_PULL'),
      handler: (...args) => pullHandler(callback, ...args),
    },
    dcPush: {
      type: 'push',
      role: 'client',
      url: parameters.get('ZMQ_GPCCDC_PUSH'),
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
  logger('receiving trash from utils');
  if (trashFlag) {
    logger('...end test');
  }
  zmq.closeSockets();
  callback(null);
};

// DOMAIN DATA
const domainDataPullHandler = (callback, trash, headerBuffer, ...argsBuffers) => {
  logger('receiving a message from utils');
  const header = decode('dc.dataControllerUtils.Header', headerBuffer);
  expect(header.messageType).toBe(constants.MESSAGETYPE_DOMAIN_DATA);
  const queryId = decode('dc.dataControllerUtils.String', argsBuffers[0]).string;
  expect(queryId).toBe(myQueryId);
  expect(() => decode('dc.dataControllerUtils.Domains', argsBuffers[1])).not.toThrowError();
  zmq.closeSockets();
  logger('...end test');
  callback(null);
};

// SESSION DATA
const sessionDataPullHandler = (callback, trash, headerBuffer, ...argsBuffers) => {
  logger('receiving a message from utils');
  logger();
  const header = decode('dc.dataControllerUtils.Header', headerBuffer);
  expect(header.messageType).toBe(constants.MESSAGETYPE_SESSION_DATA);
  const queryId = decode('dc.dataControllerUtils.String', argsBuffers[0]).string;
  expect(queryId).toBe(myQueryId);
  expect(() => decode('dc.dataControllerUtils.Sessions', argsBuffers[1])).not.toThrowError();
  zmq.closeSockets();
  logger('...end test');
  callback(null);
};

// ARCHIVE DATA
const archiveDataPullHandler = (callback, trash, headerBuffer, ...argsBuffers) => {
  logger('receiving a message from utils');
  logger(step);
  switch (step) {
    case steps.RESPONSE:
      {
        const header = decode('dc.dataControllerUtils.Header', headerBuffer);
        expect(header.messageType).toBe(constants.MESSAGETYPE_RESPONSE);
        const queryId = decode('dc.dataControllerUtils.String', argsBuffers[0]).string;
        expect(queryId).toBe(myQueryId);
        expect(decode('dc.dataControllerUtils.Status', argsBuffers[1]).status).toBe(constants.STATUS_SUCCESS);
        step = steps.ARCHIVE_DATA;
        break;
      }
    case steps.ARCHIVE_DATA:
      {
        const header = decode('dc.dataControllerUtils.Header', headerBuffer);
        logger(header);
        if (header.messageType === constants.MESSAGETYPE_TIMEBASED_ARCHIVE_DATA) {
          expect(() => decode('dc.dataControllerUtils.String', argsBuffers[0])).not.toThrowError();
          const dataId = decode('dc.dataControllerUtils.DataId', argsBuffers[1]);
          const isLast = decode('dc.dataControllerUtils.Boolean', argsBuffers[2]).boolean;
          expect(_slice(argsBuffers, 3).length % 2).toBe(0);
          _each(_chunk(_slice(argsBuffers, 3), 2), (argBuffer) => {
            expect(() => decode('dc.dataControllerUtils.Timestamp', argBuffer[0])).not.toThrowError();
            expect(() => decode(dataId.comObject, argBuffer[1])).not.toThrowError();
          });
          step = (isLast === true) ? steps.STOP : step;
        }
        break;
      }
    default:
  }
  if (step === steps.STOP) {
    zmq.closeSockets();
    logger('...end test');
    callback(null);
  } else {
    logger('waiting for a next message (archive)');
  }
};

const documentCreatePullHandler = (onOidCreated = () => undefined) =>
  (callback, trash, headerBuffer, ...argsBuffers) => {
    const header = decode('dc.dataControllerUtils.Header', headerBuffer);
    expect(header.messageType).toBe(constants.MESSAGETYPE_FMD_CREATE_DATA);
    const [queryId, status, fmdFileInfoOrReason] = argsBuffers;
    expect(decode('dc.dataControllerUtils.String', queryId)).toBeDefined();
    const statusPb = decode('dc.dataControllerUtils.Status', status);
    if (statusPb.status === constants.STATUS_ERROR) {
      const reasonPb = decode('dc.dataControllerUtils.String', fmdFileInfoOrReason);
      logger('documentCreatePullHandler error from create : ', reasonPb.string);
    } else {
      const fileInfoPb = decode('dc.dataControllerUtils.FMDFileInfo', fmdFileInfoOrReason);
      logger(fileInfoPb);
      onOidCreated(fileInfoPb.serializedOid);
    }
    zmq.closeSockets();
  };


const documentGetPullHandler = (waitedFilename = undefined) =>
  (callback, trash, headerBuffer, ...argsBuffers) => {
    const header = decode('dc.dataControllerUtils.Header', headerBuffer);
    expect(header.messageType).toBe(constants.MESSAGETYPE_FMD_GET_DATA);
    const [queryId, status, fmdFileInfoOrReason, documentData] = argsBuffers;
    expect(decode('dc.dataControllerUtils.String', queryId)).toBeDefined();
    const statusPb = decode('dc.dataControllerUtils.Status', status);
    if (statusPb.status === constants.STATUS_ERROR) {
      const reasonPb = decode('dc.dataControllerUtils.String', fmdFileInfoOrReason);
      logger('documentGetPullHandler error from get : ', reasonPb.string);
    } else {
      const fileInfoPb = decode('dc.dataControllerUtils.FMDFileInfo', fmdFileInfoOrReason);
      switch (fileInfoPb.type) {
        case constants.FILE_TYPE_DOCUMENT:
          {
            const documentDataPb = decode('lpisis.file.Document', documentData);
            logger(documentDataPb);
            if (typeof waitedFilename !== 'undefined') {
              expect(documentDataPb.basename.value).toBe(waitedFilename);
            }
          }
          break;
        default:
          break;
      }
    }
    zmq.closeSockets();
  };

const sessionMasterDataHandler = (callback, trash, headerBuffer, ...argsBuffers) => {
  logger('sessionMasterDataHandler');
  logger(decode('lpisis.ccsds_mal.UINTEGER', argsBuffers[1]));
  expect(() => decode('lpisis.ccsds_mal.uinteUINTEGERger', argsBuffers[1])).not.toThrowError();
  zmq.closeSockets();
};

let congestionReceived = false;

// First, a CONGESTION message should be received, then, a HEALTHY message should be received.
const congestionDataPullHandler = (onCongestionReceived = () => undefined) =>
  (callback, trash, headerBuffer, ...argsBuffers) => {
    const header = decode('dc.dataControllerUtils.Header', headerBuffer);

    if (congestionReceived) {
      switch (header.messageType) {
        case constants.MESSAGETYPE_DC_STATUS:
          {
            const dcStatus = decode('dc.dataControllerUtils.DcStatus', argsBuffers[0]);
            logger('switched to Healthy ');
            expect(dcStatus.status).toBe(constants.HEALTH_STATUS_HEALTHY);
            onCongestionReceived(false);
            congestionReceived = false;
            break;
          }
        default:
          break;
      }
      return;
    }
    switch (header.messageType) {
      case constants.MESSAGETYPE_DC_STATUS:
        {
          const dcStatus = decode('dc.dataControllerUtils.DcStatus', argsBuffers[0]);
          logger('switched to congestion ');
          expect(dcStatus.status).toBe(constants.HEALTH_STATUS_CRITICAL);
          onCongestionReceived(true);
          congestionReceived = true;
        }
        break;
      default:
        break;
    }
  };

const sessionTimeDataHandler = (callback, trash, headerBuffer, ...argsBuffers) => {
  logger(decode('dc.dataControllerUtils.Timestamp', argsBuffers[1]));
  expect(() => decode('dc.dataControllerUtils.Timestamp', argsBuffers[1])).not.toThrowError();
  zmq.closeSockets();
};

const now = Date.now();
const ts1 = { ms: now }; /* 1430810001000 */
const ts2 = { ms: now + 1000 }; /* 1430820001000 */
const timeInterval = {
  startTime: ts1,
  endTime: ts2,
};

// All supsup parameters
const ParameterNames = [
  'STAT_SU_PID',
  'STAT_SU_COMM',
  'STAT_SU_STATE',
  'STAT_SU_PPID',
  'STAT_SU_PGRP',
  'STAT_SU_SESSION',
  'STAT_SU_TTY_NR',
  'STAT_SU_TPGID',
  'STAT_SU_FLAGS',
  'STAT_SU_MINFLT',
  'STAT_SU_CMINFLT',
  'STAT_SU_MAJFLT',
  'STAT_SU_CMAJFLT',
  'STAT_SU_UTIME',
  'STAT_SU_STIME',
  'STAT_SU_CUTIME',
  'STAT_SU_CSTIME',
  'STAT_SU_PRIORITY',
  'STAT_SU_NICE',
  'STAT_SU_NUM_THREADS',
  'STAT_SU_ITREALVALUE',
  'STAT_SU_STARTTIME',
  'STAT_SU_VSIZE',
  'STAT_SU_RSS',
  'STAT_SU_RSSLIM',
  'STAT_SU_STARTCODE',
  'STAT_SU_ENDCODE',
  'STAT_SU_STARTSTACK',
  'STAT_SU_KSTKESP',
  'STAT_SU_KSTKEIP',
  'STAT_SU_SIGNAL',
  'STAT_SU_BLOCKED',
  'STAT_SU_SIGIGNORE',
  'STAT_SU_SIGCATCH',
  'STAT_SU_WCHAN',
  'STAT_SU_NSWAP',
  'STAT_SU_CNSWAP',
  'STAT_SU_EXIT_SIGNAL',
  'STAT_SU_PROCESSOR',
  'STAT_SU_RT_PRIORITY',
  'STAT_SU_POLICY',
  'STAT_SU_DELAYACCT_BLKIO_T',
  'STAT_SU_GUEST_TIME',
  'STAT_SU_CGUEST_TIME',
  'STAT_SU_START_DATA',
  'STAT_SU_END_DATA',
  'STAT_SU_START_BRK',
  'STAT_SU_ARG_START',
  'STAT_SU_ARG_END',
  'STAT_SU_ENV_START',
  'STAT_SU_ENV_END',
  'STAT_SU_EXIT_CODE',
];


const createDocumentProto = filename => ({
  name: filename,
  path: '/',
  mimeType: 'HistoryViewDoc',
  domainId: 1,
});


const myDataId = {
  parameterName: 'STAT_SU_ENV_END',
  catalog: 'Reporting',
  comObject: 'ReportingParameter',
  sessionId: sessionIdTest, // TODO type is currently uint32, should be uint16 (bytes)
  domainId: domainIdTest,  // TODO type is currently uint32, should be uint16 (bytes)
};

// const myTcId = {
//   comObject: 'TCHistory',
//   sessionId: sessionIdTest, // TODO type is currently uint32, should be uint16 (bytes)
//   domainId: domainIdTest,  // TODO type is currently uint32, should be uint16 (bytes)
// };

const myComObjectDataId = {
  comObject: 'IsisAggregation',
  sessionId: sessionIdTest,
  domainId: domainIdTest,
};


// const dataIdWithTypo = {
//   parameterName: 'ATT_BC_STR1VOLAGE',      // typo error on parameterName
//   catalog: 'Reporting',
//   comObject: 'ReportingParameter',
//   sessionId: sessionIdTest,
//   domainId: 1,
//   url: 'theUrl',
//   version: 'theVersion',
// };


// // timebased query
// const tbQueryMessageArgs = [
//   encode('utils.dataControllerUtils.Header',
//      { messageType: constants.MESSAGETYPE_TIMEBASED_QUERY }),
//   encode('utils.dataControllerUtils.String', { string: myQueryId }),
//   encode('utils.dataControllerUtils.DataId', myDataId),
//   encode('utils.dataControllerUtils.TimeInterval', timeInterval),
//   encode('utils.dataControllerUtils.QueryArguments', queryArguments),
// ];

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


const makeQueries = (parameter) => {
  const dataId = Object.assign({}, myDataId);
  dataId.parameterName = parameter;
  // logger(dataId);
  return [
    encode('dc.dataControllerUtils.Header', { messageType: constants.MESSAGETYPE_TIMEBASED_QUERY }),
    encode('dc.dataControllerUtils.String', { string: myQueryId }),
    encode('dc.dataControllerUtils.DataId', dataId),
    encode('dc.dataControllerUtils.TimeInterval', timeInterval),
    encode('dc.dataControllerUtils.QueryArguments', queryArguments),
  ];
};

const makeSub = (parameter) => {
  const dataId = Object.assign({}, myDataId);
  dataId.parameterName = parameter;
  return [
    encode('dc.dataControllerUtils.Header', { messageType: constants.MESSAGETYPE_TIMEBASED_SUBSCRIPTION }),
    encode('dc.dataControllerUtils.String', { string: dataId.parameterName }),
    encode('dc.dataControllerUtils.DataId', dataId),
    encode('dc.dataControllerUtils.Action', { action: constants.SUBSCRIPTIONACTION_ADD }),
  ];
};

// const makeUnsub = (parameter) => {
//   const dataId = Object.assign({}, myDataId);
//   dataId.parameterName = parameter;
//   return [
//     encode('utils.dataControllerUtils.Header',
//       { messageType: constants.MESSAGETYPE_TIMEBASED_SUBSCRIPTION }),
//     encode('utils.dataControllerUtils.String', { string: dataId.parameterName }),
//     encode('utils.dataControllerUtils.DataId', dataId),
//     encode('utils.dataControllerUtils.Action', { action: constants.SUBSCRIPTIONACTION_DELETE }),
//   ];
// };

const allSubs = ParameterNames.map(makeSub);
// const allUnsubs = ParameterNames.map(makeUnsub);
const allQueries = ParameterNames.map(makeQueries);
// logger(allSubs);


// timebased subscription start
const sessionTimeQueryMessage = [
  encode('dc.dataControllerUtils.Header', { messageType: constants.MESSAGETYPE_SESSION_TIME_QUERY }),
  encode('dc.dataControllerUtils.String', { string: myQueryId }),
  encode('dc.dataControllerUtils.SessionGetTime', { id: 1 }),
];

// timebased subscription start
const sessionMasterQueryMessage = [
  encode('dc.dataControllerUtils.Header', { messageType: constants.MESSAGETYPE_SESSION_MASTER_QUERY }),
  encode('dc.dataControllerUtils.String', { string: myQueryId }),
];

const logAttributes = [
  '1st paramemeter',
  '2nd parameter',
];

// timebased subscription start
const sendLogMessageArgs = [
  encode('dc.dataControllerUtils.Header', { messageType: constants.MESSAGETYPE_LOG_SEND }),
  encode('dc.dataControllerUtils.String', { string: myQueryId }),
  encode('dc.dataControllerUtils.SendLog', { uid: 3401, arguments: logAttributes }),
];


// // timebased subscription start
// const tbStartSubMessageArgs = [
//   encode('utils.dataControllerUtils.Header',
//     { messageType: constants.MESSAGETYPE_TIMEBASED_SUBSCRIPTION }),
//   encode('utils.dataControllerUtils.String', { string: myQueryId }),
//   encode('utils.dataControllerUtils.DataId', myDataId),
//   encode('utils.dataControllerUtils.Action', { action: constants.SUBSCRIPTIONACTION_ADD }),
// ];

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
  encode('dc.dataControllerUtils.Header', { messageType: constants.MESSAGETYPE_FMD_CREATE_DOCUMENT_QUERY }),
  encode('dc.dataControllerUtils.String', { string: myOtherQueryId }),
  encode('dc.dataControllerUtils.FMDCreateDocument', createDocumentProto('HistoryViewTest42.vihv')),
];


const makeDocumentGetQueryMessageArgs = oid => [
  encode('dc.dataControllerUtils.Header', { messageType: constants.MESSAGETYPE_FMD_GET_QUERY }),
  encode('dc.dataControllerUtils.String', { string: myOtherQueryId }),
  encode('dc.dataControllerUtils.FMDGet', { serializedOid: oid }),
];

// document get from an oid example.
const documentGetQueryMessageArgs = makeDocumentGetQueryMessageArgs('0067000801000000010000000000000404');

// START PUBSUB DATA
const pubSubDataPullHandler = (callback, trash, headerBuffer, ...argsBuffers) => {
  logger('receiving a message from utils');
  logger(step);
  switch (step) {
    case steps.RESPONSE: {
      const header = decode('dc.dataControllerUtils.Header', headerBuffer);
      expect(header.messageType).toBe(constants.MESSAGETYPE_RESPONSE);
      expect(decode('dc.dataControllerUtils.String', argsBuffers[0]).string).toBeDefined();
      // TODO give myQueryId as argument to the pull handler.
      // queryId.should.equal(myQueryId);
      expect(decode('dc.dataControllerUtils.Status', argsBuffers[1]).status).toBe(constants.STATUS_SUCCESS);
      step = steps.PUBSUB_DATA;
      break;
    }
    case steps.PUBSUB_DATA: {
      logger(headerBuffer);
      if (headerBuffer.length === 0) {
        step = steps.PUBSUB_DATA;
        break;
      }
      const header = decode('dc.dataControllerUtils.Header', headerBuffer);
      expect(header.messageType).be.oneOf([
        constants.MESSAGETYPE_TIMEBASED_PUBSUB_DATA,
        constants.MESSAGETYPE_RESPONSE,
      ]);
      if (header.messageType === constants.MESSAGETYPE_TIMEBASED_PUBSUB_DATA) {
        expect(() => decode('dc.dataControllerUtils.String', argsBuffers[0])).not.toThrowError();
        const dataId = decode('dc.dataControllerUtils.DataId', argsBuffers[1]);
        if (dataId.catalog) {
          expect(dataId).have.properties(myDataId);
        } else {
          expect(dataId).have.properties(myComObjectDataId);
        }
        // (_slice(argsBuffers, 2).length % 2).should.equal(0);
        _each(_chunk(_slice(argsBuffers, 2), 2), (argBuffer) => {
          expect(() => decode('dc.dataControllerUtils.Timestamp', argBuffer[0])).not.toThrowError();
          expect(() => decode(dataId.comObject, argBuffer[1])).not.toThrowError();
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
    logger('...end test');
    callback(null);
  } else {
    logger('waiting for a next message (pubsub)');
  }
};

// SESSION MASTER TEST
const sessionMasterTest =
  (callback) => {
    logger('> Test Get session master');
    createZmqConnection(callback, sessionMasterDataHandler);
    sendZmqMessage(sessionMasterQueryMessage);
  };

// SESSION TIME TEST
const sessionTimeTest =
  (callback) => {
    logger('> Test Get session time');
    createZmqConnection(callback, sessionTimeDataHandler);
    sendZmqMessage(sessionTimeQueryMessage);
  };

// SESSION TIME TEST
const sendLogTest =
    (callback) => {
      logger('> Test log');
      // no handler for log (no response from DC)
      createZmqConnection(callback, undefined);
      sendZmqMessage(sendLogMessageArgs);
    };


// DOCUMENT CREATE TEST
const documentCreateTest =
  (callback) => {
    logger('> Test Document create');
    createZmqConnection(callback, documentCreatePullHandler);
    sendZmqMessage(documentCreateQueryMessageArgs);
  };

// DOMAIN TEST
const documentGetTest =
  (callback) => {
    logger('> Test Document get');
    createZmqConnection(callback, documentGetPullHandler);
    sendZmqMessage(documentGetQueryMessageArgs);
  };


// Oid of the document to get, filename to check on the gotten document
const getAndCheckFilename = (oid, filename) => {
  logger('getAndCheckFilename');
  createZmqConnection(() => undefined, documentGetPullHandler(filename));
  sendZmqMessage(makeDocumentGetQueryMessageArgs(oid));
};

  // DOMAIN TEST
const documentCreateAndGetTest =
  (callback) => {
    logger('> Test Document create and get');

    const fileName = 'Poulette3.vihv';
    const documentCreateQueryMessageArgs2 = [
      encode('dc.dataControllerUtils.Header', { messageType: constants.MESSAGETYPE_FMD_CREATE_DOCUMENT_QUERY }),
      encode('dc.dataControllerUtils.String', { string: myOtherQueryId }),
      encode('dc.dataControllerUtils.FMDCreateDocument', createDocumentProto(fileName)),
    ];

    // after reception of Create data from DC, wait 2 seconds,
    // and send a 'Get' message on oid created.
    createZmqConnection(callback,
      documentCreatePullHandler(oid => setTimeout(() => getAndCheckFilename(oid, fileName), 2000)));
    sendZmqMessage(documentCreateQueryMessageArgs2);
  };

// Principle : try to overwelm GPCCDC with queries, the Handler then calls a callback when
// GPCCDC sends a Congestion message.
const congestionTest =
  (callback) => {
    logger('> Test Congestion');

    // Variable that is set on congestionDataPullHandler callback when receiving congestion msg.
    let isCongested = false;
    createZmqConnection(callback, congestionDataPullHandler((isCong) => {
      isCongested = isCong;
    }));

    // Send 52 request at 10hz. Don't send any queries when UNHEALTHY.
    setInterval(() => {
      if (!isCongested) {
        allQueries.map(query => sendZmqMessage(query));
      }
    }, 10);
    // const id = setInterval(() => {
    // if (!isCongested) { allQueries.map((query) => sendZmqMessage(query))} else clearInterval(id)
    // }, 100);
  };

// DOMAIN TEST
const domainTest =
  (callback) => {
    logger('> Test Domain');
    createZmqConnection(callback, domainDataPullHandler);
    sendZmqMessage(domainQueryMessageArgs);
  };
// SESSION TEST
const sessionTest =
  (callback) => {
    logger('> Test Session');
    createZmqConnection(callback, sessionDataPullHandler);
    sendZmqMessage(sessionQueryMessageArgs);
  };

// ARCHIVE TEST
const archiveTest =
  (callback) => {
    logger('> Test Archive');
    createZmqConnection(callback, archiveDataPullHandler);
    // setInterval(() =>  allQueries.map((query) => sendZmqMessage(query)), 2000);
    sendZmqMessage(allQueries[0]);
    // allQueries.map((query) => sendZmqMessage(query))
    // sendZmqMessage(allQueries[0]);
  };
// PUBSUB TEST
const pubSubTest =
  (callback) => {
    logger('> Test PubSub');
    createZmqConnection(callback, pubSubDataPullHandler);
    allSubs.map(sub => sendZmqMessage(sub));
    // setInterval(() =>  allUnsubs.map((query) => sendZmqMessage(query)), 2000);
    // setTimeout(() => setInterval(() =>
    // allSubs.map((query) => sendZmqMessage(query)), 2000), 1000);
  };
// PUBSUB WHOLE COM OBJECT TEST
const pubSubWholeTest =
  (callback) => {
    logger('> Test PubSub Whole Com Object');
    createZmqConnection(callback, pubSubDataPullHandler);
    sendZmqMessage(tbStartWholeComObjectSubMessageArgs);
  };
// TRASH TEST
const trashTest =
  (callback) => {
    logger('> Trash Test');
    createZmqConnection(callback, trashPullHandler);
    setTimeout(() => {
      trashFlag = false;
    }, 2000);
  };


let testFunctions = [];

const options = {
  boolean: ['d', 'p', 'a', 's', 'f', 'all', 't', 'w', 'dc', 'dg', 'st', 'log', 'sm', 'dcg', 'cgn'],
  default: {
    all: true,
    cgn: false,
    dcg: false,
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
    dcg: 'documentCreateGet',
    cgn: 'congestion',
    dc: 'documentcreate',
    dg: 'documentget',
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
if (argv.cgn) {
  argv.all = false;
  testFunctions.push(congestionTest);
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
logger('Closing existing sockets');
zmq.closeSockets();

async.series(testFunctions, (err) => {
  if (err) {
    logger(err.message);
  }
});
