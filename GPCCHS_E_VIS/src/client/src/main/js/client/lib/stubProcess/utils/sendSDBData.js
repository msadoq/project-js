const fs = require('fs');
const { resolve } = require('path');
const _get = require('lodash/get');
const stubs = require('../../utils/stubs');
const constants = require('../../constants');

const sdbStub = JSON.parse(fs.readFileSync(resolve(__dirname, 'sdbStub.json')));

const stubData = stubs.getStubData();
const ITEMS_LABEL = 'items';
const COM_OBJECT_LABEL = 'comObject';

module.exports = (queryId, rawBuffer, zmq, decodedSDBQuery) => {
  const {
    method,
    // sessionId,
    // domainId,
    catalogName,
    // catalogItemName,
    // comObject,
    // fieldName,
  } = decodedSDBQuery;

  let payload = [];
  switch (method) {
    case constants.ADE_SDB_RETRIEVE_CATALOGS:
      payload = Object.keys(sdbStub);
      break;
    case constants.ADE_SDB_RETRIEVE_CATALOG_ITEMS:
      payload = _get(sdbStub, [catalogName, ITEMS_LABEL]);
      break;
    case constants.ADE_SDB_RETRIEVE_CATALOG_ITEM_COMOBJECT:
      payload = _get(sdbStub, [catalogName, COM_OBJECT_LABEL]);
      break;
    case constants.ADE_SDB_RETRIEVE_CATALOG_ITEM_FIELD_UNIT:
      break;
    case constants.ADE_SDB_RETRIEVE_CATALOG_ITEM_EXISTS:
      break;
    case constants.ADE_SDB_RETRIEVE_SATELLITE_ITEMS:
      break;
    default:
      break;
  }
  const buffer = [
    null,
    stubData.getSDBQueryHeaderProtobufADE(queryId),
    rawBuffer,
    // stubData.getSessionsProtobuf(stubData.getSessions()),
    stubData.getADEStringListProtobuf(
      payload
    ),
  ];
  zmq.push('stubData', buffer);
};
