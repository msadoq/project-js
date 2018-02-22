// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move DC stub code in client/lib/stubProcess
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move serverProcess code one level upper
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move common/constants/ in client/ folder
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Cleanup client/ file organization and test helper modules
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : FA : #6798 : 15/06/2017 : Merge branch 'dev' into pgaucher-464-proto-config
// VERSION : 1.1.2 : FA : #6798 : 15/06/2017 : Modify protobuf loading strategy : - Move adapters in another folder - New architecture generated for adapters folder - Add raw adapter mechanism
// VERSION : 1.1.2 : DM : #6700 : 27/06/2017 : Add realTimeHandler and goNowHandler in player middleware
// VERSION : 1.1.2 : FA : #6798 : 27/06/2017 : branch 'dev' into pgaucher-464-proto-config
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Fix "Maximum call stack exceeded" due to ES6 transpilation of rest operator in function arguments that use .apply() in ES5
// VERSION : 1.1.2 : FA : #7145 : 26/07/2017 : [FT:#7145] Add refactoring comments in ipc and controllers (main, server, renderer)
// VERSION : 1.1.2 : DM : #6700 : 01/08/2017 : Code robustness : ensure that there is a request for a given queryId in singleton
// VERSION : 1.1.2 : DM : #6700 : 01/08/2017 : Branch full cycle mechanism for rangeData
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : #7145 : 03/08/2017 : Refacto onFmdCreateData and onFmdGetData dc controllers
// VERSION : 1.1.2 : DM : #6700 : 04/08/2017 : Add PubSubController and retrieveLast/Range update
// VERSION : 1.1.2 : DM : #6700 : 17/08/2017 : Major changes : all data consumption is now plugged
// VERSION : 1.1.2 : DM : #6700 : 18/08/2017 : Update multiple test and implementation
// VERSION : 1.1.2 : DM : #6700 : 21/08/2017 : Modify controllers error due to previous merge
// VERSION : 1.1.2 : DM : #6700 : 21/08/2017 : branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : #7578 : 23/08/2017 : Add throttle mechanism to pubSubController
// VERSION : 1.1.2 : DM : #6700 : 25/08/2017 : Add throttle timing in configuration .
// END-HISTORY
// ====================================================================

import { get as getConf } from 'common/configurationManager';

const { decode } = require('../../../utils/adapters');
const logger = require('../../../common/logManager')('controllers/utils');
const constants = require('../../../constants');

const onResponse = require('./v1/onResponse');
const onDomainsData = require('./v1/onDomainsData');
const onSessionsData = require('./v1/onSessionsData');
const onFmdCreateData = require('./v1/onFmdCreateData');
const onFmdGetData = require('./v1/onFmdGetData');
const onSessionMasterData = require('./v1/onSessionMasterData');
const onSessionTimeData = require('./v1/onSessionTimeData');

const archiveController = require('./v1/archiveController');
const makePubSubController = require('./v1/pubSubController');

const onDomainsDataADE = require('./v2/onDomainsData');
const onSessionsDataADE = require('./v2/onSessionsData');
const onFmdCreateDataADE = require('./v2/onFmdCreateData');
const onFmdGetDataADE = require('./v2/onFmdGetData');
const onSessionMasterDataADE = require('./v2/onSessionMasterData');
const onSessionTimeDataADE = require('./v2/onSessionTimeData');
const onSDBQueryData = require('./v2/onSDBQueryData');
const archiveControllerADE = require('./v2/archiveController');
const makePubSubControllerADE = require('./v2/pubSubController');

const { add: addMessage } = require('../../../store/actions/messages');

const { get, remove } = require('../../models/registeredArchiveQueriesSingleton');
const { getStore } = require('../../store');

const pubSubController = makePubSubController(getConf('PUBSUB_THROTTLE_TIMING'));
const pubSubControllerADE = makePubSubControllerADE(getConf('PUBSUB_THROTTLE_TIMING'));
const versionDCComProtocol = getConf('VERSION_DC_COM_PROTOCOL');

