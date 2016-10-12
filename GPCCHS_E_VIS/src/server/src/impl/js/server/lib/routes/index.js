const { Router } = require('express');

const router = new Router();

router.get('/', (req, res) => res.json({
  data: {
    debug: {
      links: {
        self: res.linker('debug'),
      },
    },
  },
  links: {
    self: res.linker(''),
  },

}));

module.exports = router;
