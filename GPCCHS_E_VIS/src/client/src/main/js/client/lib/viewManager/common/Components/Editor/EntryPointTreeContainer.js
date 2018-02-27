import { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import EntryPointTree from 'viewManager/common/Components/Editor/EntryPointTree';
import { removeEntryPoint } from 'store/actions/views';
import { updateViewPanels } from 'store/actions/ui';
import { getViewEntryPointsPanels } from 'store/reducers/ui/editor';

const mapStateToProps = createStructuredSelector({
  entryPointsPanels: getViewEntryPointsPanels,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  removeEntryPoint,
  updateViewPanels,
}, dispatch);

const EntryPointTreeContainer = connect(mapStateToProps, mapDispatchToProps)(EntryPointTree);

const { string, arrayOf, shape } = PropTypes;

EntryPointTreeContainer.PropTypes = {
  viewId: string.isRequired,
  pageId: string.isRequired,
  entryPoints: arrayOf(shape({})),
  search: string,
};

export default EntryPointTreeContainer;
