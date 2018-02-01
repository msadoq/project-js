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

const onResponse = require('./onResponse');
const onDomainsData = require('./onDomainsData');
const onSessionsData = require('./onSessionsData');
const onFmdCreateData = require('./onFmdCreateData');
const onFmdGetData = require('./onFmdGetData');
const onSessionMasterData = require('./onSessionMasterData');
const onSessionTimeData = require('./onSessionTimeData');
const onDcStatus = require('./onDcStatus');

const archiveController = require('./archiveController');
const makePubSubController = require('./pubSubController');

const { add: addMessage } = require('../../../store/actions/messages');

const { get, remove } = require('../../models/registeredArchiveQueriesSingleton');
const { getStore } = require('../../store');

const pubSubController = makePubSubController(getConf('PUBSUB_THROTTLE_TIMING'));

const controllers = {
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
  [constants.MESSAGETYPE_DC_STATUS]: onDcStatus,
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
    const { messageType } = decode('dc.dataControllerUtils.Header', headerBuffer);
    if (!messageType) {
      return logger.warn('invalid message received (no messageType)');
    }
    const fn = controllers[messageType];
    if (!fn) {
      return logger.warning(`invalid message received (unknown messageType) '${messageType}'`);
    }

    logger.silly(`running '${messageType}'`);
    return fn(buffers);
  } catch (e) {
    getStore().dispatch(addMessage('global', 'warning',
      'error on processing header buffer '.concat(e)));
    return logger.error('error on processing header buffer', e);
  }
};
