const debug = require('../../io/debug')('documents:workspaces');
const { Router } = require('express');
const validatePathOrOId = require('../../middlewares/validatePathOrOId');
const validFs = require('../../middlewares/validFs');
const validatorJson = require('../../middlewares/validatorJson');

const router = new Router();

router.post('/workspaces', [
  validatePathOrOId,
  validFs,
  validatorJson,
  // validateWorkspaceToPage,
], (req, res) => {
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
