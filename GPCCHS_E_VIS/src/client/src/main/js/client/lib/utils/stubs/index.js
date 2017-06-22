const _each = require('lodash/each');
const parameters = require('../../common/configurationManager');

const STUB_INDEX = 'stubs.js';
const stubData = {};

const loadStubs = (override) => {
  const MESSAGES_NAMESPACES = override || parameters.get('MESSAGES_NAMESPACES');
  _each(MESSAGES_NAMESPACES, (msgNasmespaces) => {
    // console.log("MESSAGES_NAMESPACES :", msgNasmespaces);
    const adapterPath = msgNasmespaces.path + msgNasmespaces.ns;
    // console.log('AdapterPath :', adapterPath);
    const stubIndex = require(`${adapterPath}/${STUB_INDEX}`); // eslint-disable-line
    Object.assign(stubData, stubIndex);
  });
};

const getStubData = () => stubData;

module.exports = {
  loadStubs,
  getStubData,
};
