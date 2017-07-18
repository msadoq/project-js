import { connect } from 'react-redux';
import TextTab from './TextTab';
import { openCodeEditor, closeCodeEditor } from '../../../../store/actions/editor';
import { getViewId as getCodeEditorViewId } from '../../../../store/reducers/codeEditor';


const mapStateToProps = (state) => {
  const viewId = getCodeEditorViewId(state);
  return {
    codeEditorViewId: viewId,
  };
};

const TextTabContainer = connect(mapStateToProps, { openCodeEditor, closeCodeEditor })(TextTab);

export default TextTabContainer;
