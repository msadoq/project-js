// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const bLOB = require('../ccsds_mal/bLOB');
const pusElement = require('./pusElement');
const sTRING = require('../ccsds_mal/sTRING');
const tIME = require('../ccsds_mal/tIME');
const uINTEGER = require('../ccsds_mal/uINTEGER');
const uOCTET = require('../ccsds_mal/uOCTET');

module.exports = {
  encode: data => ({
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? uINTEGER.encode(data.apid)
      : null,
    rid: (data.rid !== null && typeof data.rid !== 'undefined')
      ? uINTEGER.encode(data.rid)
      : null,
    actionStatus: (data.actionStatus !== null && typeof data.actionStatus !== 'undefined')
      ? uOCTET.encode(data.actionStatus)
      : null,
    actionTcPacketHeader: (data.actionTcPacketHeader !== null && typeof data.actionTcPacketHeader !== 'undefined')
      ? bLOB.encode(data.actionTcPacketHeader)
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
    ridLabel: (data.ridLabel !== null && typeof data.ridLabel !== 'undefined')
      ? sTRING.encode(data.ridLabel)
      : null,
    lastUpdateModeActionStatus: (data.lastUpdateModeActionStatus !== null && typeof data.lastUpdateModeActionStatus !== 'undefined')
      ? uOCTET.encode(data.lastUpdateModeActionStatus)
      : null,
    lastUpdateTimeActionStatus: (data.lastUpdateTimeActionStatus !== null && typeof data.lastUpdateTimeActionStatus !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeActionStatus)
      : null,
    lastUpdateModeEventActionRid: (data.lastUpdateModeEventActionRid !== null && typeof data.lastUpdateModeEventActionRid !== 'undefined')
      ? uOCTET.encode(data.lastUpdateModeEventActionRid)
      : null,
    lastUpdateTimeEventActionRid: (data.lastUpdateTimeEventActionRid !== null && typeof data.lastUpdateTimeEventActionRid !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeEventActionRid)
      : null,
    lastUpdateModeActionTc: (data.lastUpdateModeActionTc !== null && typeof data.lastUpdateModeActionTc !== 'undefined')
      ? uOCTET.encode(data.lastUpdateModeActionTc)
      : null,
    lastUpdateTimeActionTc: (data.lastUpdateTimeActionTc !== null && typeof data.lastUpdateTimeActionTc !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeActionTc)
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
      ? uOCTET.decode(data.actionStatus)
      : undefined,
    actionTcPacketHeader: (data.actionTcPacketHeader !== null && typeof data.actionTcPacketHeader !== 'undefined')
      ? bLOB.decode(data.actionTcPacketHeader)
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
    ridLabel: (data.ridLabel !== null && typeof data.ridLabel !== 'undefined')
      ? sTRING.decode(data.ridLabel)
      : undefined,
    lastUpdateModeActionStatus: (data.lastUpdateModeActionStatus !== null && typeof data.lastUpdateModeActionStatus !== 'undefined')
      ? uOCTET.decode(data.lastUpdateModeActionStatus)
      : undefined,
    lastUpdateTimeActionStatus: (data.lastUpdateTimeActionStatus !== null && typeof data.lastUpdateTimeActionStatus !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeActionStatus)
      : undefined,
    lastUpdateModeEventActionRid: (data.lastUpdateModeEventActionRid !== null && typeof data.lastUpdateModeEventActionRid !== 'undefined')
      ? uOCTET.decode(data.lastUpdateModeEventActionRid)
      : undefined,
    lastUpdateTimeEventActionRid: (data.lastUpdateTimeEventActionRid !== null && typeof data.lastUpdateTimeEventActionRid !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeEventActionRid)
      : undefined,
    lastUpdateModeActionTc: (data.lastUpdateModeActionTc !== null && typeof data.lastUpdateModeActionTc !== 'undefined')
      ? uOCTET.decode(data.lastUpdateModeActionTc)
      : undefined,
    lastUpdateTimeActionTc: (data.lastUpdateTimeActionTc !== null && typeof data.lastUpdateTimeActionTc !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeActionTc)
      : undefined,
  }),
};
