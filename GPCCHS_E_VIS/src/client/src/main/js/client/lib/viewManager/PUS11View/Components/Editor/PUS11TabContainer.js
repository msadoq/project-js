import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateViewPanels } from 'store/actions/ui';
import PUS11Tab from './PUS11Tab';

const mapDispatchToProps = dispatch => bindActionCreators({
  updateViewPanels,
}, dispatch);

const PUS11TabContainer = connect(null, mapDispatchToProps)(PUS11Tab);

export default PUS11TabContainer;
