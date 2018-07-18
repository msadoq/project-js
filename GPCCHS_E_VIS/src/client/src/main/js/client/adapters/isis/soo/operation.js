// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const activityRequest = require('./activityRequest');
const bLOB = require('../ccsds_mal/bLOB');
const dURATION = require('../ccsds_mal/dURATION');
const functionalChain = require('./functionalChain');
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
    earliestStartDate: (data.earliestStartDate !== null && typeof data.earliestStartDate !== 'undefined')
      ? tIME.encode(data.earliestStartDate)
      : null,
    latestStartDate: (data.latestStartDate !== null && typeof data.latestStartDate !== 'undefined')
      ? tIME.encode(data.latestStartDate)
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
      ? bLOB.encode(result.encodeRaw(data.result))
      : null,
    hostname: (data.hostname !== null && typeof data.hostname !== 'undefined')
      ? sTRING.encode(data.hostname)
      : null,
    functionalChain: (data.functionalChain !== null && typeof data.functionalChain !== 'undefined')
      ? bLOB.encode(functionalChain.encodeRaw(data.functionalChain))
      : null,
    statuses: _map(data.statuses, d => (bLOB.encode(status.encodeRaw(d)))),
    activity: (data.activity !== null && typeof data.activity !== 'undefined')
      ? data.activity
      : null,
  }),
  decode: data => ({
    operationId: (data.operationId !== null && typeof data.operationId !== 'undefined')
      ? lONG.decode(data.operationId)
      : undefined,
    earliestStartDate: (data.earliestStartDate !== null && typeof data.earliestStartDate !== 'undefined')
      ? tIME.decode(data.earliestStartDate)
      : undefined,
    latestStartDate: (data.latestStartDate !== null && typeof data.latestStartDate !== 'undefined')
      ? tIME.decode(data.latestStartDate)
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
      ? result.decodeRaw(bLOB.decode(data.result).value)
      : undefined,
    hostname: (data.hostname !== null && typeof data.hostname !== 'undefined')
      ? sTRING.decode(data.hostname)
      : undefined,
    functionalChain: (data.functionalChain !== null && typeof data.functionalChain !== 'undefined')
      ? functionalChain.decodeRaw(bLOB.decode(data.functionalChain).value)
      : undefined,
    statuses: _map(data.statuses, d => (status.decodeRaw(bLOB.decode(d).value))),
    activity: (data.activity !== null && typeof data.activity !== 'undefined')
      ? { type: 'enum', value: data.activity, symbol: activityRequest[data.activity] }
      : undefined,
    referenceTimestamp: (data.foreseenDate !== null && typeof data.foreseenDate !== 'undefined')
        ? { type: 'time', value: data.foreseenDate.value.toNumber() }
        : undefined,
  }),
};
