const debug = require('../io/debug')('controllers:onTimeBarUpdate');
const { get, set } = require('../timeBar/index');
const tbUpdate = require('../timeBar/tbUpdate');
const viewModel = require('../models/views');
const { validateTbJson } = require('../schemaManager/index');

/**
 * Controller that save timebar update
 * @param newTimebar
 */
module.exports = buffer => {
  debug.debug('called');
  // Convert buffer to string : Needed when using zmq
  let newTimebar;
  const string = buffer.toString();
  try {
    newTimebar = JSON.parse(string);
  } catch (err) {
    // Case for test not using zmq
    try { newTimebar = JSON.parse(JSON.stringify(buffer)); }
    catch (e) {
      throw err;
    }
  }
  // Check timebar validity
  const errors = validateTbJson(newTimebar);
  if (errors) {
    debug.debug('Invalid format of timebar:', errors);
    throw errors;
  }
  // Get differences
  const cmdList = tbUpdate(get(), newTimebar);
  if (cmdList) {
    console.log('Envoi des modifs de TB aux vues');
    // Get view collection
    // Send update commands to each view
    viewModel.data.forEach((element, index, array) => {
      element.instance.onTimebarUpdate(cmdList);
    });
  }

  // Save new timebar
  set(newTimebar);
};
