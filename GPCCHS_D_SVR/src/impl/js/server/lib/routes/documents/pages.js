const debug = require('../../io/debug')('documents:pages');
const { Router } = require('express');
const validatePathOrOId = require('../../middlewares/validatePathOrOId');
const validatePageToView = require('../../middlewares/validatePageToView');
const validFs = require('../../middlewares/validFs');
const { validateWsJson } = require('../../schemaManager/schemaManager');

const router = new Router();

router.post('/pages', [
  validatePathOrOId,
  validFs,
  validateWsJson,
  validatePageToView,
],

  (req, res) => {
    debug.debug('received', req.body, 'send', req.validated);
    const data = (req.validated.path)
    ? { path: req.validated.path }
    : { oId: req.validated.oId };

  // TODO : test file existence, user right, read it, validate and send
    const content = req.validated.reqValidatedPath;

    res.json({ data }, { content });
  });

module.exports = router;
