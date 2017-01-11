const { indexBy, over, lensProp } = require('ramda');
const { v4 } = require('node-uuid');

const overAxes = over(lensProp('axes'));
const indexAxes = overAxes(indexBy(axis => axis.id || axis.label || v4()));

export default function addUuidToAxes(viewConf) {
  if (!viewConf.axes || !viewConf.axes.length) {
    return viewConf;
  }
  return indexAxes(viewConf);
}
