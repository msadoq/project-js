import _get from 'lodash/get';
import _isFunction from 'lodash/isFunction';
import globalConstants from 'common/constants';
import last from './last';
import range from './range';

const structures = {
  [globalConstants.DATASTRUCTURETYPE_LAST]: last,
  [globalConstants.DATASTRUCTURETYPE_RANGE]: range,
};

export default (type, name) => {
  const method = _get(structures, [type, name]);
  if (!_isFunction(method)) {
    throw new Error(`invalid function ${name} for structure type ${type}`);
  }

  return method;
};
