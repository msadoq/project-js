// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
const globalConstants = require('common/constants');

const debug = require('../../io/debug')('controllers:onPull');
const { reset } = require('../../utils/dataQueue');

/**
 * Triggered when HSC main process pull data spooled by HSC
 *
 * - return current spooled data
 * - empty spool
 *
 * @param spark
 */
module.exports = (spark) => {
  debug.verbose(`called (${spark.id})`);

  const payload = reset();

  spark.write({ event: globalConstants.EVENT_TIMEBASED_DATA, payload });
};
