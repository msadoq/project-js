import _ from 'lodash/fp';
import { PropTypes } from 'react';
import { connect } from 'react-redux';
import DynamicEditor from './DynamicEditor';
import { getTimebarTimelinesSelector } from '../../../../store/selectors/timebars';
import { getView } from '../../../../store/reducers/views';
import { getPage } from '../../../../store/reducers/pages';
import {
  updateEntryPoint,
  updateTitle,
  updateTitleStyle,
} from '../../../../store/actions/views';

const mapStateToProps = (state, { viewId, pageId }) => {
  const view = getView(state, { viewId });
  const { timebarUuid } = getPage(state, { pageId });
  const getConfiguration = _.get(`views[${viewId}].configuration`);
  const timelines = getTimebarTimelinesSelector(state, { timebarUuid });
  return {
    title: view.title,
    titleStyle: view.titleStyle,
    configuration: getConfiguration(state),
    timelines,
  };
};

const DynamicEditorContainer = connect(mapStateToProps, {
  updateEntryPoint,
  updateTitle,
  updateTitleStyle,
})(DynamicEditor);

DynamicEditorContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default DynamicEditorContainer;
