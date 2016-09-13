const debug = require('../../io/debug')('documents:pages');
const { Router } = require('express');
const validatePathOrOId = require('../../middlewares/validatePathOrOId');
// const validatePageToView = require('../../middlewares/validatePageToView');
const validFs = require('../../middlewares/validFs');
const validatorJson = require('../../middlewares/validatorJson');

const router = new Router();


router.post('/pages', [
  validatePathOrOId,
  validFs,
  validatorJson,
    // validatePageToView,
],
  (req, res) => {
    debug.debug('received', req.body, 'send', req.validated);
    const response = {
      data: {
        content: req.validated.content,
      },
    };

    if (req.validated.path) {
      response.data.path = req.validated.path;
    } else {
      response.data.oId = req.validated.oId;
    }

    res.json(response);
  });

module.exports = router;
