import _get from 'lodash/get';
import _isFunction from 'lodash/isFunction';

import globalConstants from 'common/constants';
import last from './last';
import range from './range';

const supportedStructure = {
  [globalConstants.DATASTRUCTURETYPE_RANGE]: range,
  [globalConstants.DATASTRUCTURETYPE_LAST]: last,
};

export default (structureType, functionName) => {
  const f = _get(supportedStructure, [structureType, functionName]);
  if (!f || !_isFunction(f)) {
    throw new Error(`invalid function ${functionName} for structure type ${structureType}`);
  }

  return f;
};
