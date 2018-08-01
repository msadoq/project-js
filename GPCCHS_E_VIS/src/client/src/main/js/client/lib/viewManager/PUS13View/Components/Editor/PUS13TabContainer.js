import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateViewPanels } from 'store/actions/ui';
import PUS13Tab from './PUS13Tab';

const mapDispatchToProps = dispatch => bindActionCreators({
  updateViewPanels,
}, dispatch);

const PUS13TabContainer = connect(null, mapDispatchToProps)(PUS13Tab);

export default PUS13TabContainer;
