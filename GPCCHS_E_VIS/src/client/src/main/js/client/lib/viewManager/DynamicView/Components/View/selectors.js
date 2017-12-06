import _ from 'lodash/fp';
import { getConfigurationByViewId } from 'viewManager';

const getFormula = (state, ownProps) => {
  const configuration = getConfigurationByViewId(state, ownProps);
  return _.get('entryPoints[0].connectedData.formula', configuration);
};

export default {
  getFormula,
};
