import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  addEntryPoint,
  removeEntryPoint,
  updateTitle,
  updateTitleStyle,
} from 'store/actions/views';
import { getConfigurationByViewId } from 'viewManager';
import {
  open as openModal,
} from 'store/actions/modals';
import {
  updateViewPanels,
  updateViewEntryPointsPanels,
  updateViewTab,
} from 'store/actions/ui';
import { getViewTitle, getViewTitleStyle } from 'store/reducers/views';
import { getViewPanels, getViewEntryPointsPanels, getViewTab } from 'store/reducers/ui/editor';
import MimicEditor from './MimicEditor';

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
