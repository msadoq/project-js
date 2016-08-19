const debug = require('../io/debug')('routes:subscriptions');
const subscriptionManager = require('../subscriptionManager');

/**
 * PARAMS REQUIRED:
 * - dataFullName (str)
 * - domainId (int) // TODO : we can not know it on HS, we should probably remove it
 * - timeLineType enum('session', 'recordSet', 'dataSet')
 * - sessionId (only if timeLineType is 'session')
 * - setFileName (only if timeLineType is 'recordSet' or 'dataSet')
 * - subscriptionState enum('play', 'pause') // TODO : seems not used by DC
 * - visuWindow ({ lower (int), upper (int)})

 * PARAMS OPTIONAL:
 * - field (str)
 * - visuSpeed (int) // TODO we don't care on DC
 * - filter ({ dataFullName (str), field (str), operator (enum), value (string|number) })
 */
module.exports = (req, res) => {
  debug.debug('received', req.body, 'send', req.validated);
  // TODO : concurency problem, DC data is send before view is ready
  const subscriptionId = subscriptionManager.addSubscription(req.validated);
  debug.debug('return subscriptionId', subscriptionId);
  return res.json({
    data: {
      subscriptionId,
    },
    links: {
      self: res.linker(`subscriptions/${subscriptionId}`),
    },
  });
};
