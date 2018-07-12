const uINTEGER = require('../ccsds_mal/uINTEGER');
const sTRING = require('../ccsds_mal/sTRING');
const uLONG = require('../ccsds_mal/uLONG');
const pusParameter = require('./pusParameter');
const _map = require('lodash/map');


module.exports = {
  encode: data => ({
    obcpId: (data.obcpId !== null && typeof data.obcpId !== 'undefined')
      ? uINTEGER.encode(data.obcpId)
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
    lastUpdateModeStatus: (data.lastUpdateModeStatus !== null && typeof data.lastUpdateModeStatus !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeStatus)
      : null,
    lastUpdateTimeStatus: (data.lastUpdateTimeStatus !== null && typeof data.lastUpdateTimeStatus !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeStatus)
      : null,
    lastUpdateModeStepId: (data.lastUpdateModeStepId !== null && typeof data.lastUpdateModeStepId !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeStepId)
      : null,
    lastUpdateTimeStepId: (data.lastUpdateTimeStepId !== null && typeof data.lastUpdateTimeStepId !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeStepId)
      : null,
    lastUpdateModePartitionId: (data.lastUpdateModePartitionId !== null && typeof data.lastUpdateModePartitionId !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModePartitionId)
      : null,
    lastUpdateTimePartitionId: (data.lastUpdateTimePartitionId !== null && typeof data.lastUpdateTimePartitionId !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimePartitionId)
      : null,
    lastUpdateModePriority: (data.lastUpdateModePriority !== null && typeof data.lastUpdateModePriority !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModePriority)
      : null,
    lastUpdateTimePriority: (data.lastUpdateTimePriority !== null && typeof data.lastUpdateTimePriority !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimePriority)
      : null,
    lastUpdateModeObsLevel: (data.lastUpdateModeObsLevel !== null && typeof data.lastUpdateModeObsLevel !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeObsLevel)
      : null,
    lastUpdateTimeObsLevel: (data.lastUpdateTimeObsLevel !== null && typeof data.lastUpdateTimeObsLevel !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeObsLevel)
      : null,
    lastUpdateModeObcpId: (data.lastUpdateModeObcpId !== null && typeof data.lastUpdateModeObcpId !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeObcpId)
      : null,
    lastUpdateTimeObcpId: (data.lastUpdateTimeObcpId !== null && typeof data.lastUpdateTimeObcpId !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeObcpId)
      : null,
    serviceApid: (data.serviceApid !== null && typeof data.serviceApid !== 'undefined')
      ? uINTEGER.encode(data.serviceApid)
      : null,
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
      ? sTRING.encode(data.serviceApidName)
      : null,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.encode(data.uniqueId)
      : null,
    pusParameter: _map(data.pusParameter, param => pusParameter.encode(param)),
  }),
  decode: data => ({
    obcpId: (data.obcpId !== null && typeof data.obcpId !== 'undefined')
      ? uINTEGER.decode(data.obcpId)
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
    lastUpdateModeStatus: (data.lastUpdateModeStatus !== null && typeof data.lastUpdateModeStatus !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeStatus)
      : undefined,
    lastUpdateTimeStatus: (data.lastUpdateTimeStatus !== null && typeof data.lastUpdateTimeStatus !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeStatus)
      : undefined,
    lastUpdateModeStepId: (data.lastUpdateModeStepId !== null && typeof data.lastUpdateModeStepId !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeStepId)
      : undefined,
    lastUpdateTimeStepId: (data.lastUpdateTimeStepId !== null && typeof data.lastUpdateTimeStepId !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeStepId)
      : undefined,
    lastUpdateModePartitionId: (data.lastUpdateModePartitionId !== null && typeof data.lastUpdateModePartitionId !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModePartitionId)
      : undefined,
    lastUpdateTimePartitionId: (data.lastUpdateTimePartitionId !== null && typeof data.lastUpdateTimePartitionId !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimePartitionId)
      : undefined,
    lastUpdateModePriority: (data.lastUpdateModePriority !== null && typeof data.lastUpdateModePriority !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModePriority)
      : undefined,
    lastUpdateTimePriority: (data.lastUpdateTimePriority !== null && typeof data.lastUpdateTimePriority !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimePriority)
      : undefined,
    lastUpdateModeObsLevel: (data.lastUpdateModeObsLevel !== null && typeof data.lastUpdateModeObsLevel !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeObsLevel)
      : undefined,
    lastUpdateTimeObsLevel: (data.lastUpdateTimeObsLevel !== null && typeof data.lastUpdateTimeObsLevel !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeObsLevel)
      : undefined,
    lastUpdateModeObcpId: (data.lastUpdateModeObcpId !== null && typeof data.lastUpdateModeObcpId !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeObcpId)
      : undefined,
    lastUpdateTimeObcpId: (data.lastUpdateTimeObcpId !== null && typeof data.lastUpdateTimeObcpId !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeObcpId)
      : undefined,
    serviceApid: (data.serviceApid !== null && typeof data.serviceApid !== 'undefined')
      ? uINTEGER.decode(data.serviceApid)
      : undefined,
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
      ? sTRING.decode(data.serviceApidName)
      : undefined,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.decode(data.uniqueId)
      : undefined,
    pusParameter: _map(data.pusParameter, param => pusParameter.decode(param)),
  }),
};
