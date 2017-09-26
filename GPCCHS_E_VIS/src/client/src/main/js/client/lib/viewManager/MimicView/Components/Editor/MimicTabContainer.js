// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6785 : 31/05/2017 : Add Misc/links in view editor
// VERSION : 1.1.2 : DM : #6129 : 19/06/2017 : moved components/animations in separate files. Possibility to add it in editor using context menu
// END-HISTORY
// ====================================================================

import { connect } from 'react-redux';
import MimicTab from './MimicTab';
import { openCodeEditor, closeCodeEditor } from '../../../../store/actions/editor';
import { getViewId as getCodeEditorViewId } from '../../../../store/reducers/codeEditor';


const mapStateToProps = (state) => {
  const viewId = getCodeEditorViewId(state);
  return {
    codeEditorViewId: viewId,
  };
};

const MimicTabContainer = connect(mapStateToProps, { openCodeEditor, closeCodeEditor })(MimicTab);

export default MimicTabContainer;
