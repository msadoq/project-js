import { v4 } from 'node-uuid';
import update from 'lodash/fp/update';
import indexBy from 'lodash/fp/indexBy';

const indexAxes = update('axes', indexBy(axis => axis.id || axis.label || v4()));

export default function addUuidToAxes(viewConf) {
  if (!viewConf.axes || !viewConf.axes.length) {
    return viewConf;
  }
  return indexAxes(viewConf);
}
