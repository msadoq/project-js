import { createStructuredSelector } from 'reselect';
import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextEditor from './TextEditor';
import {
  removeEntryPoint,
  updateTitle,
  updateTitleStyle,
  updateEditorSearch,
} from '../../../../store/actions/views';
import {
  open as openModal,
} from '../../../../store/actions/modals';
import { updateViewPanels } from '../../../../store/actions/ui';
import { getViewPanels, getViewEntryPointsPanels } from '../../../../store/reducers/ui';
import { getConfigurationByViewId } from '../../../../viewManager';

const mapStateToProps = createStructuredSelector({
  configuration: getConfigurationByViewId,
  panels: getViewPanels,
  entryPointsPanels: getViewEntryPointsPanels,
});

const mapDispatchToProps = (dispatch, { viewId }) => bindActionCreators({
  openModal,
  removeEntryPoint,
  updateTitle,
  updateTitleStyle,
  updateViewPanels,
  updateEditorSearch: search => updateEditorSearch(viewId, search),
}, dispatch);

const TextEditorContainer = connect(mapStateToProps, mapDispatchToProps)(TextEditor);

TextEditorContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default TextEditorContainer;
