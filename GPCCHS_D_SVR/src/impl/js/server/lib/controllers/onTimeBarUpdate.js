// const debug = require('../io/debug')('controllers:onTimeBarUpdate');
const { get, set } = require('../timeBar/index');
const tbUpdate = require('../timeBar/tbUpdate');

/**
 * Controller that save timebar update
 * @param newTimebar
 */
module.exports = buffer => {
  // Convert buffer to string : Needed when using zmq
  let newTimebar;
  const string = buffer.toString();
  try {
    newTimebar = JSON.parse(string);
  } catch (err) {
    throw err;
  }
  const cmdList = tbUpdate(get(),newTimebar);
  if (cmdList) {
    console.log('Envoi des modifs de TB aux vues');
    console.log('cmdList:', cmdList);
  }

  // Save new timebar
  set(newTimebar);
};
