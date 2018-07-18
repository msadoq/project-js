const _string = require('../ccsds_mal/sTRING');
const uinteger = require('../ccsds_mal/uINTEGER');
const ulong = require('../ccsds_mal/uLONG');

module.exports = {
  encode: data => ({
    parameterId: (data.parameterId !== null && typeof data.parameterId !== 'undefined')
    ? uinteger.encode(data.parameterId)
    : null,
    parameterName: (data.parameterName !== null && typeof data.parameterName !== 'undefined')
    ? _string.encode(data.parameterName)
    : null,
    parameterOrder: (data.parameterOrder !== null && typeof data.parameterOrder !== 'undefined')
    ? uinteger.encode(data.parameterOrder)
    : null,
    parameterFilteredStatus: (data.parameterFilteredStatus !== null && typeof data.parameterFilteredStatus !== 'undefined')
    ? _string.encode(data.parameterFilteredStatus)
    : null,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
    ? ulong.encode(data.uniqueId)
    : null,
    lastUpdateModeStoreId: (data.lastUpdateModeStoreId !== null && typeof data.lastUpdateModeStoreId !== 'undefined')
    ? uinteger.encode(data.lastUpdateModeStoreId)
    : null,
    lastUpdateTimeStoreId: (data.lastUpdateTimeStoreId !== null && typeof data.lastUpdateTimeStoreId !== 'undefined')
    ? _string.encode(data.lastUpdateTimeStoreId)
    : null,
    lastUpdateModeFilteredStatus: (data.lastUpdateModeFilteredStatus !== null && typeof data.lastUpdateModeFilteredStatus !== 'undefined')
    ? uinteger.encode(data.lastUpdateModeFilteredStatus)
    : null,
    lastUpdateTimeFilteredStatus: (data.lastUpdateTimeFilteredStatus !== null && typeof data.lastUpdateTimeFilteredStatus !== 'undefined')
    ? _string.encode(data.lastUpdateTimeFilteredStatus)
    : null,
  }),
  decode: data => ({
    parameterId: (data.parameterId !== null && typeof data.parameterId !== 'undefined')
    ? uinteger.decode(data.parameterId)
    : null,
    parameterName: (data.parameterName !== null && typeof data.parameterName !== 'undefined')
    ? _string.decode(data.parameterName)
    : null,
    parameterOrder: (data.parameterOrder !== null && typeof data.parameterOrder !== 'undefined')
    ? uinteger.decode(data.parameterOrder)
    : null,
    parameterFilteredStatus: (data.parameterFilteredStatus !== null && typeof data.parameterFilteredStatus !== 'undefined')
    ? _string.decode(data.parameterFilteredStatus)
    : null,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
    ? ulong.decode(data.uniqueId)
    : null,
    lastUpdateModeStoreId: (data.lastUpdateModeStoreId !== null && typeof data.lastUpdateModeStoreId !== 'undefined')
    ? uinteger.decode(data.lastUpdateModeStoreId)
    : null,
    lastUpdateTimeStoreId: (data.lastUpdateTimeStoreId !== null && typeof data.lastUpdateTimeStoreId !== 'undefined')
    ? _string.decode(data.lastUpdateTimeStoreId)
    : null,
    lastUpdateModeFilteredStatus: (data.lastUpdateModeFilteredStatus !== null && typeof data.lastUpdateModeFilteredStatus !== 'undefined')
    ? uinteger.decode(data.lastUpdateModeFilteredStatus)
    : null,
    lastUpdateTimeFilteredStatus: (data.lastUpdateTimeFilteredStatus !== null && typeof data.lastUpdateTimeFilteredStatus !== 'undefined')
    ? _string.decode(data.lastUpdateTimeFilteredStatus)
    : null,
  }),
};
