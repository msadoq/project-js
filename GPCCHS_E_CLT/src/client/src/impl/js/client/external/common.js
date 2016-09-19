const _ = require('lodash');
const { v4 } = require('node-uuid');

function createConnectedData(data, uuid) {
  // Get parameters of global connected Data
  const cData = _.pick(data, ['formula', 'domain', 'timeline']);
  if (data.filter) {
    cData.filter = data.filter;
  }
  cData.uuid = uuid;
  return cData;
}

function moveConnectedData(connectedData) {
  // Add element in connectedData list
  const uuid = v4();
  const dataToStore = createConnectedData(connectedData, uuid);
  // Delete parameters stored in the view
  const data = _.omit(connectedData, ['formula', 'domain', 'timeline', 'filter']);
  connectedData = Object.assign({}, data, { uuid }); // eslint-disable-line no-param-reassign
  return { dataToStore, connectedData };
}


module.exports = { moveConnectedData, createConnectedData };
