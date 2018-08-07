// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const sTRING = require('../ccsds_mal/sTRING');
const uINTEGER = require('../ccsds_mal/uINTEGER');
const uLONG = require('../ccsds_mal/uLONG');

module.exports = {
  encode: data => ({
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? uINTEGER.encode(data.apid)
      : null,
    rid: (data.rid !== null && typeof data.rid !== 'undefined')
      ? uINTEGER.encode(data.rid)
      : null,
    actionStatus: (data.actionStatus !== null && typeof data.actionStatus !== 'undefined')
      ? uINTEGER.encode(data.actionStatus)
      : null,
    actionTcPacket: (data.actionTcPacket !== null && typeof data.actionTcPacket !== 'undefined')
      ? sTRING.encode(data.actionTcPacket)
      : null,
    ridLabel: (data.ridLabel !== null && typeof data.ridLabel !== 'undefined')
      ? sTRING.encode(data.ridLabel)
      : null,
    lastUpdateModeActionStatus: (data.lastUpdateModeActionStatus !== null && typeof data.lastUpdateModeActionStatus !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeActionStatus)
      : null,
    lastUpdateTimeActionStatus: (data.lastUpdateTimeActionStatus !== null && typeof data.lastUpdateTimeActionStatus !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeActionStatus)
      : null,
    lastUpdateModeEventActionRid: (data.lastUpdateModeEventActionRid !== null && typeof data.lastUpdateModeEventActionRid !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeEventActionRid)
      : null,
    lastUpdateTimeEventActionRid: (data.lastUpdateTimeEventActionRid !== null && typeof data.lastUpdateTimeEventActionRid !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeEventActionRid)
      : null,
    lastUpdateModeActionTc: (data.lastUpdateModeActionTc !== null && typeof data.lastUpdateModeActionTc !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeActionTc)
      : null,
    lastUpdateTimeActionTc: (data.lastUpdateTimeActionTc !== null && typeof data.lastUpdateTimeActionTc !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeActionTc)
      : null,
    packetName: (data.packetName !== null && typeof data.packetName !== 'undefined')
      ? sTRING.encode(data.packetName)
      : null,
    actionName: (data.actionName !== null && typeof data.actionName !== 'undefined')
      ? sTRING.encode(data.actionName)
      : null,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.encode(data.uniqueId)
      : null,
    serviceApid: (data.serviceApid !== null && typeof data.serviceApid !== 'undefined')
      ? uINTEGER.encode(data.serviceApid)
      : null,
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
      ? sTRING.encode(data.serviceApidName)
      : null,
    apidName: (data.apidName !== null && typeof data.apidName !== 'undefined')
      ? sTRING.encode(data.apidName)
      : null,
    actionDescription: (data.actionDescription !== null && typeof data.actionDescription !== 'undefined')
      ? sTRING.encode(data.actionDescription)
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
  }),
  decode: data => ({
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? uINTEGER.decode(data.apid)
      : undefined,
    rid: (data.rid !== null && typeof data.rid !== 'undefined')
      ? uINTEGER.decode(data.rid)
      : undefined,
    actionStatus: (data.actionStatus !== null && typeof data.actionStatus !== 'undefined')
      ? uINTEGER.decode(data.actionStatus)
      : undefined,
    actionTcPacket: (data.actionTcPacket !== null && typeof data.actionTcPacket !== 'undefined')
      ? sTRING.decode(data.actionTcPacket)
      : undefined,
    ridLabel: (data.ridLabel !== null && typeof data.ridLabel !== 'undefined')
      ? sTRING.decode(data.ridLabel)
      : undefined,
    lastUpdateModeActionStatus: (data.lastUpdateModeActionStatus !== null && typeof data.lastUpdateModeActionStatus !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeActionStatus)
      : undefined,
    lastUpdateTimeActionStatus: (data.lastUpdateTimeActionStatus !== null && typeof data.lastUpdateTimeActionStatus !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeActionStatus)
      : undefined,
    lastUpdateModeEventActionRid: (data.lastUpdateModeEventActionRid !== null && typeof data.lastUpdateModeEventActionRid !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeEventActionRid)
      : undefined,
    lastUpdateTimeEventActionRid: (data.lastUpdateTimeEventActionRid !== null && typeof data.lastUpdateTimeEventActionRid !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeEventActionRid)
      : undefined,
    lastUpdateModeActionTc: (data.lastUpdateModeActionTc !== null && typeof data.lastUpdateModeActionTc !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeActionTc)
      : undefined,
    lastUpdateTimeActionTc: (data.lastUpdateTimeActionTc !== null && typeof data.lastUpdateTimeActionTc !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeActionTc)
      : undefined,
    packetName: (data.packetName !== null && typeof data.packetName !== 'undefined')
      ? sTRING.decode(data.packetName)
      : undefined,
    actionName: (data.actionName !== null && typeof data.actionName !== 'undefined')
      ? sTRING.decode(data.actionName)
      : undefined,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.decode(data.uniqueId)
      : undefined,
    serviceApid: (data.serviceApid !== null && typeof data.serviceApid !== 'undefined')
      ? uINTEGER.decode(data.serviceApid)
      : undefined,
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
      ? sTRING.decode(data.serviceApidName)
      : undefined,
    apidName: (data.apidName !== null && typeof data.apidName !== 'undefined')
      ? sTRING.decode(data.apidName)
      : undefined,
    actionDescription: (data.actionDescription !== null && typeof data.actionDescription !== 'undefined')
      ? sTRING.decode(data.actionDescription)
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
  }),
};
