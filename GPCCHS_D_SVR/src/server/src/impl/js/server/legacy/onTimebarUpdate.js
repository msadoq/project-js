const debug = require('../lib/io/debug')('controllers:onTimebarUpdate');
const { setTimebars } = require('../lib/timebars/index');

module.exports = (timebars) => {
  debug.info('timebar update', timebars);
  setTimebars(timebars);
};
