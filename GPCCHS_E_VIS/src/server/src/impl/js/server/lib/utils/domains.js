let domains = [];

module.exports = {
  getDomains: () => domains,
  setDomains: d => (domains = d),
  resetDomains: () => (domains = []),
};
