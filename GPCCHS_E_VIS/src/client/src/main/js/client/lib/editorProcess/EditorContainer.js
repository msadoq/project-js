import { connect } from 'react-redux';
import { getViewId } from '../store/selectors/editor';
import {
  getViewContent,
  getTextViewData,
  makeGetViewEntryPoints,
} from '../store/selectors/views';
import { updateContent } from '../store/actions/views';
import { closeHtmlEditor } from '../store/actions/editor';

import HtmlEditor from './HtmlEditor';

const getViewEntryPoints = makeGetViewEntryPoints();

const mapStateToProps = (state) => {
  const viewId = getViewId(state);
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
  mapStateToProps, { updateContent, closeHtmlEditor }
)(HtmlEditor);

export default EditorContainer;
