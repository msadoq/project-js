import { connect } from 'react-redux';
// eslint-disable-next-line import/no-named-as-default
import PlotView from './PlotView';
import { addEntryPoint } from '../../../lib/store/actions/views';

export const PlotViewContainer = connect(null, {
  addEntryPoint,
})(PlotView); // eslint-disable-line new-cap

export default PlotViewContainer;
