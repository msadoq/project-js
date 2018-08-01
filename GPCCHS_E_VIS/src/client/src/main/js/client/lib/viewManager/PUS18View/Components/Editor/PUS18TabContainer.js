import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateViewPanels } from 'store/actions/ui';
import PUS18Tab from './PUS18Tab';

const mapDispatchToProps = dispatch => bindActionCreators({
  updateViewPanels,
}, dispatch);

const PUS18TabContainer = connect(null, mapDispatchToProps)(PUS18Tab);

export default PUS18TabContainer;
