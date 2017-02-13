import { connect } from 'react-redux';
import TextTab from './TextTab';
import { openHtmlEditor, closeHtmlEditor } from '../../../../store/actions/editor';
import { getViewId } from '../../../../store/selectors/editor';


const mapStateToProps = (state) => {
  const viewId = getViewId(state);
  return {
    htmlEditorViewId: viewId,
  };
};

const TextTabContainer = connect(mapStateToProps, { openHtmlEditor, closeHtmlEditor })(TextTab);

export default TextTabContainer;
