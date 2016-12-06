/* eslint global-require:0 */
import _get from 'lodash/get';
import _isFunction from 'lodash/isFunction';
import globalConstants from 'common/constants';

const structures = {
  [globalConstants.DATASTRUCTURETYPE_LAST]: {
    getExpectedInterval: require('./last/getExpectedInterval'),
    retrieveNeededIntervals: require('./last/retrieveNeededIntervals'),
    addInterval: require('./last/addInterval'),
    parseEntryPoint: require('./last/parseEntryPoint'),
    viewDataUpdate: require('./last/viewDataUpdate'),
    cleanData: require('./last/cleanData'),
    removeEpData: require('./last/removeEpData'),
    isEpDifferent: require('./last/isEpDifferent'),
    updateEpLabel: require('./last/updateEpLabel'),
  },
  [globalConstants.DATASTRUCTURETYPE_RANGE]: {
    getExpectedInterval: require('./range/getExpectedInterval'),
    retrieveNeededIntervals: require('./range/retrieveNeededIntervals'),
    addInterval: require('./range/addInterval'),
    parseEntryPoint: require('./range/parseEntryPoint'),
    viewDataUpdate: require('./range/viewDataUpdate'),
    cleanData: require('./range/cleanData'),
    removeEpData: require('./range/removeEpData'),
    isEpDifferent: require('./range/isEpDifferent'),
    updateEpLabel: require('./range/updateEpLabel'),
  },
};

export default (type, name) => {
  const method = _get(structures, [type, name]);
  if (!_isFunction(method)) {
    throw new Error(`invalid function ${name} for structure type ${type}`);
  }

  return method;
};
