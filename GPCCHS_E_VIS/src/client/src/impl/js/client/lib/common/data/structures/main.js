/* eslint-disable global-require */
import last from './last/index';
import range from './range';
import { get, isFunction } from 'lodash';

const supportedStructure = { range, last };

export default (structureType, functionName) => {
  const f = get(supportedStructure, [structureType, functionName]);
  if (!f || !isFunction(f)) {
    throw new Error(`invalid function ${functionName} for structure type ${structureType}`)
  }

  return f;
};
