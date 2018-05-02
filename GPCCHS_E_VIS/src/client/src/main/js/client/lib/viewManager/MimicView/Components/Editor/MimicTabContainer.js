// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6785 : 31/05/2017 : Add Misc/links in view editor
// VERSION : 1.1.2 : DM : #6129 : 19/06/2017 : moved components/animations in separate files.
//  Possibility to add it in editor using context menu
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import { connect } from 'react-redux';
import { openCodeEditor, closeCodeEditor } from 'store/actions/editor';
import { getViewId as getCodeEditorViewId } from 'store/reducers/codeEditor';
import MimicTab from './MimicTab';


const mapStateToProps = (state) => {
  const viewId = getCodeEditorViewId(state);
  return {
    codeEditorViewId: viewId,
  };
};

const MimicTabContainer = connect(mapStateToProps, { openCodeEditor, closeCodeEditor })(MimicTab);

export default MimicTabContainer;
