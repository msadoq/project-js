const _defaultsDeep = require('lodash/defaultsDeep');

module.exports = (payload, override) => {
  if (!override) {
    return payload;
  }

  return _defaultsDeep({}, override, payload);
};
