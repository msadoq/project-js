// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting
//  between commonEditor and commonReduxForm.
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Move getViewId simple selector from selectors/editor
//  to reducers/editor
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Rename editor/getViewId simple selector in
//  getEditorTextViewId
// VERSION : 1.1.2 : DM : #6129 : 19/06/2017 : moved components/animations in separate files.
//  Possibility to add it in editor using context menu
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import { connect } from 'react-redux';
import { openCodeEditor, closeCodeEditor } from 'store/actions/editor';
import { getViewId as getCodeEditorViewId } from 'store/reducers/codeEditor';
import TextTab from './TextTab';


const mapStateToProps = (state) => {
  const viewId = getCodeEditorViewId(state);
  return {
    codeEditorViewId: viewId,
  };
};

const TextTabContainer = connect(mapStateToProps, { openCodeEditor, closeCodeEditor })(TextTab);

export default TextTabContainer;
