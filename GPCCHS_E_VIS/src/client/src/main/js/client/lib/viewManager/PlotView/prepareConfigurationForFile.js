import _values from 'lodash/values';

export default function (configuration) {
  return {
    ...configuration,
    axes: _values(configuration.axes),
  };
}
