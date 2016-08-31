const debug = require('../io/debug')('controllers:onTimeBarUpdate');
const { get, set } = require('../timeBar/index');
const diff = require('deep-diff');

/**
 * Controller that save timebar update
 * @param newTimebar
 */
module.exports = buffer => {
  debug.info('!!!!onTimeBarUpdate');
  // Convert buffer to string
  const string = buffer.toString();
  let newTimebar;
  try {
    newTimebar = JSON.parse(string);
  } catch (err) {
    // Error parsing JSON
    throw (err);
  }

  // Comparison between timebars when this is not initialization or saving
  debug.info('Action: ', newTimebar.data.action);
  switch (newTimebar.data.action) {
    case 'initialUpd':
      break;
    case 'tbSaving':
      break;
    default:
      // Get current timebar to process differences
      const old = get();
      // Get differences between versions
      const result = diff(old, newTimebar);
      for (key in result) {
        console.log(key,result[key]);
      }
  }


  // Save new timebar
  set(newTimebar);
};
