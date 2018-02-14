// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

const ProtoBuf = require('protobufjs');
const Adapter = require('./ADEHeader');

const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/ADEHeader.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.ADEHeader');

const MESSAGETYPE_DOMAIN_QUERY = 0;
const MESSAGETYPE_TIMEBASED_QUERY = 1;
const MESSAGETYPE_TIMEBASED_SUBSCRIPTION = 2;
const MESSAGETYPE_RESPONSE = 3;
const MESSAGETYPE_DOMAIN_DATA = 4;
const MESSAGETYPE_TIMEBASED_ARCHIVE_DATA = 5;
const MESSAGETYPE_TIMEBASED_PUBSUB_DATA = 6;
const MESSAGETYPE_SESSION_QUERY = 7;
const MESSAGETYPE_SESSION_DATA = 8;
const MESSAGETYPE_SESSION_TIME_QUERY = 9;
const MESSAGETYPE_SESSION_TIME_DATA = 10;
const MESSAGETYPE_LOG_SEND = 12;
const MESSAGETYPE_FMD_GET_QUERY = 13;
const MESSAGETYPE_FMD_GET_DATA = 14;
const MESSAGETYPE_FMD_CREATE_QUERY = 15;
const MESSAGETYPE_FMD_CREATE_DOCUMENT_QUERY = 16;
const MESSAGETYPE_FMD_CREATE_DATA = 17;
const MESSAGETYPE_SESSION_MASTER_QUERY = 18;
const MESSAGETYPE_SESSION_MASTER_DATA = 19;
const MESSAGETYPE_DC_STATUS_QUERY = 20;
const MESSAGETYPE_DC_STATUS_DATA = 21;
const MESSAGETYPE_ALARM_ACK = 26;

const getDcAlarmAckHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: MESSAGETYPE_ALARM_ACK,
  isLast,
  isError,
});
const getDcStatusQueryHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: MESSAGETYPE_DC_STATUS_QUERY,
  isLast,
  isError,
});
const getDcStatusHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: MESSAGETYPE_DC_STATUS_DATA,
  isLast,
  isError,
});
const getDomainQueryHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: MESSAGETYPE_DOMAIN_QUERY,
  isLast,
  isError,
});
const getTimebasedQueryHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: MESSAGETYPE_TIMEBASED_QUERY,
  isLast,
  isError,
});
const getTimebasedSubscriptionHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: MESSAGETYPE_TIMEBASED_SUBSCRIPTION,
  isLast,
  isError,
});
const getResponseHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: MESSAGETYPE_RESPONSE,
  isLast,
  isError,
});
const getDomainDataHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: MESSAGETYPE_DOMAIN_DATA,
  isLast,
  isError,
});
const getTimebasedArchiveDataHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: MESSAGETYPE_TIMEBASED_ARCHIVE_DATA,
  isLast,
  isError,
});
const getTimebasedPubSubDataHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: MESSAGETYPE_TIMEBASED_PUBSUB_DATA,
  isLast,
  isError,
});
const getSessionQueryHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: MESSAGETYPE_SESSION_QUERY,
  isLast,
  isError,
});
const getSessionDataHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: MESSAGETYPE_SESSION_DATA,
  isLast,
  isError,
});
const getSessionTimeQueryHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: MESSAGETYPE_SESSION_TIME_QUERY,
  isLast,
  isError,
});
const getSessionTimeDataHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: MESSAGETYPE_SESSION_TIME_DATA,
  isLast,
  isError,
});
const getLogSendHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: MESSAGETYPE_LOG_SEND,
  isLast,
  isError,
});
const getFmdGetQueryHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: MESSAGETYPE_FMD_GET_QUERY,
  isLast,
  isError,
});
const getFmdGetDataHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: MESSAGETYPE_FMD_GET_DATA,
  isLast,
  isError,
});
const getFmdCreateQueryHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: MESSAGETYPE_FMD_CREATE_QUERY,
  isLast,
  isError,
});
const getFmdCreateDocumentQueryHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: MESSAGETYPE_FMD_CREATE_DOCUMENT_QUERY,
  isLast,
  isError,
});
const getFmdCreateDataHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: MESSAGETYPE_FMD_CREATE_DATA,
  isLast,
  isError,
});
const getSessionMasterQueryHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: MESSAGETYPE_SESSION_MASTER_QUERY,
  isLast,
  isError,
});
const getSessionMasterDataHeaderADE = (requestId, isLast, isError) => ({
  requestId,
  method: MESSAGETYPE_SESSION_MASTER_DATA,
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
const getResponseHeaderProtobufADE = (requestId, isLast, isError) => Builder.encode(Adapter.encode(getResponseHeaderADE(requestId, isLast, isError))).finish();
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

const test = (requestId) => {
  return Adapter.encode(getSessionMasterDataHeaderADE(requestId));
}

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
  getResponseHeaderADE,
  getResponseHeaderProtobufADE,
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
  test
};
