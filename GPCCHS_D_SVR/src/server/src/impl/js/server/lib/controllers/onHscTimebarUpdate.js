const debug = require('../io/debug')('controllers:onTimeBarUpdate');
const { setTimebar } = require('../timeBar/index');

/**
 * Triggered when HSC send the timebar status (one time on launch)
 * @param timebar
 */
module.exports = (spark, { timebar }) => {
  debug.debug('called', timebar);
  setTimebar(timebar);
  spark.write({
    event: 'ready',
  });
};
