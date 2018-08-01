import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateViewPanels } from 'store/actions/ui';
import PUS144Tab from './PUS144Tab';

const mapDispatchToProps = dispatch => bindActionCreators({
  updateViewPanels,
}, dispatch);

const PUS144TabContainer = connect(null, mapDispatchToProps)(PUS144Tab);

export default PUS144TabContainer;
