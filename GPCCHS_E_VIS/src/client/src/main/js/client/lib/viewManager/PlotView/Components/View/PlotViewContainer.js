import { connect } from 'react-redux';
import SizablePlotView from './GrizzlyPlotView';
import { addEntryPoint } from '../../../../store/actions/views';

export const PlotViewContainer = connect(null, {
  addEntryPoint,
})(SizablePlotView);

export default PlotViewContainer;
