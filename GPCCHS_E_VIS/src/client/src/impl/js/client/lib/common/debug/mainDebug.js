import deprecate from 'depd';
import getLogger from 'common/log';

// TODO deprecated
module.exports = deprecate('common/debug/mainDebug').function(getLogger);
