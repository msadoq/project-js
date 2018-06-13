import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateTableCols } from 'store/actions/views';
import { updateViewPanels } from 'store/actions/ui';
import { createStructuredSelector } from 'reselect';
import PUS11Tab from './PUS11Tab';
import { getConfigurationByViewId } from '../../../index';

const mapStateToProps = createStructuredSelector({
  configuration: getConfigurationByViewId,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateTableCols,
  updateViewPanels,
}, dispatch);

const PUS11TabContainer = connect(mapStateToProps, mapDispatchToProps)(PUS11Tab);

export default PUS11TabContainer;
