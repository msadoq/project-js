/* eslint global-require:0 */
module.exports = {
  ccsds_cs: {
    User: require('./ccsds_cs/user'),
  },
  ccsds_mal: {
    NamedValue: require('./ccsds_mal/namedValue'),
  },
  decommutedPacket: {
    DecommutedPacket: require('./decommutedPacket/decommutedPacket'),
  },
  decommutedParameter: {
    ReportingParameter: require('./decommutedParameter/reportingParameter'),
  },
  file: {
    Document: require('./file/document'),
    ProfileRight: require('./file/profileRight'),
    UserRight: require('./file/userRight'),
  },
  tcHistory: {
    TCHistory: require('./tcHistory/tCHistory'),
  },
};
