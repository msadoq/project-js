const { Router } = require('express');

const router = new Router();

router.get('/', (req, res) => res.json({
  data: {
    subscriptions: {
      links: {
        self: res.linker('subscriptions'),
      },
    },
    workspaces: {
      links: {
        self: res.linker('workspaces'),
      },
    },
  },
  links: {
    self: res.linker(''),
  },
}));

module.exports = router;
