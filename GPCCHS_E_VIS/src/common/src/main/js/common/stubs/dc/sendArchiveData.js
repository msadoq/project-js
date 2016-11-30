/* eslint no-underscore-dangle:0 */
const _each = require('lodash/each');
const _get = require('lodash/get');
const _chunk = require('lodash/chunk');
const _last = require('lodash/last');
const debug = require('debug');

const logger = require('../../debug')(debug)('common:stubs:dc');

const globalConstants = require('../../constants');
const stubData = require('../data');
const getPayload = require('./getPayload');

const header = stubData.getTimebasedArchiveDataHeaderProtobuf();
const thisIsTheEnd = stubData.getBooleanProtobuf(true);
const thisIsNotTheEnd = stubData.getBooleanProtobuf(false);

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
    throw new Error(
      'Invalid interval requested to DC stub',
      dataId.parameterName,
      interval.startTime.ms,
      interval.endTime.ms
    );
  }

  const payloads = [];
  const now = Date.now();

  if (queryArguments.getLastType === globalConstants.GETLASTTYPE_GET_LAST) {
    // compute number of steps from lower time to current
    const n = Math.floor((to - from) / globalConstants.DC_STUB_VALUE_TIMESTEP);
    payloads.push(getPayload(from + (n * globalConstants.DC_STUB_VALUE_TIMESTEP),
      dataId.parameterName));
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

  // no more than 1000 payloads per sending
  _each(_chunk(payloads, globalConstants.HSS_MAX_PAYLOADS_PER_MESSAGE), (thousandPayloads) => {
    const buffer = [
      null,
      header,
      stubData.getStringProtobuf(queryId),
      stubData.getDataIdProtobuf(dataId),
      (_last(payloads) === _last(thousandPayloads)) ? thisIsTheEnd : thisIsNotTheEnd,
    ];
    _each(thousandPayloads, (payload) => {
      buffer.push(payload.timestamp);
      buffer.push(payload.payload);
    });

    zmq.push('stubData', buffer);
  });

  logger.debug(`push ${payloads.length} data from query from: ${new Date(from)} to ${new Date(to)} now`);
};
