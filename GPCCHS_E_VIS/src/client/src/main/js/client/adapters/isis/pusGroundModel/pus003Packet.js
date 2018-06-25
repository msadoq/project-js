// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const pusElement = require('./pusElement');
const sTRING = require('../ccsds_mal/sTRING');
const tIME = require('../ccsds_mal/tIME');
const uINTEGER = require('../ccsds_mal/uINTEGER');
const uOCTET = require('../ccsds_mal/uOCTET');

module.exports = {
  encode: data => ({
    sid: (data.sid !== null && typeof data.sid !== 'undefined')
      ? uINTEGER.encode(data.sid)
      : null,
    validityParameterId: (data.validityParameterId !== null && typeof data.validityParameterId !== 'undefined')
      ? uINTEGER.encode(data.validityParameterId)
      : null,
    validityParameterMask: (data.validityParameterMask !== null && typeof data.validityParameterMask !== 'undefined')
      ? sTRING.encode(data.validityParameterMask)
      : null,
    validityParameterExpectedValue: (data.validityParameterExpectedValue !== null && typeof data.validityParameterExpectedValue !== 'undefined')
      ? sTRING.encode(data.validityParameterExpectedValue)
      : null,
    collectionInterval: (data.collectionInterval !== null && typeof data.collectionInterval !== 'undefined')
      ? uINTEGER.encode(data.collectionInterval)
      : null,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uOCTET.encode(data.status)
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
    sidLabel: (data.sidLabel !== null && typeof data.sidLabel !== 'undefined')
      ? sTRING.encode(data.sidLabel)
      : null,
    isCollectionIntervalSet: (data.isCollectionIntervalSet !== null && typeof data.isCollectionIntervalSet !== 'undefined')
      ? bOOLEAN.encode(data.isCollectionIntervalSet)
      : null,
    lastUpdateModeSid: (data.lastUpdateModeSid !== null && typeof data.lastUpdateModeSid !== 'undefined')
      ? uOCTET.encode(data.lastUpdateModeSid)
      : null,
    lastUpdateTimeSid: (data.lastUpdateTimeSid !== null && typeof data.lastUpdateTimeSid !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeSid)
      : null,
    lastUpdateModeStatus: (data.lastUpdateModeStatus !== null && typeof data.lastUpdateModeStatus !== 'undefined')
      ? uOCTET.encode(data.lastUpdateModeStatus)
      : null,
    lastUpdateTimeStatus: (data.lastUpdateTimeStatus !== null && typeof data.lastUpdateTimeStatus !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeStatus)
      : null,
    lastUpdateModeValidParamId: (data.lastUpdateModeValidParamId !== null && typeof data.lastUpdateModeValidParamId !== 'undefined')
      ? uOCTET.encode(data.lastUpdateModeValidParamId)
      : null,
    lastUpdateTimeValidParamId: (data.lastUpdateTimeValidParamId !== null && typeof data.lastUpdateTimeValidParamId !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeValidParamId)
      : null,
    lastUpdateModeValidParamMask: (data.lastUpdateModeValidParamMask !== null && typeof data.lastUpdateModeValidParamMask !== 'undefined')
      ? uOCTET.encode(data.lastUpdateModeValidParamMask)
      : null,
    lastUpdateTimeValidParamMask: (data.lastUpdateTimeValidParamMask !== null && typeof data.lastUpdateTimeValidParamMask !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeValidParamMask)
      : null,
    lastUpdateModeValidParamExpValue: (data.lastUpdateModeValidParamExpValue !== null && typeof data.lastUpdateModeValidParamExpValue !== 'undefined')
      ? uOCTET.encode(data.lastUpdateModeValidParamExpValue)
      : null,
    lastUpdateTimeValidParamExpValue: (data.lastUpdateTimeValidParamExpValue !== null && typeof data.lastUpdateTimeValidParamExpValue !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeValidParamExpValue)
      : null,
    lastUpdateModeCollectInterval: (data.lastUpdateModeCollectInterval !== null && typeof data.lastUpdateModeCollectInterval !== 'undefined')
      ? uOCTET.encode(data.lastUpdateModeCollectInterval)
      : null,
    lastUpdateTimeCollectInterval: (data.lastUpdateTimeCollectInterval !== null && typeof data.lastUpdateTimeCollectInterval !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeCollectInterval)
      : null,
  }),
  decode: data => ({
    sid: (data.sid !== null && typeof data.sid !== 'undefined')
      ? uINTEGER.decode(data.sid)
      : undefined,
    validityParameterId: (data.validityParameterId !== null && typeof data.validityParameterId !== 'undefined')
      ? uINTEGER.decode(data.validityParameterId)
      : undefined,
    validityParameterMask: (data.validityParameterMask !== null && typeof data.validityParameterMask !== 'undefined')
      ? sTRING.decode(data.validityParameterMask)
      : undefined,
    validityParameterExpectedValue: (data.validityParameterExpectedValue !== null && typeof data.validityParameterExpectedValue !== 'undefined')
      ? sTRING.decode(data.validityParameterExpectedValue)
      : undefined,
    collectionInterval: (data.collectionInterval !== null && typeof data.collectionInterval !== 'undefined')
      ? uINTEGER.decode(data.collectionInterval)
      : undefined,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? uOCTET.decode(data.status)
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
    sidLabel: (data.sidLabel !== null && typeof data.sidLabel !== 'undefined')
      ? sTRING.decode(data.sidLabel)
      : undefined,
    isCollectionIntervalSet: (data.isCollectionIntervalSet !== null && typeof data.isCollectionIntervalSet !== 'undefined')
      ? bOOLEAN.decode(data.isCollectionIntervalSet)
      : undefined,
    lastUpdateModeSid: (data.lastUpdateModeSid !== null && typeof data.lastUpdateModeSid !== 'undefined')
      ? uOCTET.decode(data.lastUpdateModeSid)
      : undefined,
    lastUpdateTimeSid: (data.lastUpdateTimeSid !== null && typeof data.lastUpdateTimeSid !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeSid)
      : undefined,
    lastUpdateModeStatus: (data.lastUpdateModeStatus !== null && typeof data.lastUpdateModeStatus !== 'undefined')
      ? uOCTET.decode(data.lastUpdateModeStatus)
      : undefined,
    lastUpdateTimeStatus: (data.lastUpdateTimeStatus !== null && typeof data.lastUpdateTimeStatus !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeStatus)
      : undefined,
    lastUpdateModeValidParamId: (data.lastUpdateModeValidParamId !== null && typeof data.lastUpdateModeValidParamId !== 'undefined')
      ? uOCTET.decode(data.lastUpdateModeValidParamId)
      : undefined,
    lastUpdateTimeValidParamId: (data.lastUpdateTimeValidParamId !== null && typeof data.lastUpdateTimeValidParamId !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeValidParamId)
      : undefined,
    lastUpdateModeValidParamMask: (data.lastUpdateModeValidParamMask !== null && typeof data.lastUpdateModeValidParamMask !== 'undefined')
      ? uOCTET.decode(data.lastUpdateModeValidParamMask)
      : undefined,
    lastUpdateTimeValidParamMask: (data.lastUpdateTimeValidParamMask !== null && typeof data.lastUpdateTimeValidParamMask !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeValidParamMask)
      : undefined,
    lastUpdateModeValidParamExpValue: (data.lastUpdateModeValidParamExpValue !== null && typeof data.lastUpdateModeValidParamExpValue !== 'undefined')
      ? uOCTET.decode(data.lastUpdateModeValidParamExpValue)
      : undefined,
    lastUpdateTimeValidParamExpValue: (data.lastUpdateTimeValidParamExpValue !== null && typeof data.lastUpdateTimeValidParamExpValue !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeValidParamExpValue)
      : undefined,
    lastUpdateModeCollectInterval: (data.lastUpdateModeCollectInterval !== null && typeof data.lastUpdateModeCollectInterval !== 'undefined')
      ? uOCTET.decode(data.lastUpdateModeCollectInterval)
      : undefined,
    lastUpdateTimeCollectInterval: (data.lastUpdateTimeCollectInterval !== null && typeof data.lastUpdateTimeCollectInterval !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeCollectInterval)
      : undefined,
  }),
};
