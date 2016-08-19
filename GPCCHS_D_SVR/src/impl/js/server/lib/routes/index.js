const { Router } = require('express');

const router = new Router();

router.get('/', (req, res) => res.json({
  data: {
    subscriptions: {
      links: {
        self: res.linker('subscriptions'),
      },
    },
  },
  links: {
    self: res.linker(''),
  },
}));

module.exports = router;
