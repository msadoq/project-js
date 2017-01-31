import { connect } from 'react-redux';
// eslint-disable-next-line import/no-named-as-default
import PlotView from './PlotView';
import { addEntryPoint } from '../../../lib/store/actions/views';
import {
  getPlotViewData,
} from '../../../lib/store/selectors/views';

export const PlotViewContainer = connect(
  (state, { viewId }) => ({
    data: getPlotViewData(state, viewId),
  }), {
    addEntryPoint
  }
)(PlotView); // eslint-disable-line new-cap

export default PlotViewContainer;
