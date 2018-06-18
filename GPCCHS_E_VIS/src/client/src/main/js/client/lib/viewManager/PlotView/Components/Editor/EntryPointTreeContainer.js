import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { askRemoveEntryPoint, updateEntryPoint } from 'store/actions/views';
import { updateViewPanels } from 'store/actions/ui';
import { bindActionCreators } from 'redux';
import { getViewEntryPointsPanels } from 'store/reducers/ui/editor';
import EntryPointTree from './EntryPointTree';


const mapStateToProps = createStructuredSelector({
  entryPointsPanels: getViewEntryPointsPanels,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  askRemoveEntryPoint,
  updateEntryPoint,
  updateViewPanels,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EntryPointTree);
