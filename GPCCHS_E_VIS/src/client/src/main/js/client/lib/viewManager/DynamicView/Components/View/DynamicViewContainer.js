import _ from 'lodash/fp';
import { PropTypes } from 'react';
import { connect } from 'react-redux';
import DynamicView from './DynamicView';
import { getViewEntryPoints } from '../../../../store/selectors/views';

const mapStateToProps = (state, { viewId }) => {
  const getFormula = _.get(`views[${viewId}].configuration.entryPoints[0].connectedData.formula`);
  const getConfiguration = _.get(`views[${viewId}].configuration`);
  return {
    formula: getFormula(state),
    configuration: getConfiguration(state),
    entryPoints: getViewEntryPoints(state, { viewId }),
  };
};
export const DynamicViewContainer = connect(mapStateToProps, null)(DynamicView);

DynamicViewContainer.propTypes = {
  openInspector: PropTypes.func.isRequired,
  viewId: PropTypes.string.isRequired,
};
export default DynamicViewContainer;
