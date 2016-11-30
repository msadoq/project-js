const deprecated = require('depd')('io/debug');
// eslint-disable-next-line import/no-extraneous-dependencies
const getLogger = require('common/log');

// TODO deprecated
module.exports = deprecated.function(getLogger);
