const debug = require('../io/debug')('controllers:onWindowClose');
const _ = require('lodash');
const subscriptions = require('../utils/subscriptions');
const connectedDataModel = require('../models/connectedData');
const zmq = require('../io/zmq');

/**
 * Triggered when HSC close a window
 *
 * - unsubscribe every pub/sub connectedData (listened only for this window)
 * - cleanup local cacheJson (loki) (connectedData listened only for this window)
 * - cleanup local connectedData (loki) (connectedData listened only for this window)
 *
 * @param spark
 * @param windowId
 */
module.exports = (spark, windowId) => {
  debug.info(`called (${windowId})`);

  _.each(connectedDataModel.retrieveByWindow(windowId), (connectedData) => {
    subscriptions.stop({
      parameterName: connectedData.dataId.parameterName,
      catalog: connectedData.dataId.catalog,
      comObject: connectedData.dataId.comObject,
      sessionId: connectedData.dataId.sessionId,
      domainId: connectedData.dataId.domainId,
      windowId,
    }, zmq.push);
    subscriptions.cleanupModels(connectedData.dataId);
  });
};
