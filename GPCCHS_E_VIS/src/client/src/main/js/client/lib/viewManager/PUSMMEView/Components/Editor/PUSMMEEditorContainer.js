import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getViewPanels, getViewTab } from 'store/reducers/ui/editor';
import { getConfigurationByViewId } from 'viewManager/index';
import {
  open as openModal,
} from 'store/actions/modals';
import { getViewTitle, getViewTitleStyle } from 'store/reducers/views/index';
import { updateViewPanels, updateViewTab } from 'store/actions/ui';
import PUSMMEEditor from 'viewManager/PUSMMEView/Components/Editor/PUSMMEEditor';
import { updateEntryPoint } from 'store/actions/views';

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
  updateEntryPoint,
}, dispatch);

const PUSMMEEditorContainer = connect(mapStateToProps, mapDispatchToProps)(PUSMMEEditor);

PUSMMEEditorContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
  pageId: PropTypes.string.isRequired,
};

export default PUSMMEEditorContainer;
