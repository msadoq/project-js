const { Router } = require('express');

const router = new Router();

router.get('/', (req, res) => res.json({
  data: {
    subscriptions: {
      links: {
        self: res.linker('subscriptions'),
      },
    },
    // route in staggered of the workspace > pages > views
    workspaces: {
      links: { self: res.linker('workspaces') },
      next: {
        pages: {
          links: { self: res.linker('pages') },
        },
      },
      last: {
        views: {
          links: { self: res.linker('views)') },
        },
      },
    },
  },
  links: {
    self: res.linker(''),
  },

}));

module.exports = router;








/** DOCUMENTATION OF RES.LINKS ********
res.links(links)

This method is used to join the links provided as properties of the parameter
to populate the response’s Link HTTP header field.
 Following are few examples:

res.links({
  next: 'http://api.example.com/users?page=2',
  last: 'http://api.example.com/users?page=5'
});

**************************************/
