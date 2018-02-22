// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

const ProtoBuf = require('protobufjs');
const Adapter = require('./ADEHeader');

const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/ADEHeader.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.ADEHeader');

const ADE_DOMAIN_QUERY = 0;
const ADE_TIMEBASED_QUERY = 1;
const ADE_TIMEBASED_SUBSCRIPTION = 2;
const ADE_SESSION = 3;
const ADE_SESSION_TIME = 4;
const ADE_LOG = 5;
const ADE_FMD_GET = 6;
const ADE_FMD_CREATE = 7;
const ADE_FMD_CREATE_DOCUMENT = 8;
const ADE_SESSION_MASTER = 9;
const ADE_DC_STATUS = 10;
const ADE_TIMEOUT = 11;
const ADE_SESSION_UPDATE = 12;
const ADE_ALARM_ACK = 13;
const ADE_ALARM_ACK_DATA = 14;
const ADE_SDB_QUERY = 15;

const getDcAlarmAckHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: ADE_ALARM_ACK,
  isLast,
  isError,
});
const getDcStatusQueryHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: ADE_DC_STATUS,
  isLast,
  isError,
});
const getDcStatusHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: ADE_DC_STATUS,
  isLast,
  isError,
});
const getDomainQueryHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: ADE_DOMAIN_QUERY,
  isLast,
  isError,
});
const getTimebasedQueryHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: ADE_TIMEBASED_QUERY,
  isLast,
  isError,
});
const getTimebasedSubscriptionHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: ADE_TIMEBASED_SUBSCRIPTION,
  isLast,
  isError,
});
const getDomainDataHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: ADE_DOMAIN_QUERY,
  isLast,
  isError,
});
const getTimebasedArchiveDataHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: ADE_TIMEBASED_QUERY,
  isLast,
  isError,
});
const getTimebasedPubSubDataHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: ADE_TIMEBASED_SUBSCRIPTION,
  isLast,
  isError,
});
const getSessionQueryHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: ADE_SESSION,
  isLast,
  isError,
});
const getSessionDataHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: ADE_SESSION,
  isLast,
  isError,
});
const getSessionTimeQueryHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: ADE_SESSION_TIME,
  isLast,
  isError,
});
const getSessionTimeDataHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: ADE_SESSION_TIME,
  isLast,
  isError,
});
const getLogSendHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: ADE_LOG,
  isLast,
  isError,
});
const getFmdGetQueryHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: ADE_FMD_GET,
  isLast,
  isError,
});
const getFmdGetDataHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: ADE_FMD_GET,
  isLast,
  isError,
});
const getFmdCreateQueryHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: ADE_FMD_CREATE,
  isLast,
  isError,
});
const getFmdCreateDocumentQueryHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: ADE_FMD_CREATE_DOCUMENT,
  isLast,
  isError,
});
const getFmdCreateDataHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: ADE_FMD_CREATE_DOCUMENT,
  isLast,
  isError,
});
const getSessionMasterQueryHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: ADE_SESSION_MASTER,
  isLast,
  isError,
});
const getSessionMasterDataHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: ADE_SESSION_MASTER,
  isLast,
  isError,
});
const getSDBQueryHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: ADE_SDB_QUERY,
  isLast,
  isError,
});
/* eslint-disable max-len, "Long lines are more readable here" */
const getDcAlarmAckHeaderProtobufADE = (requestId, isLast, isError) => Builder.encode(Adapter.encode(getDcAlarmAckHeaderADE(requestId, isLast, isError))).finish();
const getDcStatusQueryHeaderProtobufADE = (requestId, isLast, isError) => Builder.encode(Adapter.encode(getDcStatusQueryHeaderADE(requestId, isLast, isError))).finish();
const getDcStatusHeaderProtobufADE = (requestId, isLast, isError) => Builder.encode(Adapter.encode(getDcStatusHeaderADE(requestId, isLast, isError))).finish();
const getDomainQueryHeaderProtobufADE = (requestId, isLast, isError) => Builder.encode(Adapter.encode(getDomainQueryHeaderADE(requestId, isLast, isError))).finish();
const getTimebasedQueryHeaderProtobufADE = (requestId, isLast, isError) => Builder.encode(Adapter.encode(getTimebasedQueryHeaderADE(requestId, isLast, isError))).finish();
const getTimebasedSubscriptionHeaderProtobufADE = (requestId, isLast, isError) => Builder.encode(Adapter.encode(getTimebasedSubscriptionHeaderADE(requestId, isLast, isError))).finish();
const getDomainDataHeaderProtobufADE = (requestId, isLast, isError) => Builder.encode(Adapter.encode(getDomainDataHeaderADE(requestId, isLast, isError))).finish();
const getTimebasedArchiveDataHeaderProtobufADE = (requestId, isLast, isError) => Builder.encode(Adapter.encode(getTimebasedArchiveDataHeaderADE(requestId, isLast, isError))).finish();
const getTimebasedPubSubDataHeaderProtobufADE = (requestId, isLast, isError) => Builder.encode(Adapter.encode(getTimebasedPubSubDataHeaderADE(requestId, isLast, isError))).finish();
const getSessionQueryHeaderProtobufADE = (requestId, isLast, isError) => Builder.encode(Adapter.encode(getSessionQueryHeaderADE(requestId, isLast, isError))).finish();
const getSessionDataHeaderProtobufADE = (requestId, isLast, isError) => Builder.encode(Adapter.encode(getSessionDataHeaderADE(requestId, isLast, isError))).finish();
const getSessionTimeQueryHeaderProtobufADE = (requestId, isLast, isError) => Builder.encode(Adapter.encode(getSessionTimeQueryHeaderADE(requestId, isLast, isError))).finish();
const getSessionTimeDataHeaderProtobufADE = (requestId, isLast, isError) => Builder.encode(Adapter.encode(getSessionTimeDataHeaderADE(requestId, isLast, isError))).finish();
const getLogSendHeaderProtobufADE = (requestId, isLast, isError) => Builder.encode(Adapter.encode(getLogSendHeaderADE(requestId, isLast, isError))).finish();
const getFmdGetQueryHeaderProtobufADE = (requestId, isLast, isError) => Builder.encode(Adapter.encode(getFmdGetQueryHeaderADE(requestId, isLast, isError))).finish();
const getFmdGetDataHeaderProtobufADE = (requestId, isLast, isError) => Builder.encode(Adapter.encode(getFmdGetDataHeaderADE(requestId, isLast, isError))).finish();
const getFmdCreateQueryHeaderProtobufADE = (requestId, isLast, isError) => Builder.encode(Adapter.encode(getFmdCreateQueryHeaderADE(requestId, isLast, isError))).finish();
const getFmdCreateDocumentQueryHeaderProtobufADE = (requestId, isLast, isError) => Builder.encode(Adapter.encode(getFmdCreateDocumentQueryHeaderADE(requestId, isLast, isError))).finish();
const getFmdCreateDataHeaderProtobufADE = (requestId, isLast, isError) => Builder.encode(Adapter.encode(getFmdCreateDataHeaderADE(requestId, isLast, isError))).finish();
const getSessionMasterQueryHeaderProtobufADE = (requestId, isLast, isError) => Builder.encode(Adapter.encode(getSessionMasterQueryHeaderADE(requestId, isLast, isError))).finish();
const getSessionMasterDataHeaderProtobufADE = (requestId, isLast, isError) => Builder.encode(Adapter.encode(getSessionMasterDataHeaderADE(requestId, isLast, isError))).finish();
const getSDBQueryHeaderProtobufADE = (requestId, isLast, isError) => Builder.encode(Adapter.encode(getSDBQueryHeaderADE(requestId, isLast, isError))).finish();

