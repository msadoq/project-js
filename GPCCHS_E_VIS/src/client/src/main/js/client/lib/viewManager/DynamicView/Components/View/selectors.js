import _ from 'lodash/fp';

export default (state, { viewId }) => _.get(`views[${viewId}].configuration.entryPoints[0].connectedData.formula`, state);
