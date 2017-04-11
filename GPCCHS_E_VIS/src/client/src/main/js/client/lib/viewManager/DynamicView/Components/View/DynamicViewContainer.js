import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import DynamicView from './DynamicView';
import { getConfigurationByViewId } from '../../../../viewManager';
import { getViewEntryPoints } from '../../../../store/selectors/views';
import { getFormula } from './selectors';
import { getData } from '../../store/dataReducer';

const mapStateToProps = createStructuredSelector({
  formula: getFormula,
  configuration: getConfigurationByViewId,
  entryPoints: getViewEntryPoints,
  data: getData,
});

const DynamicViewContainer = connect(mapStateToProps, null)(DynamicView);

DynamicViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};
export default DynamicViewContainer;
