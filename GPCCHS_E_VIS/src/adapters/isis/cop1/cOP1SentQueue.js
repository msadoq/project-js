// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const sentQueueElement = require('./sentQueueElement');

module.exports = {
  encode: data => ({
    sentQueueElements: _map(data.sentQueueElements, d => (sentQueueElement.encode(d))),
  }),
  decode: data => ({
    sentQueueElements: _map(data.sentQueueElements, d => (sentQueueElement.decode(d))),
  }),
};
