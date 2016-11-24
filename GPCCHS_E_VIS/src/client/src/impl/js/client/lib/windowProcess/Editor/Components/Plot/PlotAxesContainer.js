import { PropTypes } from 'react';
import { connect } from 'react-redux';
import PlotAxes from './PlotAxes';
import { getView } from '../../../../store/selectors/views';
import {
  removeAxis,
  updateAxis
} from '../../../../store/actions/views';

const mapStateToProps = (state, { viewId }) => {
  const view = getView(state, viewId);
  return {
    axes: view.configuration.axes
  };
};

const PlotAxesContainer = connect(mapStateToProps, {
  removeAxis,
  updateAxis
})(PlotAxes);

PlotAxesContainer.propTypes = {
  viewId: PropTypes.string.isRequired
};

export default PlotAxesContainer;
