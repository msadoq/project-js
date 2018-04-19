const fs = require('fs');
const { resolve } = require('path');
const _get = require('lodash/get');
const stubs = require('../../utils/stubs');
const constants = require('../../constants');

const sdbStub = JSON.parse(fs.readFileSync(resolve(__dirname, 'sdbStub.json')));

const stubData = stubs.getStubData();
const ITEMS_LABEL = 'items';
const COM_OBJECT_LABEL = 'comObject';
const UNIT_LABEL = 'unit';

const generateStringListProto = payload => stubData.getADEStringListProtobuf(payload);
const generateSingleStringProto = payload => stubData.getStringProtobuf(payload);
const generateBooleanProto = bool => stubData.getBooleanProtobuf(bool);


module.exports = (queryId, rawBuffer, zmq, decodedSDBQuery) => {
  const {
    method,
    catalogName,
    catalogItemName,
    sessionId,
    domainId,
  } = decodedSDBQuery;

  let dataBuffer = null;
  switch (method) {
    case constants.ADE_SDB_RETRIEVE_CATALOGS:
      dataBuffer = generateStringListProto(Object.keys(sdbStub));
      break;
    case constants.ADE_SDB_RETRIEVE_CATALOG_ITEMS:
      dataBuffer = generateStringListProto(
        Object.keys(_get(sdbStub, [catalogName, ITEMS_LABEL]))
      );
      break;
    case constants.ADE_SDB_RETRIEVE_CATALOG_ITEM_COMOBJECT:
      dataBuffer = generateStringListProto(_get(sdbStub, [catalogName, COM_OBJECT_LABEL]));
      break;
    case constants.ADE_SDB_RETRIEVE_CATALOG_ITEM_FIELD_UNIT:
      dataBuffer = generateSingleStringProto(
        _get(sdbStub, [catalogName, ITEMS_LABEL, catalogItemName, UNIT_LABEL])
      );
      break;
    case constants.ADE_SDB_RETRIEVE_CATALOG_ITEM_EXISTS:
      dataBuffer = generateBooleanProto(
        !!_get(sdbStub, [catalogName, ITEMS_LABEL, catalogItemName])
      );
      break;
    case constants.ADE_SDB_RETRIEVE_SATELLITE_ITEMS:
      break;
    case constants.ADE_SDB_RETRIEVE_CATALOG_ITEM_STRUCTURE:
      dataBuffer = stubData.getADEItemStructureProtobuf();
      break;
    default:
      break;
  }
  const buffer = [
    null,
    stubData.getSDBQueryHeaderProtobufADE(queryId),
    rawBuffer,
    dataBuffer,
  ];
  zmq.push('stubData', buffer);
};
