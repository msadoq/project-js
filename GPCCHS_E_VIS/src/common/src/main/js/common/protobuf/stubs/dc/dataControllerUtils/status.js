const protobuf = require('../../../index');
const globalConstants = require('../../../../constants/index');

const getSuccessStatus = () => ({
  status: globalConstants.STATUS_SUCCESS,
});
const getErrorStatus = () => ({
  status: globalConstants.STATUS_ERROR,
});

const getSuccessStatusProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.Status',
  getSuccessStatus()
);
const getErrorStatusProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.Status',
  getErrorStatus()
);

module.exports = {
  getSuccessStatus,
  getSuccessStatusProtobuf,
  getErrorStatus,
  getErrorStatusProtobuf,
};
