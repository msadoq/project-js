import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateViewPanels } from 'store/actions/ui';
import PUS12Tab from './PUS12Tab';

const mapDispatchToProps = dispatch => bindActionCreators({
  updateViewPanels,
}, dispatch);

const PUS12TabContainer = connect(null, mapDispatchToProps)(PUS12Tab);

export default PUS12TabContainer;
