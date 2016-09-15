const debug = require('../io/debug')('controllers:onTimeBarUpdate');
const { getTimebar, setTimebar } = require('../timeBar/index');
const compareTimebars = require('../timeBar/tbUpdate');
const viewsModel = require('../models/views');
// const { validateTbJson } = require('../schemaManager/index');
const _ = require('lodash');

/**
 * Controller that listens for timebar update
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
    throw err;
  }

  // Check timebar validity
  // const errors = validateTbJson(newTimebar);
  // if (errors) {
  //   debug.debug('Invalid format of timebar:', errors);
  //   console.log(errors);
  //   throw errors;
  // }

  // Get differences
  // TODO aleal rename tbUpdate as 'compareTimebars()'
  // TODO aleal rename cmdList as 'differences'
  // TODO aleal you can now remove useless comments
  const differences = compareTimebars(getTimebar(), newTimebar);
  if (differences) {
    const views = viewsModel.retrieveVisible();
      console.log('views', views);
    // TODO possible event loop bottleneck, envisage async repartition of view calls on nextTicks
    _.forEach(views, v => {
      v.instance.onTimebarUpdate(differences);
    });
  }

  // Save new timebar
  setTimebar(newTimebar);
};
