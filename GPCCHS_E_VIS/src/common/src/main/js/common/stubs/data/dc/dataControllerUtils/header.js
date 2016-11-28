const protobuf = require('../../../../protobuf');
const globalConstants = require('../../../../constants');

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
const getFilepathQueryHeader = () => ({
  messageType: globalConstants.MESSAGETYPE_FILEPATH_QUERY,
});
const getFilepathDataHeader = () => ({
  messageType: globalConstants.MESSAGETYPE_FILEPATH_DATA,
});

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

const getFilepathQueryHeaderProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.Header',
  getFilepathQueryHeader()
);

const getFilepathDataHeaderProtobuf = () => protobuf.encode(
  'dc.dataControllerUtils.Header',
  getFilepathDataHeader()
);

module.exports = {
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
  getFilepathQueryHeader,
  getFilepathQueryHeaderProtobuf,
  getFilepathDataHeader,
  getFilepathDataHeaderProtobuf,
};
