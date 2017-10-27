const _each = require('lodash/each');
const _get = require('lodash/get');
const logger = require('../../common/logManager')('stubs:utils');
const constants = require('../../constants');
const getPayload = require('./getPayload');
const stubs = require('../../utils/stubs');

const stubData = stubs.getStubData();
const header = stubData.getTimebasedArchiveDataHeaderProtobuf();
const thisIsTheEnd = stubData.getBooleanProtobuf(true);

const queries = {};

function shouldPushANewValue(queryKey, timestamp) {
  if (timestamp > Date.now()) {
    return false; // stub never send value in the future
  }

  const previous = _get(queries, queryKey);
  if (typeof previous === 'undefined') {
    queries[queryKey] = timestamp;
    return true;
  }
  if (Math.abs(timestamp - previous) >= constants.DC_STUB_VALUE_TIMESTEP) {
    queries[queryKey] = timestamp;
    return true;
  }
  return false;
}

module.exports = function sendArchiveData(
  queryKey,
  queryId,
  dataId,
  interval,
  queryArguments,
  zmq
) {
  const from = interval.startTime.ms;
  const to = interval.endTime.ms;
  if (to <= from) {
    throw new Error(
      'Invalid interval requested to DC stub',
      dataId.parameterName,
      interval.startTime.ms,
      interval.endTime.ms
    );
  }

  const payloads = [];
  const now = Date.now();

  if (queryArguments.getLastType === constants.GETLASTTYPE_GET_LAST) {
    // compute number of steps from lower time to current
    const n = Math.floor((to - from) / constants.DC_STUB_VALUE_TIMESTEP);
    let timestamp = from + (n * constants.DC_STUB_VALUE_TIMESTEP);
    if (timestamp > now) {
      // stub never send value in the future
      timestamp = now - constants.DC_STUB_VALUE_TIMESTEP;
    }
    const payload = getPayload(timestamp, dataId.comObject, dataId.parameterName);
    if (payload !== null) {
      payloads.push(payload);
    }
  } else {
    // All toAck alarms are pushed by DC whatever the given alarm
    if (dataId.catalog === 'alarm') {
      for (let i = now - 10000020000; i < (now - 10000010000); i += 2000) {
        const payload = getPayload(i, dataId.comObject, dataId.parameterName, { allToAck: true });
        if (payload !== null) {
          payloads.push(payload);
        }
      }
    }

    for (let i = from; i <= to && i < now; i += constants.DC_STUB_VALUE_TIMESTEP) {
      if (shouldPushANewValue(queryKey, i)) {
        const payload = getPayload(i, dataId.comObject, dataId.parameterName, {
          alarmFrequency: (1 / constants.DC_STUB_VALUE_ALARMTIMESTEP),
        });
        if (payload !== null) {
          payloads.push(payload);
        }
      }
    }
  }

  if (!payloads.length) {
    return;
  }

  const buffer = [
    null,
    header,
    stubData.getStringProtobuf(queryId),
    stubData.getDataIdProtobuf(dataId),
    thisIsTheEnd,
  ];
  _each(payloads, (payload) => {
    buffer.push(payload.timestamp);
    buffer.push(payload.payload);
  });

  if (payloads.length !== 0) {
    zmq.push('stubData', buffer);
  }

  logger.debug(`push ${payloads.length} data from query from: ${new Date(from)} to ${new Date(to)} now`);
};
