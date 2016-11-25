/* eslint global-require:0 */
module.exports = {
  dataControllerUtils: {
    Action: require('./dataControllerUtils/action'),
    Boolean: require('./dataControllerUtils/boolean'),
    DataId: require('./dataControllerUtils/dataId'),
    Domains: require('./dataControllerUtils/domains'),
    Header: require('./dataControllerUtils/header'),
    QueryArguments: require('./dataControllerUtils/queryArguments'),
    Sessions: require('./dataControllerUtils/sessions'),
    Status: require('./dataControllerUtils/status'),
    String: require('./dataControllerUtils/string'),
    TimeInterval: require('./dataControllerUtils/timeInterval'),
    Timestamp: require('./dataControllerUtils/timestamp'),
  },
};
