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
