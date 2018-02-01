// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

const ProtoBuf = require('protobufjs');
const Adapter = require('./header');

const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/Header.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.Header');

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

const getDcAlarmAckHeader = () => ({
  messageType: MESSAGETYPE_ALARM_ACK,
});
const getDcStatusQueryHeader = () => ({
  messageType: MESSAGETYPE_DC_STATUS_QUERY,
});
const getDcStatusHeader = () => ({
  messageType: MESSAGETYPE_DC_STATUS_DATA,
});
const getDomainQueryHeader = () => ({
  messageType: MESSAGETYPE_DOMAIN_QUERY,
});
const getTimebasedQueryHeader = () => ({
  messageType: MESSAGETYPE_TIMEBASED_QUERY,
});
const getTimebasedSubscriptionHeader = () => ({
  messageType: MESSAGETYPE_TIMEBASED_SUBSCRIPTION,
});
const getResponseHeader = () => ({
  messageType: MESSAGETYPE_RESPONSE,
});
const getDomainDataHeader = () => ({
  messageType: MESSAGETYPE_DOMAIN_DATA,
});
const getTimebasedArchiveDataHeader = () => ({
  messageType: MESSAGETYPE_TIMEBASED_ARCHIVE_DATA,
});
const getTimebasedPubSubDataHeader = () => ({
  messageType: MESSAGETYPE_TIMEBASED_PUBSUB_DATA,
});
const getSessionQueryHeader = () => ({
  messageType: MESSAGETYPE_SESSION_QUERY,
});
const getSessionDataHeader = () => ({
  messageType: MESSAGETYPE_SESSION_DATA,
});
const getSessionTimeQueryHeader = () => ({
  messageType: MESSAGETYPE_SESSION_TIME_QUERY,
});
const getSessionTimeDataHeader = () => ({
  messageType: MESSAGETYPE_SESSION_TIME_DATA,
});
const getLogSendHeader = () => ({
  messageType: MESSAGETYPE_LOG_SEND,
});
const getFmdGetQueryHeader = () => ({
  messageType: MESSAGETYPE_FMD_GET_QUERY,
});
const getFmdGetDataHeader = () => ({
  messageType: MESSAGETYPE_FMD_GET_DATA,
});
const getFmdCreateQueryHeader = () => ({
  messageType: MESSAGETYPE_FMD_CREATE_QUERY,
});
const getFmdCreateDocumentQueryHeader = () => ({
  messageType: MESSAGETYPE_FMD_CREATE_DOCUMENT_QUERY,
});
const getFmdCreateDataHeader = () => ({
  messageType: MESSAGETYPE_FMD_CREATE_DATA,
});
const getSessionMasterQueryHeader = () => ({
  messageType: MESSAGETYPE_SESSION_MASTER_QUERY,
});
const getSessionMasterDataHeader = () => ({
  messageType: MESSAGETYPE_SESSION_MASTER_DATA,
});

