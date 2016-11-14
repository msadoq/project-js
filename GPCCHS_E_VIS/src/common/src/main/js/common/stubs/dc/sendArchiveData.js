/* eslint no-underscore-dangle:0 */
const {
  each: _each,
  get: _get,
  random: _random,
} = require('lodash');
const debug = require('debug');
const logger = require('../../debug')(debug)('common:stubs:dc');
const globalConstants = require('../../constants');
const stubData = require('../data');
const getPayload = require('./getPayload');

const header = stubData.getTimebasedArchiveDataHeaderProtobuf();
const end = stubData.getBooleanProtobuf(true);

const queries = {};

function shouldPushANewValue(queryKey, timestamp) {
  const previous = _get(queries, queryKey);
  if (typeof previous === 'undefined') {
    queries[queryKey] = timestamp;
    return true;
  }
  if (Math.abs(timestamp - previous) >= globalConstants.DC_STUB_VALUE_TIMESTEP) {
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
    throw new Error('Invalid interval requested to DC stub');
  }

  const payloads = [];
  const now = Date.now();

  if (queryArguments.getLastType === globalConstants.GETLASTTYPE_GET_LAST) {
    const ts = _random(from, to);
    payloads.push(getPayload(ts, dataId.parameterName));
  } else {
    for (let i = from; i <= to && i < now; i += globalConstants.DC_STUB_VALUE_TIMESTEP) {
      if (shouldPushANewValue(queryKey, i)) {
        payloads.push(getPayload(i, dataId.parameterName));
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
    end,
  ];
  _each(payloads, (payload) => {
    buffer.push(payload.timestamp);
    buffer.push(payload.payload);
  });

  zmq.push('stubData', buffer);
  logger.debug(`push ${payloads.length} data from query from: ${new Date(from)} to ${new Date(to)} now`);
};
