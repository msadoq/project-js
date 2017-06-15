const protobuf = require('../../../index');

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

const getDcStatusQueryHeaderProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.Header',
  getDcStatusQueryHeader()
);

const getDcStatusHeaderProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.Header',
  getDcStatusHeader()
);
const getDomainQueryHeaderProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.Header',
  getDomainQueryHeader()
);
const getTimebasedQueryHeaderProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.Header',
  getTimebasedQueryHeader()
);
const getTimebasedSubscriptionHeaderProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.Header',
  getTimebasedSubscriptionHeader()
);
const getResponseHeaderProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.Header',
  getResponseHeader()
);
const getDomainDataHeaderProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.Header',
  getDomainDataHeader()
);
const getTimebasedArchiveDataHeaderProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.Header',
  getTimebasedArchiveDataHeader()
);
const getTimebasedPubSubDataHeaderProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.Header',
  getTimebasedPubSubDataHeader()
);
const getSessionQueryHeaderProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.Header',
  getSessionQueryHeader()
);
const getSessionDataHeaderProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.Header',
  getSessionDataHeader()
);
const getSessionTimeQueryHeaderProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.Header',
  getSessionTimeQueryHeader()
);
const getSessionTimeDataHeaderProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.Header',
  getSessionTimeDataHeader()
);
const getLogSendHeaderProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.Header',
  getLogSendHeader()
);
const getFmdGetQueryHeaderProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.Header',
  getFmdGetQueryHeader()
);
const getFmdGetDataHeaderProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.Header',
  getFmdGetDataHeader()
);
const getFmdCreateQueryHeaderProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.Header',
  getFmdCreateQueryHeader()
);
const getFmdCreateDocumentQueryHeaderProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.Header',
  getFmdCreateDocumentQueryHeader()
);
const getFmdCreateDataHeaderProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.Header',
  getFmdCreateDataHeader()
);
const getSessionMasterQueryHeaderProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.Header',
  getSessionMasterQueryHeader()
);
const getSessionMasterDataHeaderProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.Header',
  getSessionMasterDataHeader()
);

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
};
