// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const sTRING = require('../ccsds_mal/sTRING');
const tIME = require('../ccsds_mal/tIME');
const uINTEGER = require('../ccsds_mal/uINTEGER');
const uOCTET = require('../ccsds_mal/uOCTET');

module.exports = {
  encode: data => ({
    ridStatus: (data.ridStatus !== null && typeof data.ridStatus !== 'undefined')
      ? uOCTET.encode(data.ridStatus)
      : null,
    actionStatus: (data.actionStatus !== null && typeof data.actionStatus !== 'undefined')
      ? uOCTET.encode(data.actionStatus)
      : null,
    value: (data.value !== null && typeof data.value !== 'undefined')
      ? sTRING.encode(data.value)
      : null,
    rid: (data.rid !== null && typeof data.rid !== 'undefined')
      ? uINTEGER.encode(data.rid)
      : null,
    mask: (data.mask !== null && typeof data.mask !== 'undefined')
      ? sTRING.encode(data.mask)
      : null,
    actionName: (data.actionName !== null && typeof data.actionName !== 'undefined')
      ? sTRING.encode(data.actionName)
      : null,
    ridLabel: (data.ridLabel !== null && typeof data.ridLabel !== 'undefined')
      ? sTRING.encode(data.ridLabel)
      : null,
    lastUpdateModeRid: (data.lastUpdateModeRid !== null && typeof data.lastUpdateModeRid !== 'undefined')
      ? uOCTET.encode(data.lastUpdateModeRid)
      : null,
    lastUpdateTimeRid: (data.lastUpdateTimeRid !== null && typeof data.lastUpdateTimeRid !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeRid)
      : null,
    lastUpdateModeActionStatus: (data.lastUpdateModeActionStatus !== null && typeof data.lastUpdateModeActionStatus !== 'undefined')
      ? uOCTET.encode(data.lastUpdateModeActionStatus)
      : null,
    lastUpdateTimeActionStatus: (data.lastUpdateTimeActionStatus !== null && typeof data.lastUpdateTimeActionStatus !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeActionStatus)
      : null,
    lastUpdateModeRidStatus: (data.lastUpdateModeRidStatus !== null && typeof data.lastUpdateModeRidStatus !== 'undefined')
      ? uOCTET.encode(data.lastUpdateModeRidStatus)
      : null,
    lastUpdateTimeRidStatus: (data.lastUpdateTimeRidStatus !== null && typeof data.lastUpdateTimeRidStatus !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeRidStatus)
      : null,
    lastUpdateModeMask: (data.lastUpdateModeMask !== null && typeof data.lastUpdateModeMask !== 'undefined')
      ? uOCTET.encode(data.lastUpdateModeMask)
      : null,
    lastUpdateTimeMask: (data.lastUpdateTimeMask !== null && typeof data.lastUpdateTimeMask !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeMask)
      : null,
    lastUpdateModeValue: (data.lastUpdateModeValue !== null && typeof data.lastUpdateModeValue !== 'undefined')
      ? uOCTET.encode(data.lastUpdateModeValue)
      : null,
    lastUpdateTimeValue: (data.lastUpdateTimeValue !== null && typeof data.lastUpdateTimeValue !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeValue)
      : null,
  }),
  decode: data => ({
    ridStatus: (data.ridStatus !== null && typeof data.ridStatus !== 'undefined')
      ? uOCTET.decode(data.ridStatus)
      : undefined,
    actionStatus: (data.actionStatus !== null && typeof data.actionStatus !== 'undefined')
      ? uOCTET.decode(data.actionStatus)
      : undefined,
    value: (data.value !== null && typeof data.value !== 'undefined')
      ? sTRING.decode(data.value)
      : undefined,
    rid: (data.rid !== null && typeof data.rid !== 'undefined')
      ? uINTEGER.decode(data.rid)
      : undefined,
    mask: (data.mask !== null && typeof data.mask !== 'undefined')
      ? sTRING.decode(data.mask)
      : undefined,
    actionName: (data.actionName !== null && typeof data.actionName !== 'undefined')
      ? sTRING.decode(data.actionName)
      : undefined,
    ridLabel: (data.ridLabel !== null && typeof data.ridLabel !== 'undefined')
      ? sTRING.decode(data.ridLabel)
      : undefined,
    lastUpdateModeRid: (data.lastUpdateModeRid !== null && typeof data.lastUpdateModeRid !== 'undefined')
      ? uOCTET.decode(data.lastUpdateModeRid)
      : undefined,
    lastUpdateTimeRid: (data.lastUpdateTimeRid !== null && typeof data.lastUpdateTimeRid !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeRid)
      : undefined,
    lastUpdateModeActionStatus: (data.lastUpdateModeActionStatus !== null && typeof data.lastUpdateModeActionStatus !== 'undefined')
      ? uOCTET.decode(data.lastUpdateModeActionStatus)
      : undefined,
    lastUpdateTimeActionStatus: (data.lastUpdateTimeActionStatus !== null && typeof data.lastUpdateTimeActionStatus !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeActionStatus)
      : undefined,
    lastUpdateModeRidStatus: (data.lastUpdateModeRidStatus !== null && typeof data.lastUpdateModeRidStatus !== 'undefined')
      ? uOCTET.decode(data.lastUpdateModeRidStatus)
      : undefined,
    lastUpdateTimeRidStatus: (data.lastUpdateTimeRidStatus !== null && typeof data.lastUpdateTimeRidStatus !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeRidStatus)
      : undefined,
    lastUpdateModeMask: (data.lastUpdateModeMask !== null && typeof data.lastUpdateModeMask !== 'undefined')
      ? uOCTET.decode(data.lastUpdateModeMask)
      : undefined,
    lastUpdateTimeMask: (data.lastUpdateTimeMask !== null && typeof data.lastUpdateTimeMask !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeMask)
      : undefined,
    lastUpdateModeValue: (data.lastUpdateModeValue !== null && typeof data.lastUpdateModeValue !== 'undefined')
      ? uOCTET.decode(data.lastUpdateModeValue)
      : undefined,
    lastUpdateTimeValue: (data.lastUpdateTimeValue !== null && typeof data.lastUpdateTimeValue !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeValue)
      : undefined,
  }),
};
