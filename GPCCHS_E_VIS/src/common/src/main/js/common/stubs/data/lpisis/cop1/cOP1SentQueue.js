// Generated file
const applyOverride = require('../../applyOverride');
const getSentQueueElement = require('./sentQueueElement');

module.exports = override => applyOverride({
  sentQueueElements: [getSentQueueElement(), getSentQueueElement()],
}, override);

