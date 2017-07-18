const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./status');

const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/Status.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.Status');

const STATUS_SUCCESS = 0;
const STATUS_ERROR = 1;

const getSuccessStatus = () => ({
  status: STATUS_SUCCESS,
});
const getErrorStatus = () => ({
  status: STATUS_ERROR,
});

const getSuccessStatusProtobuf = () => Builder.encode(Adapter.encode(getSuccessStatus())).finish();
const getErrorStatusProtobuf = () => Builder.encode(Adapter.encode(getErrorStatus())).finish();

module.exports = {
  getSuccessStatus,
  getSuccessStatusProtobuf,
  getErrorStatus,
  getErrorStatusProtobuf,
};
