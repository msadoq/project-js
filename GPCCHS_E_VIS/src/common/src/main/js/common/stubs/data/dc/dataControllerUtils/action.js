const protobuf = require('../../../../protobuf');
const globalConstants = require('../../../../constants');

const getAddAction = () => ({
  action: globalConstants.SUBSCRIPTIONACTION_ADD,
});
const getDeleteAction = () => ({
  action: globalConstants.SUBSCRIPTIONACTION_DELETE,
});

const getAddActionProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.Action',
  getAddAction()
);
const getDeleteActionProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.Action',
  getDeleteAction()
);

module.exports = {
  getAddAction,
  getDeleteAction,
  getAddActionProtobuf,
  getDeleteActionProtobuf,
};
