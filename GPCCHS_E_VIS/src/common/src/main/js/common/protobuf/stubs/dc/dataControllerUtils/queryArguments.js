const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./queryArguments');

const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/dataControllerUtils/QueryArguments.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.QueryArguments');


const getQueryArguments = override => applyOverride({
  /* sortFieldName: 'groundDate',
  sortOrder: globalConstants.SORTORDER_ASC,
  limitStart: 0,
  limitNumber: 1e9,
  getLastType: globalConstants.GETLASTTYPE_GET_N_LAST,
  getLastFromTime: stubs.getTimestamp(),
  getLastNumber: 42,*/
  // filters: [
  //   getFilter(),
  //   getFilter({
  //     fieldName: 'groundDate',
  //     type: globalConstants.FILTERTYPE_LT,
  //     fieldValue: 42,
  //   }),
  // ],
}, override);

const getQueryArgumentsProtobuf = override => Builder.encode(Adapter.encode(getQueryArguments(override)));

const getQueryArgumentsDeProtobuf = proto => Builder.encode(Adapter.encode(proto));

module.exports = {
  getQueryArguments,
  getQueryArgumentsProtobuf,
  getQueryArgumentsDeProtobuf,
};
