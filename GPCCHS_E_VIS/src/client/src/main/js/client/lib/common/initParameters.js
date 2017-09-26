// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// END-HISTORY
// ====================================================================

const { join } = require('path');
const { init } = require('./configurationManager');

/**
 * Use to initiate correctly the common/parameters volume for npm script
 */

init(join(__dirname, '../..'));
