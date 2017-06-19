const protobuf = require('../../../index');

const STATUS_SUCCESS = 0;
const STATUS_ERROR = 1;

const getSuccessStatus = () => ({
  status: STATUS_SUCCESS,
});
const getErrorStatus = () => ({
  status: STATUS_ERROR,
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
