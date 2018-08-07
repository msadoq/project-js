// import encoding from 'text-encoding';
const logger = require('../../../common/logManager')('controllers/PUS/utils');
// const decoder = new encoding.TextDecoder();
const { decode } = require('../../../utils/adapters');
const { getStore } = require('../../store');
const { add: addMessage } = require('../../../store/actions/messages');
const constants = require('../../../constants');

const { onPusData } = require('./pusController');

const controllers = {
  [constants.PUS_DATA]: (messageData, pusService) => {
    onPusData(messageData, pusService, getStore);
  },
};

module.exports = function pusActorController() {
  // eslint-disable-next-line prefer-rest-params, "DV6 TBC_CNES LPISIS Avoid 'Maximum call stack size exceeded' with rest operators and .apply() usage"
  const args = arguments;

  const headerBuffer = args[0];
  const messageData = args[1];

  try {
    const { messageType, pusService } = decode('isis.pusModelEditorMessages.HeaderStructure', headerBuffer);
    if (messageType.value === undefined || messageType.value === null) {
      return logger.warn('invalid message received (no messageType)');
    }
    const fn = controllers[messageType.value];
    if (!fn) {
      return logger.warn(`invalid message received (unknown messageType) '${messageType.value}'`);
    }
    return fn(messageData, pusService.value);
  } catch (e) {
    getStore().dispatch(addMessage('global', 'warning',
      'error on processing header buffer '.concat(e)));
    return logger.error('error on processing header buffer '.concat(e));
  }
};
