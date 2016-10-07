const debug = require('../io/debug')('utils:subscriptions');
const { v4 } = require('node-uuid');
const registeredCallbacks = require('../utils/registeredCallbacks');
const { encode } = require('../protobuf');
const constants = require('../constants');

const createSubscriptionMessageArguments = (action, queryId, dataId) => ([
  encode('dc.dataControllerUtils.Header', { messageType: constants.MESSAGETYPE_TIMEBASED_SUBSCRIPTION }),
  encode('dc.dataControllerUtils.String', { string: queryId }),
  encode('dc.dataControllerUtils.DataId', dataId),
  encode('dc.dataControllerUtils.Action', { action }),
]);

const createAddSubscriptionMessage = (dataId) => {
  const id = v4();

  registeredCallbacks.set(id, (respErr) => {
    if (respErr) {
      throw respErr;
    }
  });

  const args = createSubscriptionMessageArguments(constants.SUBSCRIPTIONACTION_ADD, id, dataId);

  return { args, id };
};

const createDeleteSubscriptionMessage = (dataId) => {
  const id = v4();

  registeredCallbacks.set(id, (respErr) => {
    if (respErr) {
      throw respErr;
    }
  });

  const args = createSubscriptionMessageArguments(constants.SUBSCRIPTIONACTION_DELETE, id, dataId);

  return { args, id };
};

module.exports = {
  createAddSubscriptionMessage,
  createDeleteSubscriptionMessage,
};
