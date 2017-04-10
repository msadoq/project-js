import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import DynamicEditor from './DynamicEditor';
import { getPageTimelines } from '../../../../store/selectors/timelines';
import { getViewTitle, getViewTitleStyle } from '../../../../store/reducers/views';
import {
  updateEntryPoint,
  updateTitle,
  updateTitleStyle,
} from '../../../../store/actions/views';
import { getConfigurationByViewId } from '../../../../viewManager';

const mapStateToProps = createStructuredSelector({
  title: getViewTitle,
  titleStyle: getViewTitleStyle,
  configuration: getConfigurationByViewId,
  timelines: getPageTimelines,
});

const mapDispatchToProps = {
  updateEntryPoint,
  updateTitle,
  updateTitleStyle,
};

const DynamicEditorContainer = connect(mapStateToProps, mapDispatchToProps)(DynamicEditor);

DynamicEditorContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
  pageId: PropTypes.string.isRequired,
};

export default DynamicEditorContainer;
