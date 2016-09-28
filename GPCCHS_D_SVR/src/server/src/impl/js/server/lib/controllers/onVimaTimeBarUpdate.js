const debug = require('../io/debug')('controllers:onVimaTimeBarUpdate');
const primus = require('../io/primus');

/**
 * Controller that listens for timebar update
 * @param buffer
 */
module.exports = buffer => {
  debug.debug('called');
  // Buffer to JSON
  let updVimaTimebar;
  const string = buffer.toString();
  try {
    updVimaTimebar = JSON.parse(string);
  } catch (err) {
    throw err;
  }
  const spark = primus.getMainWebsocket();
  spark.write({
    event: 'vimaTimebarUpdate',
    payload: updVimaTimebar,
  });
};