const controllersV1 = {
  [constants.MESSAGETYPE_DOMAIN_DATA]: onDomainsData,
  [constants.MESSAGETYPE_RESPONSE]: onResponse,
  [constants.MESSAGETYPE_SESSION_DATA]: onSessionsData,
  [constants.MESSAGETYPE_TIMEBASED_ARCHIVE_DATA]: (args) => {
    archiveController(args, getStore, { get, remove });
  },
  [constants.MESSAGETYPE_TIMEBASED_PUBSUB_DATA]: (args) => {
    pubSubController(args, getStore);
  },
  [constants.MESSAGETYPE_FMD_CREATE_DATA]: onFmdCreateData,
  [constants.MESSAGETYPE_FMD_GET_DATA]: onFmdGetData,
  [constants.MESSAGETYPE_SESSION_MASTER_DATA]: onSessionMasterData,
  [constants.MESSAGETYPE_SESSION_TIME_DATA]: onSessionTimeData,
};

const controllersV2 = {
  [constants.ADE_DOMAIN_QUERY]: onDomainsDataADE, // Done
  // [constants.MESSAGETYPE_RESPONSE]: onResponseADE,
  [constants.ADE_SESSION]: onSessionsDataADE, // Done
  [constants.ADE_TIMEBASED_QUERY]: (buffers, requestId, isLast, isError) => {
    archiveControllerADE({ buffers, requestId, isLast, isError }, getStore, { get, remove });
  },
  [constants.ADE_TIMEBASED_SUBSCRIPTION]: (buffers, requestId, isLast, isError) => {
    pubSubControllerADE({ buffers, requestId, isLast, isError }, getStore);
  },
  [constants.ADE_FMD_CREATE_DOCUMENT]: onFmdCreateDataADE,
  [constants.ADE_FMD_GET]: onFmdGetDataADE,
  [constants.ADE_SESSION_MASTER]: onSessionMasterDataADE,
  [constants.ADE_SESSION_TIME]: onSessionTimeDataADE,
  [constants.ADE_SDB_QUERY]: onSDBQueryData,
};

const controllers = {
  [constants.DC_COM_V1]: {
    controller: controllersV1,
    decoder: buffer => decode('dc.dataControllerUtils.Header', buffer),
  },
  [constants.DC_COM_V2]: {
    controller: controllersV2,
    decoder: (buffer) => {
      const { method, requestId, isLast, isError } = decode('dc.dataControllerUtils.ADEHeader', buffer);
      return { messageType: method, requestId, isLast, isError };
    },
  },
};


module.exports = function dcController() {
  /**
   * Workaround: under the hood ES6 transpilation to ES5 replace rest operator with a .apply() call
   * a known issue cause a 'Maximum call stack size exceeded' when function receives thousands of
   * arguments.
   *
   * source: https://stackoverflow.com/questions/42263108/why-does-apply-with-too-many-arguments-throw-maximum-call-stack-size-exceeded
   */
    // eslint-disable-next-line prefer-rest-params, "DV6 TBC_CNES LPISIS Avoid 'Maximum call stack size exceeded' with rest operators and .apply() usage"
  const args = arguments;
  // args[0] trash

  const headerBuffer = args[1];
  const buffers = Array.prototype.slice.call(args, 2);

  try {
    const {
      messageType,
      requestId,
      isLast,
      isError } = controllers[versionDCComProtocol].decoder(headerBuffer);
    if (messageType === undefined || messageType === null) {
      return logger.warn('invalid message received (no messageType)');
    }
    if (isError) {
      const decodedError = decode('dc.dataControllerUtils.ADEError', args[2]);
      getStore().dispatch(addMessage('global', 'warning',
      'error on processing header buffer '.concat(decodedError.message)));
      return logger.error('error on processing header buffer '.concat(decodedError.message));
    }
    const fn = controllers[versionDCComProtocol].controller[messageType];
    if (!fn) {
      return logger.warn(`invalid message received (unknown messageType) '${messageType}'`);
    }
    logger.silly(`running '${messageType}'`);
    return fn(buffers, requestId, isLast);
  } catch (e) {
    getStore().dispatch(addMessage('global', 'warning',
      'error on processing header buffer '.concat(e)));
    return logger.error('error on processing header buffer '.concat(e));
  }
};
