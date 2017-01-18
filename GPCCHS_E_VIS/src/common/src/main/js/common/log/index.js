let lib;

if (process.env.APP_ENV === 'renderer') {
  // eslint-disable-next-line global-require
  lib = require('./renderer');
} else {
  // eslint-disable-next-line global-require
  lib = require('./node');
}

module.exports = lib.getLogger;

Object.assign(module.exports, {
  productLog: lib.productLog,
  productLogSync: lib.productLogSync,
  getLogger: lib.getLogger,
});
