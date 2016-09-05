const debug = require('../lib/io/debug')('routes:subscriptions');
const { Router } = require('express');
const validateDataFullName = require('../lib/middlewares/validateDataFullName');
const validateDomainId = require('../lib/middlewares/validateDomainId');
const validateTimeLineType = require('../lib/middlewares/validateTimeLineType');
const validateSubscriptionState = require('../lib/middlewares/validateSubscriptionState');
const validateVisuWindow = require('../lib/middlewares/validateVisuWindow');
const validateField = require('../lib/middlewares/validateField');
const validateVisuSpeed = require('../lib/middlewares/validateVisuSpeed');
const validateFilters = require('../lib/middlewares/validateFilters');
const createSubscription = require('../lib/subscriptionManager/createSubscription');

const router = new Router();

/**
 * POST /api/subscriptions/
 *
 * Required parameters:
 * - dataFullName (str)
 * - domainId (int) // TODO : should be retrieved on DC on app launching
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
  const subscriptionId = createSubscription(req.validated);
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
