// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const sTRING = require('../ccsds_mal/sTRING');
const uINTEGER = require('../ccsds_mal/uINTEGER');
const uLONG = require('../ccsds_mal/uLONG');

module.exports = {
  encode: data => ({
    parameterId: (data.parameterId !== null && typeof data.parameterId !== 'undefined')
      ? uINTEGER.encode(data.parameterId)
      : null,
    parameterName: (data.parameterName !== null && typeof data.parameterName !== 'undefined')
      ? sTRING.encode(data.parameterName)
      : null,
    parameterOrder: (data.parameterOrder !== null && typeof data.parameterOrder !== 'undefined')
      ? uINTEGER.encode(data.parameterOrder)
      : null,
    parameterFilteredStatus: (data.parameterFilteredStatus !== null && typeof data.parameterFilteredStatus !== 'undefined')
      ? sTRING.encode(data.parameterFilteredStatus)
      : null,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.encode(data.uniqueId)
      : null,
    lastUpdateModeStoreId: (data.lastUpdateModeStoreId !== null && typeof data.lastUpdateModeStoreId !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeStoreId)
      : null,
    lastUpdateTimeStoreId: (data.lastUpdateTimeStoreId !== null && typeof data.lastUpdateTimeStoreId !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeStoreId)
      : null,
    lastUpdateModeFilteredStatus: (data.lastUpdateModeFilteredStatus !== null && typeof data.lastUpdateModeFilteredStatus !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeFilteredStatus)
      : null,
    lastUpdateTimeFilteredStatus: (data.lastUpdateTimeFilteredStatus !== null && typeof data.lastUpdateTimeFilteredStatus !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeFilteredStatus)
      : null,
  }),
  decode: data => ({
    parameterId: (data.parameterId !== null && typeof data.parameterId !== 'undefined')
      ? uINTEGER.decode(data.parameterId)
      : undefined,
    parameterName: (data.parameterName !== null && typeof data.parameterName !== 'undefined')
      ? sTRING.decode(data.parameterName)
      : undefined,
    parameterOrder: (data.parameterOrder !== null && typeof data.parameterOrder !== 'undefined')
      ? uINTEGER.decode(data.parameterOrder)
      : undefined,
    parameterFilteredStatus: (data.parameterFilteredStatus !== null && typeof data.parameterFilteredStatus !== 'undefined')
      ? sTRING.decode(data.parameterFilteredStatus)
      : undefined,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.decode(data.uniqueId)
      : undefined,
    lastUpdateModeStoreId: (data.lastUpdateModeStoreId !== null && typeof data.lastUpdateModeStoreId !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeStoreId)
      : undefined,
    lastUpdateTimeStoreId: (data.lastUpdateTimeStoreId !== null && typeof data.lastUpdateTimeStoreId !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeStoreId)
      : undefined,
    lastUpdateModeFilteredStatus: (data.lastUpdateModeFilteredStatus !== null && typeof data.lastUpdateModeFilteredStatus !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeFilteredStatus)
      : undefined,
    lastUpdateTimeFilteredStatus: (data.lastUpdateTimeFilteredStatus !== null && typeof data.lastUpdateTimeFilteredStatus !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeFilteredStatus)
      : undefined,
  }),
};
