const debug = require('../lib/io/debug')('routes:subscriptions');
const { Router } = require('express');
const validateDataFullName = require('validateDataFullName');
const validateDomainId = require('documents/validateDomainId');
const validateTimeLineType = require('documents/validateTimeLineType');
const validateSubscriptionState = require('documents/validateSubscriptionState');
const validateVisuWindow = require('documents/validateVisuWindow');
const validateField = require('documents/validateField');
const validateVisuSpeed = require('documents/validateVisuSpeed');
const validateFilters = require('validateFilters');
const createSubscription = require('createSubscription');

const router = new Router();

/**
 * POST /api/subscriptions/
 *
 * Required parameters:
 * - dataFullName (str)
 * - domainId (int)
 * - timeLineType enum('session', 'recordSet', 'dataSet')
 * - sessionId (only if timeLineType is 'session')
 * - setFileName (only if timeLineType is 'recordSet' or 'dataSet')
 * - subscriptionState enum('play', 'pause')
 * - visuWindow ({ lower (int), upper (int)})
 *
 * Optionnal parameters:
 * - field (str)
 * - visuSpeed (int)
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
