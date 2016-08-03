const newReportingParameter = (timestamp) => {
  const protoType = require('../../lib/dataTypeManager/protoFile/reportingParameter.proto.js');
  const ReportingParameter = protoType.ReportingParameter;
  const parameter = new ReportingParameter({
    onboardDate: { value: timestamp },
    groundDate: { value: Math.round(new Date().getTime() / 1000) },
    convertedValue: { _double: { value: Math.floor((Math.random() * 100) + 1) } },
    rawValue: { _double: { value: Math.floor((Math.random() * 100) + 1) } },
    extractedValue: { _double: { value: Math.floor((Math.random() * 100) + 1) } },
    triggerOnCounter: { value: '6' },
    triggerOffCounter: { value: '8' },
    monitoringState: 'INFORMATIONAL',
    validityState: 'INVALID',
    isObsolete: { value: false },
    isNominal: { value: false },
  });

  return parameter.encode().toBuffer();
};

const newMetaData = (subscription, timestamp) => {
  const Header = require('../../lib/dataTypeManager/protoFile/header.proto.js');
  const OID = `000100010100010001${Math.floor((Math.random() * 99999999) + 1)}`;
  const splittedId = subscription.dataFullName.split('.');
  const splittedParameter = splittedId[1].split('<');
  const splittedType = splittedParameter[1].split('>');
  const header = new Header({
    catalog: splittedId[0],
    fullDataId: subscription.dataFullName,
    oid: OID,
    parameter: splittedParameter[0],
    session: subscription.sessionId,
    timestamp,
    type: splittedType[0],
  });

  return header.encode().toBuffer();
};

module.exports = {
  newReportingParameter,
  newMetaData,
};
