const actionStub = require('./dataControllerUtils/action');
const booleanStub = require('./dataControllerUtils/boolean');
const dataIdStub = require('./dataControllerUtils/dataId');
const domainStub = require('./dataControllerUtils/domain');
const domainsStub = require('./dataControllerUtils/domains');
const fMDCreateDocumentStub = require('./dataControllerUtils/fMDCreateDocument');
const fMDDocumentPropertyStub = require('./dataControllerUtils/fMDDocumentProperty');
const fMDFileInfoStub = require('./dataControllerUtils/fMDFileInfo');
const fMDFileTypeStub = require('./dataControllerUtils/fMDFileType');
const fMDGetStub = require('./dataControllerUtils/fMDGet');
const headerStub = require('./dataControllerUtils/header');
const sendLogStub = require('./dataControllerUtils/sendLog');
const sessionStub = require('./dataControllerUtils/session');
const sessionGetTimeStub = require('./dataControllerUtils/sessionGetTime');
const sessionsStub = require('./dataControllerUtils/sessions');
const statusStub = require('./dataControllerUtils/status');
const dcStatusStub = require('./dataControllerUtils/dcStatus');
const stringStub = require('./dataControllerUtils/string');
const timeIntervalStub = require('./dataControllerUtils/timeInterval');
const timestampStub = require('./dataControllerUtils/timestamp');


module.exports = Object.assign(
  {},
  actionStub,
  booleanStub,
  dataIdStub,
  domainStub,
  domainsStub,
  fMDCreateDocumentStub,
  fMDDocumentPropertyStub,
  fMDFileInfoStub,
  fMDFileTypeStub,
  fMDGetStub,
  headerStub,
  sendLogStub,
  sessionStub,
  sessionGetTimeStub,
  sessionsStub,
  statusStub,
  dcStatusStub,
  stringStub,
  timeIntervalStub,
  timestampStub
);
