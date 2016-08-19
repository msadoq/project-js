const debug = require('../io/debug')('routes:subscriptions');
const { Router } = require('express');
const validateDataFullName = require('../middlewares/validateDataFullName');
const validateDomainId = require('../middlewares/validateDomainId');
const validateTimeLineType = require('../middlewares/validateTimeLineType');
const validateSubscriptionState = require('../middlewares/validateSubscriptionState');
const validateVisuWindow = require('../middlewares/validateVisuWindow');
const validateField = require('../middlewares/validateField');
const validateVisuSpeed = require('../middlewares/validateVisuSpeed');
const validateFilters = require('../middlewares/validateFilters');
const subscriptionManager = require('../subscriptionManager');

const router = new Router();

/**
 * POST /api/subscriptions/
 *
 * Required parameters:
 * - dataFullName (str)
 * - domainId (int) // TODO : we can not know it on HS, we should probably remove it
 * - timeLineType enum('session', 'recordSet', 'dataSet')
 * - sessionId (only if timeLineType is 'session')
 * - setFileName (only if timeLineType is 'recordSet' or 'dataSet')
 * - subscriptionState enum('play', 'pause') // TODO : seems not used by DC
 * - visuWindow ({ lower (int), upper (int)})
 *
 * Optionnal parameters:
 * - field (str)
 * - visuSpeed (int) // TODO we don't care on DC
 * - filter ({ dataFullName (str), field (str), operator (enum), value (string|number) })
 */
router.post('/subscriptions', [
  validateDataFullName,
  validateDomainId,
  validateTimeLineType,
  validateSubscriptionState,
  validateVisuWindow,
  validateField,
  validateVisuSpeed,
  validateFilters,
], (req, res) => {
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
});

module.exports = router;
