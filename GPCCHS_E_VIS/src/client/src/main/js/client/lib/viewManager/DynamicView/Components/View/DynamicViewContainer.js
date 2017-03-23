import _ from 'lodash/fp';
import { PropTypes } from 'react';
import { connect } from 'react-redux';
import DynamicView from './DynamicView';
import { getViewEntryPoints } from '../../../../store/selectors/views';

import { getData } from '../../store/dataReducer';

const mapStateToProps = (state, { viewId }) => {
  const getFormula = _.get(`views[${viewId}].configuration.entryPoints[0].connectedData.formula`);
  const getConfiguration = _.get(`views[${viewId}].configuration`);
  const data = getData(state, { viewId });
  return {
    formula: getFormula(state),
    configuration: getConfiguration(state),
    entryPoints: getViewEntryPoints(state, { viewId }),
    data,
  };
};
export const DynamicViewContainer = connect(mapStateToProps, null)(DynamicView);

DynamicViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};
export default DynamicViewContainer;
