import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateTableColumns } from 'store/actions/views';
import { getViewConfigurationTables } from 'store/selectors/views';
import HistoryTab from './HistoryTab';

const mapStateToProps = (state, { viewId }) => ({
  tables: getViewConfigurationTables(state, { viewId }),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateTableColumns,
}, dispatch);

const HistoryTabContainer = connect(mapStateToProps, mapDispatchToProps)(HistoryTab);

export default HistoryTabContainer;
