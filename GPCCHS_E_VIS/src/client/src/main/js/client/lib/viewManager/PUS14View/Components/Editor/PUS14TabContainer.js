import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateViewPanels } from 'store/actions/ui';
import PUS14Tab from './PUS14Tab';

const mapDispatchToProps = dispatch => bindActionCreators({
  updateViewPanels,
}, dispatch);

const PUS14TabContainer = connect(null, mapDispatchToProps)(PUS14Tab);

export default PUS14TabContainer;
