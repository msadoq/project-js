// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView . .
// END-HISTORY
// ====================================================================

import { createStructuredSelector } from 'reselect';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getViewPanels, getViewTab } from 'store/reducers/ui/editor';
import { getConfigurationByViewId } from 'viewManager';
import {
  open as openModal,
} from 'store/actions/modals';
import { getViewTitle, getViewTitleStyle } from 'store/reducers/views';
import { updateViewPanels, updateViewTab } from 'store/actions/ui';
import HistoryEditor from './HistoryEditor';

const mapStateToProps = createStructuredSelector({
  title: getViewTitle,
  titleStyle: getViewTitleStyle,
  configuration: getConfigurationByViewId,
  panels: getViewPanels,
  tab: getViewTab,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  openModal,
  updateViewTab,
  updateViewPanels,
}, dispatch);

const HistoryEditorContainer = connect(mapStateToProps, mapDispatchToProps)(HistoryEditor);
const { string } = PropTypes;

HistoryEditorContainer.propTypes = {
  viewId: string.isRequired,
  pageId: string.isRequired,
};

export default HistoryEditorContainer;
