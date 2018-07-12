import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateViewPanels } from 'store/actions/ui';
import PUSMMETab from './PUSMMETab';

const mapDispatchToProps = dispatch => bindActionCreators({
  updateViewPanels,
}, dispatch);

const PUSMMETabContainer = connect(null, mapDispatchToProps)(PUSMMETab);

export default PUSMMETabContainer;
