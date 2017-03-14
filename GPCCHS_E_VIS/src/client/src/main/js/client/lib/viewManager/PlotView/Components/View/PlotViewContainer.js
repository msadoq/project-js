import _ from 'lodash/fp';
import { connect } from 'react-redux';
import SizablePlotView from './PlotView';
import { addEntryPoint } from '../../../../store/actions/views';
import { getViewEntryPoints } from '../../../../store/selectors/views';

const mapStateToProps = (state, { viewId }) => {
  const getConfiguration = _.get(`views[${viewId}].configuration`);
  return {
    configuration: getConfiguration(state),
    entryPoints: getViewEntryPoints(state, { viewId }),
  };
};

const mapDispatchToProps = { addEntryPoint };

export const PlotViewContainer = connect(mapStateToProps, mapDispatchToProps)(SizablePlotView);

export default PlotViewContainer;
