/* eslint no-underscore-dangle: 0 */
const { v4 } = require('node-uuid');
const _omit = require('lodash/omit');

export default function addUuidToAxes(viewConf) {
  if (!viewConf.axes || !viewConf.axes.length) {
    return viewConf;
  }
  const viewConfWithId = _omit(viewConf, 'axes');
  viewConfWithId.axes = {};
  const tableIdLabel = {};
  // Id affectation
  viewConf.axes.forEach((axis) => {
    let uuid = axis.uuid;
    if (!uuid) {
      uuid = v4();
    }
    viewConfWithId.axes[uuid] = Object.assign({}, axis, { uuid });
    tableIdLabel[axis.label] = uuid;
  });
  // Update in entry point
  /* eslint no-param-reassign: 0 */
  viewConfWithId.entryPoints.forEach((ep) => {
    if (ep.connectedDataX.axisId) {
      ep.connectedDataX.axisId = tableIdLabel[ep.connectedDataX.axisId];
    }
    if (ep.connectedDataY.axisId) {
      ep.connectedDataY.axisId = tableIdLabel[ep.connectedDataY.axisId];
    }
  });

  return viewConfWithId;
}
