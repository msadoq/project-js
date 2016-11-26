const protobuf = require('../../../../protobuf');
const globalConstants = require('../../../../constants');
const applyOverride = require('../../applyOverride');

const { getFilter } = require('./filter');

const getQueryArguments = override => applyOverride({
  /* sortFieldName: 'groundDate',
  sortOrder: globalConstants.SORTORDER_ASC,
  limitStart: 0,
  limitNumber: 1e9,
  getLastType: globalConstants.GETLASTTYPE_GET_N_LAST,
  getLastFromTime: stubs.getTimestamp(),
  getLastNumber: 42,*/
  filters: [
    getFilter(),
    getFilter({
      fieldName: 'groundDate',
      type: globalConstants.FILTERTYPE_LT,
      fieldValue: 42,
    }),
  ],
}, override);

const getQueryArgumentsProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.QueryArguments',
  getQueryArguments(override)
);

const getQueryArgumentsDeProtobuf = (proto) => protobuf.decode(
  'dc.dataControllerUtils.QueryArguments',
  proto
);

module.exports = {
  getQueryArguments,
  getQueryArgumentsProtobuf,
  getQueryArgumentsDeProtobuf,
};
