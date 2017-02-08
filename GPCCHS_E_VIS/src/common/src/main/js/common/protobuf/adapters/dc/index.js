const Action = require('./dataControllerUtils/action');
const Boolean = require('./dataControllerUtils/boolean');
const DataId = require('./dataControllerUtils/dataId');
const DcStatus = require('./dataControllerUtils/dcStatus');
const Domains = require('./dataControllerUtils/domains');
const FMDCreateDocument = require('./dataControllerUtils/fMDCreateDocument');
const FMDDocumentProperty = require('./dataControllerUtils/fMDDocumentProperty');
const FMDFileInfo = require('./dataControllerUtils/fMDFileInfo');
const FMDFileType = require('./dataControllerUtils/fMDFileType');
const FMDGet = require('./dataControllerUtils/fMDGet');
const Header = require('./dataControllerUtils/header');
const QueryArguments = require('./dataControllerUtils/queryArguments');
const SendLog = require('./dataControllerUtils/sendLog');
const SessionGetTime = require('./dataControllerUtils/sessionGetTime');
const Sessions = require('./dataControllerUtils/sessions');
const Status = require('./dataControllerUtils/status');
const String = require('./dataControllerUtils/string');
const TimeInterval = require('./dataControllerUtils/timeInterval');
const Timestamp = require('./dataControllerUtils/timestamp');

module.exports = {
  dataControllerUtils: {
    Action,
    Boolean,
    DataId,
    DcStatus,
    Domains,
    FMDCreateDocument,
    FMDDocumentProperty,
    FMDFileInfo,
    FMDFileType,
    FMDGet,
    Header,
    QueryArguments,
    SendLog,
    SessionGetTime,
    Sessions,
    Status,
    String,
    TimeInterval,
    Timestamp,
  },
};
