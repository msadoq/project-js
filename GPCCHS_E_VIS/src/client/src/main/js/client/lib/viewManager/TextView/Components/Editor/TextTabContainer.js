import { connect } from 'react-redux';
import TextTab from './TextTab';
import { openHtmlEditor, closeHtmlEditor } from '../../../../store/actions/editor';
import { getEditorTextViewId } from '../../../../store/reducers/editor';


const mapStateToProps = (state) => {
  const viewId = getEditorTextViewId(state);
  return {
    htmlEditorViewId: viewId,
  };
};

const TextTabContainer = connect(mapStateToProps, { openHtmlEditor, closeHtmlEditor })(TextTab);

export default TextTabContainer;
