import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getViewSubPanels } from 'store/reducers/ui/editor';
import { updateViewSubPanels } from 'store/actions/ui';
import {
  removeConstant,
  updateConstant,
  addConstant,
} from 'store/actions/views';
import { createStructuredSelector } from 'reselect';
import PlotConstants from './PlotConstants';
import { getAxes, getConstants } from '../../store/configurationSelectors';

const mapStateToProps = createStructuredSelector({
  axes: getAxes,
  constants: getConstants,
  panels: getViewSubPanels,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  removeConstant,
  updateConstant,
  addConstant,
  updateViewSubPanels,
}, dispatch);

const PlotConstantsContainer = connect(mapStateToProps, mapDispatchToProps)(PlotConstants);

PlotConstantsContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default PlotConstantsContainer;
