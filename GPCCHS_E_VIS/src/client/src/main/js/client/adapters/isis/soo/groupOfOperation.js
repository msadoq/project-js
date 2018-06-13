// ====================================================================
// HISTORY
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const activityRequest = require('./activityRequest');
const bLOB = require('../ccsds_mal/bLOB');
const dURATION = require('../ccsds_mal/dURATION');
const lONG = require('../ccsds_mal/lONG');
const namedValue = require('../ccsds_mal/namedValue');
const operationCriticality = require('./operationCriticality');
const operationStatus = require('./operationStatus');
const result = require('./result');
const sTRING = require('../ccsds_mal/sTRING');
const status = require('./status');
const tIME = require('../ccsds_mal/tIME');

module.exports = {
  encode: data => ({
    operationId: (data.operationId !== null && typeof data.operationId !== 'undefined')
      ? lONG.encode(data.operationId)
      : null,
    earliest_start_date: (data.earliest_start_date !== null && typeof data.earliest_start_date !== 'undefined')
      ? tIME.encode(data.earliest_start_date)
      : null,
    operation: _map(data.operation, d => (bLOB.encode(d))),
    latest_start_date: (data.latest_start_date !== null && typeof data.latest_start_date !== 'undefined')
      ? tIME.encode(data.latest_start_date)
      : null,
    layer: (data.layer !== null && typeof data.layer !== 'undefined')
      ? sTRING.encode(data.layer)
      : null,
    expected_duration: (data.expected_duration !== null && typeof data.expected_duration !== 'undefined')
      ? dURATION.encode(data.expected_duration)
      : null,
    foreseenDate: (data.foreseenDate !== null && typeof data.foreseenDate !== 'undefined')
      ? tIME.encode(data.foreseenDate)
      : null,
    label: (data.label !== null && typeof data.label !== 'undefined')
      ? sTRING.encode(data.label)
      : null,
    description: (data.description !== null && typeof data.description !== 'undefined')
      ? sTRING.encode(data.description)
      : null,
    target: (data.target !== null && typeof data.target !== 'undefined')
      ? sTRING.encode(data.target)
      : null,
    domain: (data.domain !== null && typeof data.domain !== 'undefined')
      ? sTRING.encode(data.domain)
      : null,
    executor: (data.executor !== null && typeof data.executor !== 'undefined')
      ? sTRING.encode(data.executor)
      : null,
    criticality: (data.criticality !== null && typeof data.criticality !== 'undefined')
      ? data.criticality
      : null,
    operationStatus: (data.operationStatus !== null && typeof data.operationStatus !== 'undefined')
      ? data.operationStatus
      : null,
    arguments: _map(data.arguments, d => (sTRING.encode(d))),
    options: _map(data.options, d => (namedValue.encode(d))),
    result: (data.result !== null && typeof data.result !== 'undefined')
      ? result.encode(data.result)
      : null,
    hostname: (data.hostname !== null && typeof data.hostname !== 'undefined')
      ? sTRING.encode(data.hostname)
      : null,
    functionalChain: (data.functionalChain !== null && typeof data.functionalChain !== 'undefined')
      ? bLOB.encode(data.functionalChain)
      : null,
    statuses: _map(data.statuses, d => (status.encode(d))),
    activity: (data.activity !== null && typeof data.activity !== 'undefined')
      ? data.activity
      : null,
  }),
  decode: data => ({
    operationId: (data.operationId !== null && typeof data.operationId !== 'undefined')
      ? lONG.decode(data.operationId)
      : undefined,
    earliest_start_date: (data.earliest_start_date !== null && typeof data.earliest_start_date !== 'undefined')
      ? tIME.decode(data.earliest_start_date)
      : undefined,
    operation: _map(data.operation, d => (bLOB.decode(d))),
    latest_start_date: (data.latest_start_date !== null && typeof data.latest_start_date !== 'undefined')
      ? tIME.decode(data.latest_start_date)
      : undefined,
    layer: (data.layer !== null && typeof data.layer !== 'undefined')
      ? sTRING.decode(data.layer)
      : undefined,
    expected_duration: (data.expected_duration !== null && typeof data.expected_duration !== 'undefined')
      ? dURATION.decode(data.expected_duration)
      : undefined,
    foreseenDate: (data.foreseenDate !== null && typeof data.foreseenDate !== 'undefined')
      ? tIME.decode(data.foreseenDate)
      : undefined,
    label: (data.label !== null && typeof data.label !== 'undefined')
      ? sTRING.decode(data.label)
      : undefined,
    description: (data.description !== null && typeof data.description !== 'undefined')
      ? sTRING.decode(data.description)
      : undefined,
    target: (data.target !== null && typeof data.target !== 'undefined')
      ? sTRING.decode(data.target)
      : undefined,
    domain: (data.domain !== null && typeof data.domain !== 'undefined')
      ? sTRING.decode(data.domain)
      : undefined,
    executor: (data.executor !== null && typeof data.executor !== 'undefined')
      ? sTRING.decode(data.executor)
      : undefined,
    criticality: (data.criticality !== null && typeof data.criticality !== 'undefined')
      ? { type: 'enum', value: data.criticality, symbol: operationCriticality[data.criticality] }
      : undefined,
    operationStatus: (data.operationStatus !== null && typeof data.operationStatus !== 'undefined')
      ? { type: 'enum', value: data.operationStatus, symbol: operationStatus[data.operationStatus] }
      : undefined,
    arguments: _map(data.arguments, d => (sTRING.decode(d))),
    options: _map(data.options, d => (namedValue.decode(d))),
    result: (data.result !== null && typeof data.result !== 'undefined')
      ? result.decode(data.result)
      : undefined,
    hostname: (data.hostname !== null && typeof data.hostname !== 'undefined')
      ? sTRING.decode(data.hostname)
      : undefined,
    functionalChain: (data.functionalChain !== null && typeof data.functionalChain !== 'undefined')
      ? bLOB.decode(data.functionalChain)
      : undefined,
    statuses: _map(data.statuses, d => (status.decode(d))),
    activity: (data.activity !== null && typeof data.activity !== 'undefined')
      ? { type: 'enum', value: data.activity, symbol: activityRequest[data.activity] }
      : undefined,
    referenceTimestamp: (data.foreseenDate !== null && typeof data.foreseenDate !== 'undefined')
        ? { type: 'time', value: data.foreseenDate.value.toNumber() }
        : undefined,
  }),
};
