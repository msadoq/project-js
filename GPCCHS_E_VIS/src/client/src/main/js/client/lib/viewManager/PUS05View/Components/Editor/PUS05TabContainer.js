import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateViewPanels } from 'store/actions/ui';
import PUS05Tab from './PUS05Tab';

const mapDispatchToProps = dispatch => bindActionCreators({
  updateViewPanels,
}, dispatch);

const PUS05TabContainer = connect(null, mapDispatchToProps)(PUS05Tab);

export default PUS05TabContainer;
