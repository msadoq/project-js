const debug = require('../io/debug')('controllers:onTimeBarUpdate');
const { get, set } = require('../timeBar/index');

/**
 * Controller that save timebar update
 * @param newTimebar
 */
module.exports = (newTimebar) => {
  console.log('!!!!onTimeBarUpdate');
  // Get current timebar to process differences
  let old = get();
  // Save new timebar
  set(newTimebar);
};
