// Produced by Acceleo JavaScript Generator 1.1.0
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

