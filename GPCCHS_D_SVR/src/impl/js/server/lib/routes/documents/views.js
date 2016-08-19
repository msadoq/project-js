const { Router } = require('express');
const validatePathOrOId = require('../../middlewares/validatePathOrOId');

const router = new Router();

router.post('/views', validatePathOrOId, (req, res) => {
  const data = (req.validated.path)
    ? { path: req.validated.path }
    : { oId: req.validaed.oId };

  // TODO : test file existence, user right, read it, validate and send
  data.content = 'my view file content';

  res.json({ data });
});

module.exports = router;
