let getLogger;

// eslint-disable-next-line no-underscore-dangle
if (process.env.APP_ENV === 'browser') { // TODO don't base logic on process.env (detect window)
  // eslint-disable-next-line global-require
  getLogger = require('./browser').getLogger; // TODO rename renderer
} else {
  // eslint-disable-next-line global-require
  getLogger = require('./node').getLogger;
}

module.exports = getLogger;
