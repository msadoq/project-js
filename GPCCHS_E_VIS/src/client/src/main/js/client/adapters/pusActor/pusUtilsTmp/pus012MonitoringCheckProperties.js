const uINTEGER = require('../ccsds_mal/uINTEGER');
const sTRING = require('../ccsds_mal/sTRING');
const uLONG = require('../ccsds_mal/uLONG');


module.exports = {
  encode: data => ({
    rid: (data.rid !== null && typeof data.rid !== 'undefined')
      ? uINTEGER.encode(data.rid)
      : null,
    ridLabel: (data.ridLabel !== null && typeof data.ridLabel !== 'undefined')
      ? sTRING.encode(data.ridLabel)
      : null,
    ridStatus: (data.ridStatus !== null && typeof data.ridStatus !== 'undefined')
      ? uINTEGER.encode(data.ridStatus)
      : null,
    actionStatus: (data.actionStatus !== null && typeof data.actionStatus !== 'undefined')
      ? uINTEGER.encode(data.actionStatus)
      : null,
    actionName: (data.actionName !== null && typeof data.actionName !== 'undefined')
      ? sTRING.encode(data.actionName)
      : null,
    mask: (data.mask !== null && typeof data.mask !== 'undefined')
      ? sTRING.encode(data.mask)
      : null,
    value: (data.value !== null && typeof data.value !== 'undefined')
      ? sTRING.encode(data.value)
      : null,
    lastUpdateModeRid: (data.lastUpdateModeRid !== null && typeof data.lastUpdateModeRid !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeRid)
      : null,
    lastUpdateTimeRid: (data.lastUpdateTimeRid !== null && typeof data.lastUpdateTimeRid !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeRid)
      : null,
    lastUpdateModeActionStatus: (data.lastUpdateModeActionStatus !== null && typeof data.lastUpdateModeActionStatus !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeActionStatus)
      : null,
    lastUpdateTimeActionStatus: (data.lastUpdateTimeActionStatus !== null && typeof data.lastUpdateTimeActionStatus !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeActionStatus)
      : null,
    lastUpdateModeRidStatus: (data.lastUpdateModeRidStatus !== null && typeof data.lastUpdateModeRidStatus !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeRidStatus)
      : null,
    lastUpdateTimeRidStatus: (data.lastUpdateTimeRidStatus !== null && typeof data.lastUpdateTimeRidStatus !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeRidStatus)
      : null,
    lastUpdateModeMask: (data.lastUpdateModeMask !== null && typeof data.lastUpdateModeMask !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeMask)
      : null,
    lastUpdateTimeMask: (data.lastUpdateTimeMask !== null && typeof data.lastUpdateTimeMask !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeMask)
      : null,
    lastUpdateModeValue: (data.lastUpdateModeValue !== null && typeof data.lastUpdateModeValue !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeValue)
      : null,
    lastUpdateTimeValue: (data.lastUpdateTimeValue !== null && typeof data.lastUpdateTimeValue !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeValue)
      : null,
    actionTcApid: (data.actionTcApid !== null && typeof data.actionTcApid !== 'undefined')
      ? uINTEGER.encode(data.actionTcApid)
      : null,
    actionTcType: (data.actionTcType !== null && typeof data.actionTcType !== 'undefined')
      ? uINTEGER.encode(data.actionTcType)
      : null,
    actionTcSubType: (data.actionTcSubType !== null && typeof data.actionTcSubType !== 'undefined')
      ? uINTEGER.encode(data.actionTcSubType)
      : null,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.encode(data.uniqueId)
      : null,
  }),
  decode: data => ({
    rid: (data.rid !== null && typeof data.rid !== 'undefined')
      ? uINTEGER.decode(data.rid)
      : undefined,
    ridLabel: (data.ridLabel !== null && typeof data.ridLabel !== 'undefined')
      ? sTRING.decode(data.ridLabel)
      : undefined,
    ridStatus: (data.ridStatus !== null && typeof data.ridStatus !== 'undefined')
      ? uINTEGER.decode(data.ridStatus)
      : undefined,
    actionStatus: (data.actionStatus !== null && typeof data.actionStatus !== 'undefined')
      ? uINTEGER.decode(data.actionStatus)
      : undefined,
    actionName: (data.actionName !== null && typeof data.actionName !== 'undefined')
      ? sTRING.decode(data.actionName)
      : undefined,
    mask: (data.mask !== null && typeof data.mask !== 'undefined')
      ? sTRING.decode(data.mask)
      : undefined,
    value: (data.value !== null && typeof data.value !== 'undefined')
      ? sTRING.decode(data.value)
      : undefined,
    lastUpdateModeRid: (data.lastUpdateModeRid !== null && typeof data.lastUpdateModeRid !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeRid)
      : undefined,
    lastUpdateTimeRid: (data.lastUpdateTimeRid !== null && typeof data.lastUpdateTimeRid !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeRid)
      : undefined,
    lastUpdateModeActionStatus: (data.lastUpdateModeActionStatus !== null && typeof data.lastUpdateModeActionStatus !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeActionStatus)
      : undefined,
    lastUpdateTimeActionStatus: (data.lastUpdateTimeActionStatus !== null && typeof data.lastUpdateTimeActionStatus !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeActionStatus)
      : undefined,
    lastUpdateModeRidStatus: (data.lastUpdateModeRidStatus !== null && typeof data.lastUpdateModeRidStatus !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeRidStatus)
      : undefined,
    lastUpdateTimeRidStatus: (data.lastUpdateTimeRidStatus !== null && typeof data.lastUpdateTimeRidStatus !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeRidStatus)
      : undefined,
    lastUpdateModeMask: (data.lastUpdateModeMask !== null && typeof data.lastUpdateModeMask !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeMask)
      : undefined,
    lastUpdateTimeMask: (data.lastUpdateTimeMask !== null && typeof data.lastUpdateTimeMask !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeMask)
      : undefined,
    lastUpdateModeValue: (data.lastUpdateModeValue !== null && typeof data.lastUpdateModeValue !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeValue)
      : undefined,
    lastUpdateTimeValue: (data.lastUpdateTimeValue !== null && typeof data.lastUpdateTimeValue !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeValue)
      : undefined,
    actionTcApid: (data.actionTcApid !== null && typeof data.actionTcApid !== 'undefined')
      ? uINTEGER.decode(data.actionTcApid)
      : undefined,
    actionTcType: (data.actionTcType !== null && typeof data.actionTcType !== 'undefined')
      ? uINTEGER.decode(data.actionTcType)
      : undefined,
    actionTcSubType: (data.actionTcSubType !== null && typeof data.actionTcSubType !== 'undefined')
      ? uINTEGER.decode(data.actionTcSubType)
      : undefined,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.decode(data.uniqueId)
      : undefined,
  }),
};
