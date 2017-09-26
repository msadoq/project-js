// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// END-HISTORY
// ====================================================================

import isFunction from 'lodash/fp/isFunction';
import merge from 'lodash/fp/merge';

export default function simpleActionCreator(type, ...argNames) {
  if (!type || typeof type !== 'string') {
    throw new Error('simpleActionCreator require a valid type as first parameter');
  }
  return (...args) => {
    const action = {
      type,
      payload: {},
    };
    argNames.forEach((arg, index) => {
      if (isFunction(arg)) {
        const fn = arg;
        action.payload = merge(action.payload, fn(args[index]));
      } else {
        action.payload[arg] = args[index];
      }
    });
    return action;
  };
}
