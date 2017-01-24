/* eslint global-require:0 */
module.exports = {
  dataControllerUtils: {
    Action: require('./dataControllerUtils/action'),
    Boolean: require('./dataControllerUtils/boolean'),
    DataId: require('./dataControllerUtils/dataId'),
    DcStatus: require('./dataControllerUtils/dcStatus'),
    Domains: require('./dataControllerUtils/domains'),
    FMDCreateDocument: require('./dataControllerUtils/fMDCreateDocument'),
    FMDDocumentProperty: require('./dataControllerUtils/fMDDocumentProperty'),
    FMDFileInfo: require('./dataControllerUtils/fMDFileInfo'),
    FMDFileType: require('./dataControllerUtils/fMDFileType'),
    FMDGet: require('./dataControllerUtils/fMDGet'),
    Header: require('./dataControllerUtils/header'),
    QueryArguments: require('./dataControllerUtils/queryArguments'),
    SendLog: require('./dataControllerUtils/sendLog'),
    SessionGetTime: require('./dataControllerUtils/sessionGetTime'),
    Sessions: require('./dataControllerUtils/sessions'),
    Status: require('./dataControllerUtils/status'),
    String: require('./dataControllerUtils/string'),
    TimeInterval: require('./dataControllerUtils/timeInterval'),
    Timestamp: require('./dataControllerUtils/timestamp'),
  },
};
