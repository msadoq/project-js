const globalConstants = require('common/constants');
const _isObject = require('lodash/isObject');

const logger = require('common/log')('controllers:onPull');
const { reset } = require('../../websocket/dataQueue');

/**
 * Triggered when HSC main process pull data spooled by HSC
 *
 * - return current spooled data
 * - empty spool
 *
 * @param spark
 */
module.exports = (spark) => {
  logger.verbose(`called (${spark.id})`);

  const payload = reset();

  if (_isObject(payload) && Object.keys(payload).length) {
    spark.write({ event: globalConstants.EVENT_TIMEBASED_DATA, payload });
  }
};
