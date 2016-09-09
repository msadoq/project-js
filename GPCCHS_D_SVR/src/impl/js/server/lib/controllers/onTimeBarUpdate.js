const debug = require('../io/debug')('controllers:onTimeBarUpdate');
const { get, set } = require('../timeBar/index');
const tbUpdate = require('../timeBar/tbUpdate');
const viewsModel = require('../models/views');
const { validateTbJson } = require('../schemaManager/index');

/**
 * Controller that listne for timebar update
 * @param buffer
 */
module.exports = buffer => {
  debug.debug('called');

  // Buffer to JSON
  let newTimebar;
  const string = buffer.toString();
  try {
    newTimebar = JSON.parse(string);
  } catch (err) {
    // Case for test not using zmq
    try {
      newTimebar = JSON.parse(JSON.stringify(buffer));
      // TODO aleal generate buffer in tests and support only buffer in this function
    } catch (e) {
      throw e;
    }
  }

  // Check timebar validity
  const errors = validateTbJson(newTimebar);
  if (errors) {
    debug.debug('Invalid format of timebar:', errors);
    throw errors;
  }

  // Get differences
  // TODO aleal rename tbUpdate as 'compareTimebars()'
  // TODO aleal rename cmdList as 'differences'
  // TODO aleal you can now remove useless comments
  const cmdList = tbUpdate(get(), newTimebar);
  if (cmdList) {
    const views = viewsModel.retrieveVisible();

    // TODO possible event loop bottleneck, envisage async repartition of view calls on nextTicks
    views.forEach(v => {
      v.onTimebarUpdate(cmdList);
    });
  }

  // Save new timebar
  set(newTimebar);
};
