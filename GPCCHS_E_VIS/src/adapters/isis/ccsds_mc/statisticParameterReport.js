// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const bLOB = require('../ccsds_mal/bLOB');
const objectKey = require('../ccsds_com/objectKey');
const objectType = require('../ccsds_com/objectType');
const statisticFunctionValue = require('./statisticFunctionValue');

module.exports = {
  encode: data => ({
    parameterId: (data.parameterId !== null && typeof data.parameterId !== 'undefined')
      ? bLOB.encode(objectKey.encodeRaw(data.parameterId))
      : null,
    values: _map(data.values, d => (statisticFunctionValue.encode(d))),
    parameterType: (data.parameterType !== null && typeof data.parameterType !== 'undefined')
      ? bLOB.encode(objectType.encodeRaw(data.parameterType))
      : null,
  }),
  decode: data => ({
    parameterId: (data.parameterId !== null && typeof data.parameterId !== 'undefined')
      ? objectKey.decodeRaw(bLOB.decode(data.parameterId).value)
      : undefined,
    values: _map(data.values, d => (statisticFunctionValue.decode(d))),
    parameterType: (data.parameterType !== null && typeof data.parameterType !== 'undefined')
      ? objectType.decodeRaw(bLOB.decode(data.parameterType).value)
      : undefined,
  }),
};
