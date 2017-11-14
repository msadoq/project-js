import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import GroundAlarmEditor from './GroundAlarmEditor';
import { getPageTimelines } from '../../../../store/selectors/timelines';
import { getViewTitle, getViewTitleStyle } from '../../../../store/reducers/views';
import {
  updateEntryPoint,
  updateTitle,
  updateTitleStyle,
} from '../../../../store/actions/views';
import { updateViewTab, updateViewPanels } from '../../../../store/actions/ui';
import { getViewTab, getViewPanels } from '../../../../store/reducers/ui/editor';
import { getDomains } from '../../../../store/reducers/domains';
import { getConfigurationByViewId } from '../../../../viewManager';
import { open as openModal } from '../../../../store/actions/modals';

const mapStateToProps = createStructuredSelector({
  title: getViewTitle,
  titleStyle: getViewTitleStyle,
  configuration: getConfigurationByViewId,
  timelines: getPageTimelines,
  domains: getDomains,
  tab: getViewTab,
  panels: getViewPanels,
});

const mapDispatchToProps = {
  updateEntryPoint,
  updateTitle,
  updateTitleStyle,
  updateViewTab,
  updateViewPanels,
  openModal,
};

const GroundAlarmEditorContainer = connect(mapStateToProps, mapDispatchToProps)(GroundAlarmEditor);

GroundAlarmEditorContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
  pageId: PropTypes.string.isRequired,
};

export default GroundAlarmEditorContainer;
