import { get, isFunction } from 'lodash';
import { constants as globalConstants } from 'common';
import last from './last/index';
import range from './range';

const supportedStructure = {
  [globalConstants.DATASTRUCTURETYPE_RANGE]: range,
  [globalConstants.DATASTRUCTURETYPE_LAST]: last,
};

export default (structureType, functionName) => {
  const f = get(supportedStructure, [structureType, functionName]);
  if (!f || !isFunction(f)) {
    throw new Error(`invalid function ${functionName} for structure type ${structureType}`);
  }

  return f;
};
