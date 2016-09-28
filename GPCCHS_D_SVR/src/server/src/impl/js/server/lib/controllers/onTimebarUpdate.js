const debug = require('../io/debug')('controllers:onTimebarUpdate');
const { setTimebars } = require('../timebars');

module.exports = (timebars) => {
  debug.info('timebar update', timebars);
  setTimebars(timebars);
};
