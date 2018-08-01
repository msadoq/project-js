import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateViewPanels } from 'store/actions/ui';
import PUS140Tab from './PUS140Tab';

const mapDispatchToProps = dispatch => bindActionCreators({
  updateViewPanels,
}, dispatch);

const PUS140TabContainer = connect(null, mapDispatchToProps)(PUS140Tab);

export default PUS140TabContainer;
