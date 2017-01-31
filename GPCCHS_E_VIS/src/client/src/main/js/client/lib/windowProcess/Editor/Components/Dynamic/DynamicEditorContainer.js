import { PropTypes } from 'react';
import { connect } from 'react-redux';
import DynamicEditor from './DynamicEditor';
import { getTimebarTimelinesSelector } from '../../../../store/selectors/timebars';
import { getView } from '../../../../store/selectors/views';
import { getPage } from '../../../../store/selectors/pages';
import {
  updateEntryPoint,
  updateTitle,
  updateTitleStyle,
} from '../../../../store/actions/views';

const mapStateToProps = (state, { viewId, focusedPageId }) => {
  const view = getView(state, viewId);
  const { timebarUuid } = getPage(state, focusedPageId);
  const timelines = getTimebarTimelinesSelector(state, timebarUuid);
  return {
    title: view.configuration.title,
    type: view.configuration.type,
    titleStyle: view.configuration.titleStyle,
    timelines
  };
};

const DynamicEditorContainer = connect(mapStateToProps, {
  updateEntryPoint,
  updateTitle,
  updateTitleStyle,
})(DynamicEditor);

DynamicEditorContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
  viewType: PropTypes.string.isRequired,
  configuration: PropTypes.object,
  closeEditor: PropTypes.func
};

export default DynamicEditorContainer;
