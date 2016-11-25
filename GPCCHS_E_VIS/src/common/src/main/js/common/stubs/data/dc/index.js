const actionStub = require('./dataControllerUtils/action');
const booleanStub = require('./dataControllerUtils/boolean');
const dataIdStub = require('./dataControllerUtils/dataId');
const domainStub = require('./dataControllerUtils/domain');
const domainsStub = require('./dataControllerUtils/domains');
const filterStub = require('./dataControllerUtils/filter');
const headerStub = require('./dataControllerUtils/header');
const queryArgumentsStub = require('./dataControllerUtils/queryArguments');
const sessionStub = require('./dataControllerUtils/session');
const sessionsStub = require('./dataControllerUtils/sessions');
const statusStub = require('./dataControllerUtils/status');
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
  filterStub,
  headerStub,
  queryArgumentsStub,
  sessionStub,
  sessionsStub,
  statusStub,
  stringStub,
  timeIntervalStub,
  timestampStub
);
