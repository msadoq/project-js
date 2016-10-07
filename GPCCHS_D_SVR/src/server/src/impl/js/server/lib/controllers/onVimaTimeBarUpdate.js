const debug = require('../io/debug')('controllers:onVimaTimeBarUpdate');
const { sendToMain } = require('../websocket/sendToMain');

/**
 * Controller that listens for timebar update
 * @param buffer
 */
module.exports = (buffer) => {
  debug.debug('called');
  // Buffer to JSON
  let updVimaTimebar;
  const string = buffer.toString();
  try {
    updVimaTimebar = JSON.parse(string);
  } catch (err) {
    throw err;
  }
  sendToMain('vimaTimebarUpdate', updVimaTimebar);
};
