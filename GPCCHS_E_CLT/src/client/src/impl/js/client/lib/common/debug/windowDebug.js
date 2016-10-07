if (global.env && global.env.DEBUG) {
  localStorage.setItem('debug', global.env.DEBUG);
}

const debug = require('debug/browser');
const helper = require('./debug');

// return debug helper with browser implementation
module.exports = helper(debug);
