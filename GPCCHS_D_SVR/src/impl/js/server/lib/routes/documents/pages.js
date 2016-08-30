const debug = require('../../io/debug')('documents:pages');
const { Router } = require('express');
const validatePathOrOId = require('../../middlewares/validatePathOrOId');
const validateHideBordersPage = require('../../middlewares/validateHideBordersPage');
const validatePageToView = require('../../middlewares/validatePageToView');

const router = new Router();

router.post('/pages', [
  validatePathOrOId,
  validateHideBordersPage,
  validatePageToView,
],

  (req, res) => {
    debug.debug('received', req.body, 'send', req.validated);
    const data = (req.validated.path)
    ? { path: req.validated.path }
    : { oId: req.validaed.oId };

  // TODO : test file existence, user right, read it, validate and send
    const content = req.validated.reqValidatedPath;

    res.json({ data }, { content });
  });

module.exports = router;
