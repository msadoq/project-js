import { PropTypes } from 'react';
import { connect } from 'react-redux';
import PlotGrids from './PlotGrids';
import { getView } from '../../../../store/selectors/views';
import {
  updateGrid,
} from '../../../../store/actions/views';

const mapStateToProps = (state, { viewId }) => {
  const view = getView(state, { viewId });
  return {
    grids: view.configuration.grids,
    axes: view.configuration.axes,
  };
};

const PlotGridsContainer = connect(mapStateToProps, {
  updateGrid,
})(PlotGrids);

PlotGridsContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default PlotGridsContainer;
