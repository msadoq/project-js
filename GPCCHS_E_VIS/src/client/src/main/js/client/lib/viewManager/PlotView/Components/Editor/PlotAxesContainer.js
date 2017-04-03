import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import PlotAxes from './PlotAxes';
import { getViewEntryPoints } from '../../../../store/selectors/views';
import { getAxes, getShowYAxes } from '../../store/configurationSelectors';
import {
  removeAxis,
  updateAxis,
  addAxis,
  updateShowYAxes,
} from '../../../../store/actions/views';

const mapStateToProps = createStructuredSelector({
  axes: getAxes,
  entryPoints: getViewEntryPoints,
  showYAxes: getShowYAxes,
});

const mapDispatchToProps = {
  removeAxis,
  updateAxis,
  addAxis,
  updateShowYAxes,
};

const PlotAxesContainer = connect(mapStateToProps, mapDispatchToProps)(PlotAxes);

PlotAxesContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default PlotAxesContainer;
