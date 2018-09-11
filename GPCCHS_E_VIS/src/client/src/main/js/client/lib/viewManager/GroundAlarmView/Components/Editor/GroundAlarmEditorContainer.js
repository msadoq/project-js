import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import { getConfigurationByViewId } from 'viewManager';
import { getViewTitle, getViewTitleStyle } from 'store/reducers/views';
import { open as openModal } from 'store/actions/modals';
import { updateViewTab, updateViewPanels } from 'store/actions/ui';
import { getViewTab, getViewPanels } from 'store/reducers/ui/editor';
import {
  updateAlarmMode,
} from 'store/actions/views';
import GroundAlarmEditor from './GroundAlarmEditor';

const mapStateToProps = createStructuredSelector({
  title: getViewTitle,
  titleStyle: getViewTitleStyle,
  configuration: getConfigurationByViewId,
  tab: getViewTab,
  panels: getViewPanels,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateAlarmMode,
  updateViewTab,
  updateViewPanels,
  openModal,
}, dispatch);

const GroundAlarmEditorContainer = connect(mapStateToProps, mapDispatchToProps)(GroundAlarmEditor);

GroundAlarmEditorContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
  pageId: PropTypes.string.isRequired,
};

export default GroundAlarmEditorContainer;