module.exports = {
  getDcStatusQueryHeaderADE,
  getDcStatusQueryHeaderProtobufADE,
  getDcStatusHeaderADE,
  getDcStatusHeaderProtobufADE,
  getDomainQueryHeaderADE,
  getDomainQueryHeaderProtobufADE,
  getTimebasedQueryHeaderADE,
  getTimebasedQueryHeaderProtobufADE,
  getTimebasedSubscriptionHeaderADE,
  getTimebasedSubscriptionHeaderProtobufADE,
  getDomainDataHeaderADE,
  getDomainDataHeaderProtobufADE,
  getTimebasedArchiveDataHeaderADE,
  getTimebasedArchiveDataHeaderProtobufADE,
  getTimebasedPubSubDataHeaderADE,
  getTimebasedPubSubDataHeaderProtobufADE,
  getSessionQueryHeaderADE,
  getSessionQueryHeaderProtobufADE,
  getSessionDataHeaderADE,
  getSessionDataHeaderProtobufADE,
  getSessionTimeQueryHeaderADE,
  getSessionTimeQueryHeaderProtobufADE,
  getSessionTimeDataHeaderADE,
  getSessionTimeDataHeaderProtobufADE,
  getLogSendHeaderADE,
  getLogSendHeaderProtobufADE,
  getFmdGetQueryHeaderADE,
  getFmdGetQueryHeaderProtobufADE,
  getFmdGetDataHeaderADE,
  getFmdGetDataHeaderProtobufADE,
  getFmdCreateQueryHeaderADE,
  getFmdCreateQueryHeaderProtobufADE,
  getFmdCreateDocumentQueryHeaderADE,
  getFmdCreateDocumentQueryHeaderProtobufADE,
  getFmdCreateDataHeaderADE,
  getFmdCreateDataHeaderProtobufADE,
  getSessionMasterQueryHeaderADE,
  getSessionMasterQueryHeaderProtobufADE,
  getSessionMasterDataHeaderADE,
  getSessionMasterDataHeaderProtobufADE,
  getDcAlarmAckHeaderProtobufADE,
  getSDBQueryHeaderProtobufADE,
};
