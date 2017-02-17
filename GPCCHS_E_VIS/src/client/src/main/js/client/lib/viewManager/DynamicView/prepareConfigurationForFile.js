import _isArray from 'lodash/isArray';
import _omit from 'lodash/fp/omit';

export default function (configuration) {
  if (!_isArray(configuration.entryPoints)) {
    return configuration;
  }

  return Object.assign(
    {},
    // remove entryPoints
    _omit('entryPoints', configuration),
    // add entryPoint
    { entryPoint: _omit('name', configuration.entryPoints[0]) }
  );
}
