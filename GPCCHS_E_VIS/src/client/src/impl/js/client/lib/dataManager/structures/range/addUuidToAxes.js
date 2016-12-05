/* eslint no-underscore-dangle: 0 */
const { v4 } = require('node-uuid');
const _omit = require('lodash/omit');

export default function addUuidToAxes(viewConf) {
  if (!viewConf.axes || !viewConf.axes.length) {
    return viewConf;
  }
  const viewConfWithId = _omit(viewConf, 'axes');
  viewConfWithId.axes = {};
  // Id affectation
  viewConf.axes.forEach((axis) => {
    let id = axis.id || axis.label;
    if (!id) {
      id = v4();
    }
    viewConfWithId.axes[id] = Object.assign({}, axis, { id });
  });

  return viewConfWithId;
}
