import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import PlotAxes from './PlotAxes';
import { getAxes, getShowYAxes, getEntryPoints } from '../../store/configurationSelectors';
import { getViewSubPanels } from '../../../../store/reducers/ui/editor';
import { updateViewSubPanels } from '../../../../store/actions/ui';
import {
  removeAxis,
  updateAxis,
  addAxis,
  updateShowYAxes,
} from '../../../../store/actions/views';

const mapStateToProps = createStructuredSelector({
  axes: getAxes,
  entryPoints: getEntryPoints,
  showYAxes: getShowYAxes,
  panels: getViewSubPanels,
});

const mapDispatchToProps = {
  removeAxis,
  updateAxis,
  addAxis,
  updateShowYAxes,
  updateViewSubPanels,
};

const PlotAxesContainer = connect(mapStateToProps, mapDispatchToProps)(PlotAxes);

PlotAxesContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default PlotAxesContainer;
