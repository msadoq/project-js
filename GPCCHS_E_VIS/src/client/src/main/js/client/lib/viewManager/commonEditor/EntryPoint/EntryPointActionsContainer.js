import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { open as openModal } from 'store/actions/modals';
import { updateEditorSearch } from 'store/actions/views';
import EntryPointActions from 'viewManager/commonEditor/EntryPoint/EntryPointActions';

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch, { viewId }) => bindActionCreators({
  openModal,
  changeSearch: search => updateEditorSearch(viewId, search),
}, dispatch);

const EntryPointActionsContainer = connect(mapStateToProps, mapDispatchToProps)(EntryPointActions);

EntryPointActionsContainer.PropTypes = {
  viewId: PropTypes.string.isRequired,
  search: PropTypes.string,
  viewType: PropTypes.oneOf(['TextView', 'MimicView', 'HistoryView', 'PlotView']).isRequired,
};

export default EntryPointActionsContainer;
