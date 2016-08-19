const { Router } = require('express');

const router = new Router();

router.use('/', require('./index'));
router.use('/', require('./subscriptions'));
router.use('/documents/', require('./documents/pages'));
router.use('/documents/', require('./documents/views'));
router.use('/documents/', require('./documents/workspaces'));

module.exports = router;
