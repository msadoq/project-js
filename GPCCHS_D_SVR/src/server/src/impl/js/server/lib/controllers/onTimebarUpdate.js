const debug = require('../io/debug')('controllers:onTimebarUpdate');
const { setTimebar } = require('../timebar');

module.exports = timebars => {
  debug.info('timebar update', timebars);
  setTimebar(timebars);
};
