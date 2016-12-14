const registeredCallbacks = require('common/callbacks');
const { encode } = require('common/protobuf');
const globalConstants = require('common/constants');
const flattenDataId = require('./flattenDataId');

let subIdIndex = 0;
function generateSubId() {
  subIdIndex += 1;
  return `sub${subIdIndex}`;
}

/**
 * Protobuf optimization
 */
const protobufSubscriptionHeader = encode('dc.dataControllerUtils.Header', {
  messageType: globalConstants.MESSAGETYPE_TIMEBASED_SUBSCRIPTION,
});
const protobufSubscriptionAddAction = encode('dc.dataControllerUtils.Action', {
  action: globalConstants.SUBSCRIPTIONACTION_ADD,
});
const protobufSubscriptionDeleteAction = encode('dc.dataControllerUtils.Action', {
  action: globalConstants.SUBSCRIPTIONACTION_DELETE,
});

const dataIdProtobufs = {}; // TODO envisage cache cleaning by adding timestamp on creation
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

module.exports = {
  createAddSubscriptionMessage,
  createDeleteSubscriptionMessage,
};
