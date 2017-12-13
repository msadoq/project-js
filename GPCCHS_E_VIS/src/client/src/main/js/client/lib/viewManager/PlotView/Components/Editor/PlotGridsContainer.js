// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting between commonEditor and commonReduxForm.
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getView/getViews simple selectors in store/reducers/views
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Add configuration selectors in ViewManager
// END-HISTORY
// ====================================================================

import { PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getGrids, getAxes } from 'viewManager/PlotView/store/configurationSelectors';

import {
  updateGrid,
} from 'store/actions/views';
import PlotGrids from './PlotGrids';

const mapStateToProps = createStructuredSelector({
  grids: getGrids,
  axes: getAxes,
});

const PlotGridsContainer = connect(mapStateToProps, {
  updateGrid,
})(PlotGrids);

PlotGridsContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default PlotGridsContainer;
