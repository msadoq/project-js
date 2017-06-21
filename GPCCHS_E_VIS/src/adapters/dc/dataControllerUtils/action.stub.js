const protobuf = require('../../../index');

const SUBSCRIPTIONACTION_ADD = 0;
const SUBSCRIPTIONACTION_DELETE = 1;

const getAddAction = () => ({
  action: SUBSCRIPTIONACTION_ADD,
});
const getDeleteAction = () => ({
  action: SUBSCRIPTIONACTION_DELETE,
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
