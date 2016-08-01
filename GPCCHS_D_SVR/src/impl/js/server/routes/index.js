const { Router } = require('express');
const router = new Router();
const ApiError = require('./apiError');
const errorHandler = require('./errorHandler');

router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.post('/api/subscriptions', require('./subscriptions'));

router.use((req, res, next) => next(new ApiError(404, 'Not Found')));
router.use(errorHandler);

module.exports = router;
