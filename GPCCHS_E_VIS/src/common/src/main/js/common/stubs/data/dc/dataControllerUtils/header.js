const protobuf = require('../../../../protobuf');
const globalConstants = require('../../../../constants');

const getDcStatusQueryHeader = () => ({
  messageType: globalConstants.MESSAGETYPE_DC_STATUS_QUERY,
});
const getDcStatusHeader = () => ({
  messageType: globalConstants.MESSAGETYPE_DC_STATUS_DATA,
});
const getDomainQueryHeader = () => ({
  messageType: globalConstants.MESSAGETYPE_DOMAIN_QUERY,
});
const getTimebasedQueryHeader = () => ({
  messageType: globalConstants.MESSAGETYPE_TIMEBASED_QUERY,
});
const getTimebasedSubscriptionHeader = () => ({
  messageType: globalConstants.MESSAGETYPE_TIMEBASED_SUBSCRIPTION,
});
const getResponseHeader = () => ({
  messageType: globalConstants.MESSAGETYPE_RESPONSE,
});
const getDomainDataHeader = () => ({
  messageType: globalConstants.MESSAGETYPE_DOMAIN_DATA,
});
const getTimebasedArchiveDataHeader = () => ({
  messageType: globalConstants.MESSAGETYPE_TIMEBASED_ARCHIVE_DATA,
});
const getTimebasedPubSubDataHeader = () => ({
  messageType: globalConstants.MESSAGETYPE_TIMEBASED_PUBSUB_DATA,
});
const getSessionQueryHeader = () => ({
  messageType: globalConstants.MESSAGETYPE_SESSION_QUERY,
});
const getSessionDataHeader = () => ({
  messageType: globalConstants.MESSAGETYPE_SESSION_DATA,
});
const getSessionTimeQueryHeader = () => ({
  messageType: globalConstants.MESSAGETYPE_SESSION_TIME_QUERY,
});
const getSessionTimeDataHeader = () => ({
  messageType: globalConstants.MESSAGETYPE_SESSION_TIME_DATA,
});
const getLogSendHeader = () => ({
  messageType: globalConstants.MESSAGETYPE_LOG_SEND,
});
const getFmdGetQueryHeader = () => ({
  messageType: globalConstants.MESSAGETYPE_FMD_GET_QUERY,
});
const getFmdGetDataHeader = () => ({
  messageType: globalConstants.MESSAGETYPE_FMD_GET_DATA,
});
const getFmdCreateQueryHeader = () => ({
  messageType: globalConstants.MESSAGETYPE_FMD_CREATE_QUERY,
});
const getFmdCreateDocumentQueryHeader = () => ({
  messageType: globalConstants.MESSAGETYPE_FMD_CREATE_DOCUMENT_QUERY,
});
const getFmdCreateDataHeader = () => ({
  messageType: globalConstants.MESSAGETYPE_FMD_CREATE_DATA,
});
const getSessionMasterQueryHeader = () => ({
  messageType: globalConstants.MESSAGETYPE_SESSION_MASTER_QUERY,
});
const getSessionMasterDataHeader = () => ({
  messageType: globalConstants.MESSAGETYPE_SESSION_MASTER_DATA,
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
