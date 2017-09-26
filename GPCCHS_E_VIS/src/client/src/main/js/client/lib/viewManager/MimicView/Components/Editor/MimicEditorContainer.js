// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : add entry points to mimic view
// VERSION : 1.1.2 : DM : #6129 : 04/05/2017 : merge dev on mimic branch
// VERSION : 1.1.2 : DM : #6785 : 31/05/2017 : Add Misc/links in view editor
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Split ui reducer + prepare ui/dialog reducer
// VERSION : 1.1.2 : DM : #6129 : 10/07/2017 : MimicView editor rc-collapse implementation + fixes on Plot and Text editors too.
// VERSION : 1.1.2 : FA : #7256 : 25/07/2017 : Added top title in editor with colored vignette.
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MimicEditor from './MimicEditor';
import {
  addEntryPoint,
  removeEntryPoint,
  updateTitle,
  updateTitleStyle,
} from '../../../../store/actions/views';
import { getConfigurationByViewId } from '../../../../viewManager';
import {
  open as openModal,
} from '../../../../store/actions/modals';
import {
  updateViewPanels,
  updateViewEntryPointsPanels,
  updateViewTab,
} from '../../../../store/actions/ui';
import { getViewTitle, getViewTitleStyle } from '../../../../store/reducers/views';
import { getViewPanels, getViewEntryPointsPanels, getViewTab } from '../../../../store/reducers/ui/editor';

const mapStateToProps = createStructuredSelector({
  title: getViewTitle,
  titleStyle: getViewTitleStyle,
  configuration: getConfigurationByViewId,
  panels: getViewPanels,
  tab: getViewTab,
  entryPointsPanels: getViewEntryPointsPanels,
});

const mapDispatchToProps = {
  addEntryPoint,
  removeEntryPoint,
  updateTitle,
  updateTitleStyle,
  openModal,
  updateViewPanels,
  updateViewEntryPointsPanels,
  updateViewTab,
};

const MimicEditorContainer = connect(mapStateToProps, mapDispatchToProps)(MimicEditor);

MimicEditorContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default MimicEditorContainer;
