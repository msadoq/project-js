import { connect } from 'react-redux';
import { getViewId } from '../store/selectors/editor';
import {
  getViewContent,
  getTextViewData,
  makeGetViewEntryPoints,
} from '../store/selectors/views';
import { updateContent } from '../store/actions/views';
import HtmlEditor from './HtmlEditor';

const getViewEntryPoints = makeGetViewEntryPoints();

const mapStateToProps = (state) => {
  console.log(state);
  const viewId = getViewId(state);
  console.log(viewId);
  const content = getViewContent(state, viewId);
  const data = getTextViewData(state, viewId);
  const entryPoints = getViewEntryPoints(state, viewId);
  return {
    viewId,
    content,
    data,
    entryPoints,
  };
};
export const EditorContainer = connect(
  mapStateToProps, { updateContent }
)(HtmlEditor);

export default EditorContainer;
