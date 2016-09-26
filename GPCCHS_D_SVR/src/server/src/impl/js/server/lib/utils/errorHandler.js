const debug = require('../io/debug')('utils:errorHandler');

module.exports = (funk) => {
  try {
    funk();
  } catch (e) {
    debug.error(e);
  }
};
