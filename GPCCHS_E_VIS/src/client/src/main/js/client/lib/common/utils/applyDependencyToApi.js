import mapValues from 'lodash/fp/mapValues';
import curry from 'lodash/curry';

const applyDependencyToApi = curry((api, dep) => mapValues(f => f(dep), api));
export default applyDependencyToApi;
