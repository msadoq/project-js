const debug = require('../io/debug')('controllers:onTimeBarUpdate');
const primus = require('../io/primus');

/**
 * Controller that listens for timebar update
 * @param buffer
 */
module.exports = buffer => {
  debug.debug('called');
  // Buffer to JSON
  let updTimebar;
  const string = buffer.toString();
  try {
    updTimebar = JSON.parse(string);
  } catch (err) {
    throw err;
  }
  const spark = primus.getMainWebsocket();
  spark.write({
    event: 'timebarUpdate',
    payload: updTimebar,
  });
};
