import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateViewPanels } from 'store/actions/ui';
import PUS15Tab from './PUS15Tab';

const mapDispatchToProps = dispatch => bindActionCreators({
  updateViewPanels,
}, dispatch);

const PUS15TabContainer = connect(null, mapDispatchToProps)(PUS15Tab);

export default PUS15TabContainer;
