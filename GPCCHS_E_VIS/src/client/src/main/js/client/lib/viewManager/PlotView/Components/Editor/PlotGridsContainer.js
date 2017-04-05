import { PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import PlotGrids from './PlotGrids';

import { getGrids, getAxes } from '../../store/configurationSelectors';
import {
  updateGrid,
} from '../../../../store/actions/views';

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
