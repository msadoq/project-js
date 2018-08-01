import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateViewPanels } from 'store/actions/ui';
import PUS142Tab from './PUS142Tab';

const mapDispatchToProps = dispatch => bindActionCreators({
  updateViewPanels,
}, dispatch);

const PUS142TabContainer = connect(null, mapDispatchToProps)(PUS142Tab);

export default PUS142TabContainer;
