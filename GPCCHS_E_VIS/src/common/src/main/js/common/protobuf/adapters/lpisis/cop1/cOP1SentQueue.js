// Generated file
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

