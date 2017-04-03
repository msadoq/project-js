import _ from 'lodash/fp';

const getFormula = (state, { viewId }) => (
  _.get(`views[${viewId}].configuration.entryPoints[0].connectedData.formula`, state)
);

export default {
  getFormula,
};
