import { connect } from 'react-redux';
import _ from 'lodash/fp';
import { getConfigurationByViewId } from 'viewManager';
import { bindActionCreators } from 'redux';
import {
  addConstant,
} from 'store/actions/views';
import AddPlotConstantWrapper from './AddPlotConstantWrapper';

const mapStateToProps = (state, { viewId }) => {
  const viewConfiguration = getConfigurationByViewId(state, { viewId });
  return {
    constants: _.getOr({}, ['constants'], viewConfiguration),
    axes: _.getOr({}, ['axes'], viewConfiguration),
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  addConstant,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddPlotConstantWrapper);
