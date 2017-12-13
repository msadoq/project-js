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
