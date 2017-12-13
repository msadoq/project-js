// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 21/02/2017 : Improve and debug code editor
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Move getViewId simple selector from selectors/editor to reducers/editor
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Rename editor/getViewId simple selector in getEditorTextViewId
// VERSION : 1.1.2 : DM : #6129 : 19/06/2017 : moved components/animations in separate files. Possibility to add it in editor using context menu
// END-HISTORY
// ====================================================================

import { connect } from 'react-redux';
import { getViewId } from '../store/reducers/codeEditor';
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
