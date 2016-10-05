const debug = require('../io/debug')('utils:subscriptions');
const { v4 } = require('node-uuid');
const registeredCallbacks = require('../utils/registeredCallbacks');
const { encode } = require('../protobuf');

const createSubscriptionMessage = (action, id, payload) => encode('dc.dataControllerUtils.DcClientMessage', {
  messageType: 'DATA_SUBSCRIBE',
  payload: encode('dc.dataControllerUtils.DataSubscribe', {
    action,
    id,
    dataId: {
      parameterName: payload.parameterName,
      catalog: payload.catalog,
      comObject: payload.comObject,
      sessionId: payload.sessionId,
      domainId: payload.domainId,
    },
  }),
});

const createAddSubscriptionMessage = (payload) => {
  const id = v4();

  registeredCallbacks.set(id, (respErr) => {
    if (respErr) {
      throw respErr;
    }
  });

  const buffer = createSubscriptionMessage('ADD', id, payload);

  return { buffer, id };
};

const createDeleteSubscriptionMessage = (payload) => {
  const id = v4();

  registeredCallbacks.set(id, (respErr) => {
    if (respErr) {
      throw respErr;
    }
  });

  const buffer = createSubscriptionMessage('DELETE', id, payload);

  return { buffer, id };
};

module.exports = {
  createAddSubscriptionMessage,
  createDeleteSubscriptionMessage,
};
