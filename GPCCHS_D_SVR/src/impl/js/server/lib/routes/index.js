const { Router } = require('express');
const validateDataFullName = require('../middlewares/validateDataFullName');
const validateDomainId = require('../middlewares/validateDomainId');
const validateTimeLineType = require('../middlewares/validateTimeLineType');
const validateSubscriptionState = require('../middlewares/validateSubscriptionState');
const validateVisuWindow = require('../middlewares/validateVisuWindow');
const validateField = require('../middlewares/validateField');
const validateVisuSpeed = require('../middlewares/validateVisuSpeed');
const validateFilters = require('../middlewares/validateFilters');

const router = new Router();

router.get('/', require('./summary'));
router.post('/subscriptions', [
  validateDataFullName,
  validateDomainId,
  validateTimeLineType,
  validateSubscriptionState,
  validateVisuWindow,
  validateField,
  validateVisuSpeed,
  validateFilters,
], require('./subscriptions'));

module.exports = router;
