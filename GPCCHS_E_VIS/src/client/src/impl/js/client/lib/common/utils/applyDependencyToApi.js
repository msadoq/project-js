import mapValues from 'lodash/fp/mapValues';
import curry from 'lodash/curry';

// eslint-disable-next-line import/prefer-default-export
export const applyDependencyToApi = curry((api, dep) => mapValues(f => f(dep), api));
