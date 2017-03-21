import { connect } from 'react-redux';
import { getEditorTextViewId } from '../store/reducers/editor';
import CodeEditor from './CodeEditor';

const mapStateToProps = (state) => {
  const viewId = getEditorTextViewId(state);
  return {
    viewId,
  };
};
export const CodeEditorContainer = connect(
  mapStateToProps, {}
)(CodeEditor);

export default CodeEditorContainer;
