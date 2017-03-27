// Produced by Acceleo JavaScript Generator 1.1.0
const applyOverride = require('../../applyOverride');
const getSentQueueElement = require('./sentQueueElement');

module.exports = override => applyOverride({
  sentQueueElements: [getSentQueueElement(), getSentQueueElement()],
}, override);

