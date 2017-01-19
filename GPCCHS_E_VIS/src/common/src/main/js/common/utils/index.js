import mapValues from 'lodash/fp/mapValues';
import curry from 'lodash/curry';

export default {
  applyDependencyToApi: curry((api, dep) => mapValues(f => f(dep), api)),
};
