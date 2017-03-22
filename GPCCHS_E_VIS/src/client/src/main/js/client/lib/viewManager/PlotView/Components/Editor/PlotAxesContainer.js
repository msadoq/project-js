import { PropTypes } from 'react';
import { connect } from 'react-redux';
import PlotAxes from './PlotAxes';
import { getView } from '../../../../store/reducers/views';
import {
  removeAxis,
  updateAxis,
  addAxis,
  updateShowYAxes,
} from '../../../../store/actions/views';

const mapStateToProps = (state, { viewId }) => {
  const view = getView(state, { viewId });
  return {
    showYAxes: view.configuration.showYAxes,
    axes: view.configuration.axes,
    entryPoints: view.configuration.entryPoints,
  };
};

const PlotAxesContainer = connect(mapStateToProps, {
  removeAxis,
  updateAxis,
  addAxis,
  updateShowYAxes,
})(PlotAxes);

PlotAxesContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default PlotAxesContainer;
