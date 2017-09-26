// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #6798 : 22/06/2017 : Remove data from protobuf in client - Change some stubProcesses and some controllers
// VERSION : 1.1.2 : FA : #6798 : 22/06/2017 : Multiple changes on the load mechansim of adapters : - To test with Jest, add a mock of config(MESSAGES_NAMESPACE) in jest/index.js - Test fix - Lint pass ( 1 test is still KO)
// VERSION : 1.1.2 : FA : #6798 : 27/06/2017 : Use path.join instead of concatenation
// VERSION : 1.1.2 : FA : #6798 : 27/06/2017 : Fix dynamic require in packaging production mode
// VERSION : 1.1.2 : FA : #7355 : 28/07/2017 : Change adapters dc and lpisis config to relative path (config.default.json)
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

const { join, resolve } = require('path');
const _each = require('lodash/each');
const parameters = require('../../common/configurationManager');

const STUB_INDEX = 'stubs.js';
const stubData = {};

const loadStubs = (override) => {
  const MESSAGES_NAMESPACES = override || parameters.get('MESSAGES_NAMESPACES');
  _each(MESSAGES_NAMESPACES, (msgNasmespaces) => {
    const adapterPath = resolve(msgNasmespaces.path, msgNasmespaces.ns);
    const stubIndex = require(join(adapterPath, STUB_INDEX)); // eslint-disable-line
    Object.assign(stubData, stubIndex);
  });
};

const getStubData = () => stubData;

module.exports = {
  loadStubs,
  getStubData,
};
