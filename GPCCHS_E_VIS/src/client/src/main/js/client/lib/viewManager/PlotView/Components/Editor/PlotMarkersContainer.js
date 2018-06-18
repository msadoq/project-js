// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting
//  between commonEditor and commonReduxForm.
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getView/getViews simple selectors in
//  store/reducers/views
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Add configuration selectors in ViewManager
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getMarkers, getAxes } from 'viewManager/PlotView/store/configurationSelectors';
import {
  updateMarker,
} from 'store/actions/views';
import PlotMarkers from './PlotMarkers';

const mapStateToProps = createStructuredSelector({
  markers: getMarkers,
  axes: getAxes,
});

const PlotMarkersContainer = connect(mapStateToProps, {
  updateMarker,
})(PlotMarkers);

PlotMarkersContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default PlotMarkersContainer;
