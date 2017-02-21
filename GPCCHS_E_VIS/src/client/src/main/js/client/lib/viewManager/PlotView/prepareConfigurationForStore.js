import { v4 } from 'uuid';
import update from 'lodash/fp/update';
import indexBy from 'lodash/fp/indexBy';

const indexAxes = update('axes', indexBy(axis => axis.id || axis.label || v4()));

export default function (configuration) {
  if (!configuration.axes || !configuration.axes.length) {
    return configuration;
  }

  // add uuid to axes
  return indexAxes(configuration);
}
