module.exports = (req, res) => res.json({
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
});
