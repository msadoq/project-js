import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateTableCols } from 'store/actions/views';
import { getViewConfigurationTableCols } from 'store/selectors/views';
import GroundAlarmTab from './GroundAlarmTab';

const mapStateToProps = (state, { viewId }) => ({
  cols: getViewConfigurationTableCols(state, { viewId }),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateTableCols,
}, dispatch);

const GroundAlarmTabContainer = connect(mapStateToProps, mapDispatchToProps)(GroundAlarmTab);

export default GroundAlarmTabContainer;
