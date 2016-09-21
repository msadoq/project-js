const debug = require('../io/debug')('controllers:onClientClose');
const subscriptions = require('../utils/subscriptions');
const cacheJsonModel = require('../models/cacheJson');
const connectedDataModel = require('../models/connectedData');
const zmq = require('../io/zmq');
const _ = require('lodash');
const { resetTimebar } = require('../timeBar');
const { resetDomains } = require('../utils/domains');
/**
 * Triggered when HSC main process WebSocket closes
 *
 * - unsubscribe every pub/sub connectedData
 * - cleanup local cacheJson (loki)
 * - cleanup local connectedData (loki)
 * - cleanup local domains
 * - cleanup local timebar
 *
 * @param spark
 */
module.exports = (spark) => {
  debug.info(`called (${spark.id})`);

  // TODO unsubscribe every pub/sub connectedData
  _.each(connectedDataModel.getAll(), (connectedData) => {
    _.each(connectedData.windows, (windowId) => {
      subscriptions.stop({
        parameterName: connectedData.parameterName,
        catalog: connectedData.catalog,
        comObject: connectedData.comObject,
        sessionId: connectedData.sessionId,
        domainId: connectedData.domainId,
        windowId,
      }, zmq.push);
    });
  });
  // TODO cleanup local cacheJson (loki)
  cacheJsonModel.cleanup();
  // TODO cleanup local connectedData (loki)
  connectedDataModel.cleanup();
  // TODO cleanup local domains
  resetDomains();
  // TODO cleanup local timebar
  resetTimebar();
  debug.debug('cleanup done');
};
