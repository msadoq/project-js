const debug = require('debug');
const helper = require('./debug');

// return debug helper with node implementation
module.exports = helper(debug);
