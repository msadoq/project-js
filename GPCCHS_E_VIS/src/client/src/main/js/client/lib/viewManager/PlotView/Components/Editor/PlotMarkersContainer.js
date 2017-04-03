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
