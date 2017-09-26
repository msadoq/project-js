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
import PlotMarkers from './PlotMarkers';
import { getMarkers, getAxes } from '../../store/configurationSelectors';
import {
  updateMarker,
} from '../../../../store/actions/views';

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
