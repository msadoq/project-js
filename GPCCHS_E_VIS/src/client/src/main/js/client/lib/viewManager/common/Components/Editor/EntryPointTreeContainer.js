import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import EntryPointTree from 'viewManager/common/Components/Editor/EntryPointTree';
import { askRemoveEntryPoint, updateEntryPoint } from 'store/actions/views';
import { updateViewPanels } from 'store/actions/ui';
import { getViewEntryPointsPanels } from 'store/reducers/ui/editor';

const mapStateToProps = createStructuredSelector({
  entryPointsPanels: getViewEntryPointsPanels,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  askRemoveEntryPoint,
  updateEntryPoint,
  updateViewPanels,
}, dispatch);

const EntryPointTreeContainer = connect(mapStateToProps, mapDispatchToProps)(EntryPointTree);

EntryPointTreeContainer.PropTypes = {
  viewId: PropTypes.string.isRequired,
  pageId: PropTypes.string.isRequired,
  entryPoints: PropTypes.arrayOf(PropTypes.shape({})),
  search: PropTypes.string,
};

export default EntryPointTreeContainer;
