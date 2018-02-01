// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView . .
// END-HISTORY
// ====================================================================

import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import { getViewPanels, getViewEntryPointsPanels, getViewTab } from 'store/reducers/ui/editor';
import { getConfigurationByViewId } from 'viewManager';
import {
  open as openModal,
} from 'store/actions/modals';
import { updateViewPanels, updateViewEntryPointsPanels, updateViewTab }
  from 'store/actions/ui';
import { getViewTitle, getViewTitleStyle } from 'store/reducers/views';
import {
  removeEntryPoint,
  updateEditorSearch,
} from 'store/actions/views';
import HistoryEditor from './HistoryEditor';

const mapStateToProps = createStructuredSelector({
  title: getViewTitle,
  titleStyle: getViewTitleStyle,
  configuration: getConfigurationByViewId,
  panels: getViewPanels,
  tab: getViewTab,
  entryPointsPanels: getViewEntryPointsPanels,
});

const mapDispatchToProps = (dispatch, { viewId }) => bindActionCreators({
  openModal,
  removeEntryPoint,
  updateViewPanels,
  updateViewTab,
  updateViewEntryPointsPanels,
  updateEditorSearch: search => updateEditorSearch(viewId, search),
}, dispatch);

const HistoryEditorContainer = connect(mapStateToProps, mapDispatchToProps)(HistoryEditor);

HistoryEditorContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default HistoryEditorContainer;
