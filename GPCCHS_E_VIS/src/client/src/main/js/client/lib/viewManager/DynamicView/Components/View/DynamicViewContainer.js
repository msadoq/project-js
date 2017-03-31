import { PropTypes } from 'react';
import { connect } from 'react-redux';
import DynamicView from './DynamicView';
import { getViewConfiguration } from '../../../../store/reducers/views';
import { getViewEntryPoints } from '../../../../store/selectors/views';
import getFormula from './selectors';
import { getData } from '../../store/dataReducer';

const mapStateToProps = (state, { viewId }) => ({
  formula: getFormula(state, { viewId }),
  configuration: getViewConfiguration(state, { viewId }),
  entryPoints: getViewEntryPoints(state, { viewId }),
  data: getData(state, { viewId }),
});

export const DynamicViewContainer = connect(mapStateToProps, null)(DynamicView);

DynamicViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};
export default DynamicViewContainer;
