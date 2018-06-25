// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const pusElement = require('./pusElement');
const pusParameter = require('./pusParameter');
const sTRING = require('../ccsds_mal/sTRING');
const tIME = require('../ccsds_mal/tIME');
const uINTEGER = require('../ccsds_mal/uINTEGER');
const uOCTET = require('../ccsds_mal/uOCTET');

module.exports = {
  encode: data => ({
    id: (data.id !== null && typeof data.id !== 'undefined')
      ? uINTEGER.encode(data.id)
      : null,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? sTRING.encode(data.status)
      : null,
    stepId: (data.stepId !== null && typeof data.stepId !== 'undefined')
      ? sTRING.encode(data.stepId)
      : null,
    partitionId: (data.partitionId !== null && typeof data.partitionId !== 'undefined')
      ? sTRING.encode(data.partitionId)
      : null,
    observabilityLevel: (data.observabilityLevel !== null && typeof data.observabilityLevel !== 'undefined')
      ? sTRING.encode(data.observabilityLevel)
      : null,
    priority: (data.priority !== null && typeof data.priority !== 'undefined')
      ? sTRING.encode(data.priority)
      : null,
    pus18Parameter: _map(data.pus18Parameter, d => (pusParameter.encode(d))),
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
    lastUpdateModeStatus: (data.lastUpdateModeStatus !== null && typeof data.lastUpdateModeStatus !== 'undefined')
      ? uOCTET.encode(data.lastUpdateModeStatus)
      : null,
    lastUpdateTimeStatus: (data.lastUpdateTimeStatus !== null && typeof data.lastUpdateTimeStatus !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeStatus)
      : null,
    lastUpdateModeStepId: (data.lastUpdateModeStepId !== null && typeof data.lastUpdateModeStepId !== 'undefined')
      ? uOCTET.encode(data.lastUpdateModeStepId)
      : null,
    lastUpdateTimeStepId: (data.lastUpdateTimeStepId !== null && typeof data.lastUpdateTimeStepId !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeStepId)
      : null,
    lastUpdateModePartitionId: (data.lastUpdateModePartitionId !== null && typeof data.lastUpdateModePartitionId !== 'undefined')
      ? uOCTET.encode(data.lastUpdateModePartitionId)
      : null,
    lastUpdateTimePartitionId: (data.lastUpdateTimePartitionId !== null && typeof data.lastUpdateTimePartitionId !== 'undefined')
      ? tIME.encode(data.lastUpdateTimePartitionId)
      : null,
    lastUpdateModePriority: (data.lastUpdateModePriority !== null && typeof data.lastUpdateModePriority !== 'undefined')
      ? uOCTET.encode(data.lastUpdateModePriority)
      : null,
    lastUpdateTimePriority: (data.lastUpdateTimePriority !== null && typeof data.lastUpdateTimePriority !== 'undefined')
      ? tIME.encode(data.lastUpdateTimePriority)
      : null,
    lastUpdateModeObsLevel: (data.lastUpdateModeObsLevel !== null && typeof data.lastUpdateModeObsLevel !== 'undefined')
      ? uOCTET.encode(data.lastUpdateModeObsLevel)
      : null,
    lastUpdateTimeObsLevel: (data.lastUpdateTimeObsLevel !== null && typeof data.lastUpdateTimeObsLevel !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeObsLevel)
      : null,
    lastUpdateModeObcpId: (data.lastUpdateModeObcpId !== null && typeof data.lastUpdateModeObcpId !== 'undefined')
      ? uOCTET.encode(data.lastUpdateModeObcpId)
      : null,
    lastUpdateTimeObcpId: (data.lastUpdateTimeObcpId !== null && typeof data.lastUpdateTimeObcpId !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeObcpId)
      : null,
  }),
  decode: data => ({
    id: (data.id !== null && typeof data.id !== 'undefined')
      ? uINTEGER.decode(data.id)
      : undefined,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? sTRING.decode(data.status)
      : undefined,
    stepId: (data.stepId !== null && typeof data.stepId !== 'undefined')
      ? sTRING.decode(data.stepId)
      : undefined,
    partitionId: (data.partitionId !== null && typeof data.partitionId !== 'undefined')
      ? sTRING.decode(data.partitionId)
      : undefined,
    observabilityLevel: (data.observabilityLevel !== null && typeof data.observabilityLevel !== 'undefined')
      ? sTRING.decode(data.observabilityLevel)
      : undefined,
    priority: (data.priority !== null && typeof data.priority !== 'undefined')
      ? sTRING.decode(data.priority)
      : undefined,
    pus18Parameter: _map(data.pus18Parameter, d => (pusParameter.decode(d))),
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
    lastUpdateModeStatus: (data.lastUpdateModeStatus !== null && typeof data.lastUpdateModeStatus !== 'undefined')
      ? uOCTET.decode(data.lastUpdateModeStatus)
      : undefined,
    lastUpdateTimeStatus: (data.lastUpdateTimeStatus !== null && typeof data.lastUpdateTimeStatus !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeStatus)
      : undefined,
    lastUpdateModeStepId: (data.lastUpdateModeStepId !== null && typeof data.lastUpdateModeStepId !== 'undefined')
      ? uOCTET.decode(data.lastUpdateModeStepId)
      : undefined,
    lastUpdateTimeStepId: (data.lastUpdateTimeStepId !== null && typeof data.lastUpdateTimeStepId !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeStepId)
      : undefined,
    lastUpdateModePartitionId: (data.lastUpdateModePartitionId !== null && typeof data.lastUpdateModePartitionId !== 'undefined')
      ? uOCTET.decode(data.lastUpdateModePartitionId)
      : undefined,
    lastUpdateTimePartitionId: (data.lastUpdateTimePartitionId !== null && typeof data.lastUpdateTimePartitionId !== 'undefined')
      ? tIME.decode(data.lastUpdateTimePartitionId)
      : undefined,
    lastUpdateModePriority: (data.lastUpdateModePriority !== null && typeof data.lastUpdateModePriority !== 'undefined')
      ? uOCTET.decode(data.lastUpdateModePriority)
      : undefined,
    lastUpdateTimePriority: (data.lastUpdateTimePriority !== null && typeof data.lastUpdateTimePriority !== 'undefined')
      ? tIME.decode(data.lastUpdateTimePriority)
      : undefined,
    lastUpdateModeObsLevel: (data.lastUpdateModeObsLevel !== null && typeof data.lastUpdateModeObsLevel !== 'undefined')
      ? uOCTET.decode(data.lastUpdateModeObsLevel)
      : undefined,
    lastUpdateTimeObsLevel: (data.lastUpdateTimeObsLevel !== null && typeof data.lastUpdateTimeObsLevel !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeObsLevel)
      : undefined,
    lastUpdateModeObcpId: (data.lastUpdateModeObcpId !== null && typeof data.lastUpdateModeObcpId !== 'undefined')
      ? uOCTET.decode(data.lastUpdateModeObcpId)
      : undefined,
    lastUpdateTimeObcpId: (data.lastUpdateTimeObcpId !== null && typeof data.lastUpdateTimeObcpId !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeObcpId)
      : undefined,
  }),
};
