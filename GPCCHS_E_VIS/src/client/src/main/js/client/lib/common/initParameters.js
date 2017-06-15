const { join } = require('path');
const { init } = require('./configurationManager');

/**
 * Use to initiate correctly the common/parameters volume for npm script
 */

init(join(__dirname, '../..'));
