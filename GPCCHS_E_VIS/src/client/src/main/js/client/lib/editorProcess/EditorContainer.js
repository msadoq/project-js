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
  console.log('mapStateToProps state: ', state);
  const viewId = getViewId(state);
  console.log('mapStateToProps viewId: ', viewId);
  const content = getViewContent(state, { viewId });
  console.log('mapStateToProps content: ', content);
  const data = getTextViewData(state, { viewId });
  console.log('mapStateToProps data: ', data);
  const entryPoints = getViewEntryPoints(state, { viewId });
  console.log('mapStateToProps EP: ', entryPoints);

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
