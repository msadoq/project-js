// import encoding from 'text-encoding';
const logger = require('../../../common/logManager')('controllers/PUS/utils');
// const decoder = new encoding.TextDecoder();
const { decode } = require('../../../utils/adapters');
const { getStore } = require('../../store');
const { add: addMessage } = require('../../../store/actions/messages');
const constants = require('../../../constants');

const pusController = require('./pusController');

const controllers = {
  [constants.PUS_DATA]: (args) => {
    pusController(args, getStore);
  },
};

module.exports = function pusActorController() {
  // eslint-disable-next-line prefer-rest-params, "DV6 TBC_CNES LPISIS Avoid 'Maximum call stack size exceeded' with rest operators and .apply() usage"
  const args = arguments;
  // args[0] trash

  const headerBuffer = args[0];
  const buffers = Array.prototype.slice.call(args, 1);

  try {
    const { method } = decode('pusActor.pusUtils.PusHeader', headerBuffer);
    if (method === undefined || method === null) {
      return logger.warn('invalid message received (no messageType)');
    }
    const fn = controllers[method];
    if (!fn) {
      return logger.warn(`invalid message received (unknown messageType) '${method}'`);
    }
    return fn(buffers);
  } catch (e) {
    getStore().dispatch(addMessage('global', 'warning',
      'error on processing header buffer '.concat(e)));
    return logger.error('error on processing header buffer '.concat(e));
  }
};
