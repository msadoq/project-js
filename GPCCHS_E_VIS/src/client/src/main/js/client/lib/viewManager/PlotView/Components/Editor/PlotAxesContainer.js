import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getAxes, getShowYAxes, getEntryPoints } from 'viewManager/PlotView/store/configurationSelectors';
import { getViewSubPanels } from 'store/reducers/ui/editor';
import { updateViewSubPanels } from 'store/actions/ui';
import {
  removeAxis,
  updateAxis,
  addAxis,
  updateShowYAxes,
} from 'store/actions/views';
import PlotAxes from './PlotAxes';

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
