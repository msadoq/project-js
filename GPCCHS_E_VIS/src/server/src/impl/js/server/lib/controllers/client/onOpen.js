// eslint-disable-next-line import/no-extraneous-dependencies
const globalConstants = require('common/constants');
const debug = require('../../io/debug')('controllers:onOpen');

/**
 * Triggered when HSC main process WebSocket opens
 *
 * - anwser window WebSocket with 'authenticated' event (for HSC lifecycle)
 *
 * @param spark
 */
module.exports = (spark) => {
  debug.info(`called (${spark.id})`);

  return spark.write({
    event: globalConstants.EVENT_AUTHENTICATED,
  });
};