/* eslint-disable max-len, "Long lines are more readable here" */
const getDcAlarmAckHeaderProtobuf = () => Builder.encode(Adapter.encode(getDcAlarmAckHeader())).finish();
const getDcStatusQueryHeaderProtobuf = () => Builder.encode(Adapter.encode(getDcStatusQueryHeader())).finish();
const getDcStatusHeaderProtobuf = () => Builder.encode(Adapter.encode(getDcStatusHeader())).finish();
const getDomainQueryHeaderProtobuf = () => Builder.encode(Adapter.encode(getDomainQueryHeader())).finish();
const getTimebasedQueryHeaderProtobuf = () => Builder.encode(Adapter.encode(getTimebasedQueryHeader())).finish();
const getTimebasedSubscriptionHeaderProtobuf = () => Builder.encode(Adapter.encode(getTimebasedSubscriptionHeader())).finish();
const getResponseHeaderProtobuf = () => Builder.encode(Adapter.encode(getResponseHeader())).finish();
const getDomainDataHeaderProtobuf = () => Builder.encode(Adapter.encode(getDomainDataHeader())).finish();
const getTimebasedArchiveDataHeaderProtobuf = () => Builder.encode(Adapter.encode(getTimebasedArchiveDataHeader())).finish();
const getTimebasedPubSubDataHeaderProtobuf = () => Builder.encode(Adapter.encode(getTimebasedPubSubDataHeader())).finish();
const getSessionQueryHeaderProtobuf = () => Builder.encode(Adapter.encode(getSessionQueryHeader())).finish();
const getSessionDataHeaderProtobuf = () => Builder.encode(Adapter.encode(getSessionDataHeader())).finish();
const getSessionTimeQueryHeaderProtobuf = () => Builder.encode(Adapter.encode(getSessionTimeQueryHeader())).finish();
const getSessionTimeDataHeaderProtobuf = () => Builder.encode(Adapter.encode(getSessionTimeDataHeader())).finish();
const getLogSendHeaderProtobuf = () => Builder.encode(Adapter.encode(getLogSendHeader())).finish();
const getFmdGetQueryHeaderProtobuf = () => Builder.encode(Adapter.encode(getFmdGetQueryHeader())).finish();
const getFmdGetDataHeaderProtobuf = () => Builder.encode(Adapter.encode(getFmdGetDataHeader())).finish();
const getFmdCreateQueryHeaderProtobuf = () => Builder.encode(Adapter.encode(getFmdCreateQueryHeader())).finish();
const getFmdCreateDocumentQueryHeaderProtobuf = () => Builder.encode(Adapter.encode(getFmdCreateDocumentQueryHeader())).finish();
const getFmdCreateDataHeaderProtobuf = () => Builder.encode(Adapter.encode(getFmdCreateDataHeader())).finish();
const getSessionMasterQueryHeaderProtobuf = () => Builder.encode(Adapter.encode(getSessionMasterQueryHeader())).finish();
const getSessionMasterDataHeaderProtobuf = () => Builder.encode(Adapter.encode(getSessionMasterDataHeader())).finish();

module.exports = {
  getDcStatusQueryHeader,
  getDcStatusQueryHeaderProtobuf,
  getDcStatusHeader,
  getDcStatusHeaderProtobuf,
  getDomainQueryHeader,
  getDomainQueryHeaderProtobuf,
  getTimebasedQueryHeader,
  getTimebasedQueryHeaderProtobuf,
  getTimebasedSubscriptionHeader,
  getTimebasedSubscriptionHeaderProtobuf,
  getResponseHeader,
  getResponseHeaderProtobuf,
  getDomainDataHeader,
  getDomainDataHeaderProtobuf,
  getTimebasedArchiveDataHeader,
  getTimebasedArchiveDataHeaderProtobuf,
  getTimebasedPubSubDataHeader,
  getTimebasedPubSubDataHeaderProtobuf,
  getSessionQueryHeader,
  getSessionQueryHeaderProtobuf,
  getSessionDataHeader,
  getSessionDataHeaderProtobuf,
  getSessionTimeQueryHeader,
  getSessionTimeQueryHeaderProtobuf,
  getSessionTimeDataHeader,
  getSessionTimeDataHeaderProtobuf,
  getLogSendHeader,
  getLogSendHeaderProtobuf,
  getFmdGetQueryHeader,
  getFmdGetQueryHeaderProtobuf,
  getFmdGetDataHeader,
  getFmdGetDataHeaderProtobuf,
  getFmdCreateQueryHeader,
  getFmdCreateQueryHeaderProtobuf,
  getFmdCreateDocumentQueryHeader,
  getFmdCreateDocumentQueryHeaderProtobuf,
  getFmdCreateDataHeader,
  getFmdCreateDataHeaderProtobuf,
  getSessionMasterQueryHeader,
  getSessionMasterQueryHeaderProtobuf,
  getSessionMasterDataHeader,
  getSessionMasterDataHeaderProtobuf,
  getDcAlarmAckHeaderProtobuf,
};
