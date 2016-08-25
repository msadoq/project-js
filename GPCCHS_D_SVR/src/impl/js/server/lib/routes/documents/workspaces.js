const debug = require('../../io/debug')('documents:pages');
const { Router } = require('express');
const validatePathOrOId = require('../../middlewares/validatePathOrOId');
const validFs = require('../../middlewares/validFs');
const validJsonAjv = require('../../middlewares/validJsonAjv');

const router = new Router();

router.post('/workspaces', [
    validatePathOrOId, 
    validFs, 
    validJsonAjv,
  ],
  (req, res) => {
    debug.debug('received', req.body, 'send', req.validated);
    const data = (req.validated.path)
      ? { path: req.validated.path }
      : { oId: req.validated.oId };

    data.content = 'my ws file content';
    
    // data.path_file = '../../lib/utils/test/fileTest.txt';
    
    // data.fileExist = true;
    
    // data.accessFile = R_OK;
    
    // data.readFile = 'ok';
    
    return res.json({ data });
  });

module.exports = router;
