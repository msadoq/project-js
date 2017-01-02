const logger = require('common/log')('utils/subscriptions');
const registeredCallbacks = require('common/callbacks');
const { encode } = require('common/protobuf');
const globalConstants = require('common/constants');
const flattenDataId = require('./flattenDataId');
const subscriptionsModel = require('../models/subscriptions');

const protobufSubscriptionHeader = encode('dc.dataControllerUtils.Header', {
  messageType: globalConstants.MESSAGETYPE_TIMEBASED_SUBSCRIPTION,
});
const protobufSubscriptionAddAction = encode('dc.dataControllerUtils.Action', {
  action: globalConstants.SUBSCRIPTIONACTION_ADD,
});
const protobufSubscriptionDeleteAction = encode('dc.dataControllerUtils.Action', {
  action: globalConstants.SUBSCRIPTIONACTION_DELETE,
});

let subIdIndex = 0;
function generateSubId() {
  subIdIndex += 1;
  return `sub${subIdIndex}`;
}

const dataIdProtobufs = {};
function getDataIdProtobuf(dataId) {
  const flatDataId = flattenDataId(dataId);
  if (typeof dataIdProtobufs[flatDataId] === 'undefined') {
    dataIdProtobufs[flatDataId] = encode('dc.dataControllerUtils.DataId', dataId);
  }

  return dataIdProtobufs[flatDataId];
}

const createAddSubscriptionMessage = (dataId) => {
  const subId = generateSubId();

  registeredCallbacks.set(subId, (respErr) => {
    if (respErr) {
      throw respErr;
    }
  });

  const args = [
    protobufSubscriptionHeader,
    encode('dc.dataControllerUtils.String', { string: subId }),
    getDataIdProtobuf(dataId),
    protobufSubscriptionAddAction,
  ];

  return { args, subId };
};

const createDeleteSubscriptionMessage = (dataId) => {
  const subId = generateSubId();

  registeredCallbacks.set(subId, (respErr) => {
    if (respErr) {
      throw respErr;
    }
  });

  const args = [
    protobufSubscriptionHeader,
    encode('dc.dataControllerUtils.String', { string: subId }),
    getDataIdProtobuf(dataId),
    protobufSubscriptionDeleteAction,
  ];

  return { args, subId };
};

/**
 * Loop on existing subscriptions and close each
 *
 * @param sendMessageToDc
 */
const unsubscribeAll = (sendMessageToDc) => {
  const subscriptions = subscriptionsModel.getAll();
  subscriptionsModel.cleanup();

  if (subscriptions.length) {
    subscriptions.forEach((subscription) => {
      const message = createDeleteSubscriptionMessage(subscription.dataId);
      logger.debug('sending subscription deletion to DC');
      return sendMessageToDc('dcPush', message.args);
    });
  }
};

module.exports = {
  createAddSubscriptionMessage,
  createDeleteSubscriptionMessage,
  unsubscribeAll,
};
