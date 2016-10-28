/* eslint no-underscore-dangle:0 */
const _each = require('lodash/each');
const debug = require('../../io/debug')('stub:dc');
// eslint-disable-next-line import/no-extraneous-dependencies
const { constants: globalConstants } = require('common');
const stubData = require('../data');
const getPayload = require('./getPayload');

const header = stubData.getTimebasedArchiveDataHeaderProtobuf();
const end = stubData.getBooleanProtobuf(true);

function shouldPushANewValue(timestamp) {
  const e = timestamp % 1000;
  console.log(e);
  return (e !== 0 && e < 900); //  && timestamp > 1420106700000
}

module.exports = function sendArchiveData(queryId, dataId, interval, zmq) {
  const from = interval.startTime.ms;
  const to = interval.endTime.ms;
  if (to <= from) {
    throw new Error('Unvalid interval requested to DC stub');
  }

  const payloads = [];
  const now = Date.now();

  for (let i = from; i <= to && i < now; i += globalConstants.DC_STUB_VALUE_TIMESTEP) {
    if (shouldPushANewValue(i)) {
      payloads.push(getPayload(i));
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
  debug.debug(`push ${payloads.length} data from query from: ${new Date(from)} to ${new Date(to)} now`);
};
