let getLogger;

// eslint-disable-next-line no-underscore-dangle
if (process.env.APP_ENV === 'browser') {
  // eslint-disable-next-line global-require
  getLogger = require('./browser').getLogger;
} else {
  // eslint-disable-next-line global-require
  getLogger = require('./node').getLogger;
}

module.exports = getLogger;
