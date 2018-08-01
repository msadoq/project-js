import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateViewPanels } from 'store/actions/ui';
import PUS19Tab from './PUS19Tab';

const mapDispatchToProps = dispatch => bindActionCreators({
  updateViewPanels,
}, dispatch);

const PUS19TabContainer = connect(null, mapDispatchToProps)(PUS19Tab);

export default PUS19TabContainer;
