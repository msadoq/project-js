import { connect } from 'react-redux';
import { getViewId } from '../store/reducers/editor';
import CodeEditor from './CodeEditor';

const mapStateToProps = (state) => {
  const viewId = getViewId(state);
  return {
    viewId,
  };
};
export const CodeEditorContainer = connect(
  mapStateToProps, {}
)(CodeEditor);

export default CodeEditorContainer;
