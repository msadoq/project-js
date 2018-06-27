// import encoding from 'text-encoding';
const logger = require('../../../common/logManager')('controllers/PUS/utils');
// const decoder = new encoding.TextDecoder();
const { decode } = require('../../../utils/adapters');
const { getStore } = require('../../store');
const { add: addMessage } = require('../../../store/actions/messages');
const constants = require('../../../constants');

const onCompare = require('./onCompare');
const pusController = require('./pusController');
const onPubSubData = require('./onPubSubData');

const controllers = {
  [constants.PUS_ON_COMPARE]: onCompare,
  [constants.PUS_ON_INITIALIZE]: (args) => {
    pusController(args, getStore);
  },
  [constants.PUS_ON_PUBSUB]: onPubSubData,
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
