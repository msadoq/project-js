const { Router } = require('express');

const router = new Router();

router.get('/', require('./summary'));
router.post('/subscriptions', require('./subscriptions'));

module.exports = router;
