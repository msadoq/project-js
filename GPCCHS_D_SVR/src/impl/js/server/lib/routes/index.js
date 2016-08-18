const { Router } = require('express');

const router = new Router();

router.get('/', (req, res) => {
  res.json({
    data: {
      subscriptions: {
        links: {
          self: '/api/subscriptions',
        },
      },
    },
  });
});
router.post('/subscriptions', require('./subscriptions'));

// TODO : add middleware for content type of response

module.exports = router;
