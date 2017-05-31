import { connect } from 'react-redux';
import MimicTab from './MimicTab';
import { openHtmlEditor, closeHtmlEditor } from '../../../../store/actions/editor';
import { getEditorTextViewId } from '../../../../store/reducers/editor';


const mapStateToProps = (state) => {
  const viewId = getEditorTextViewId(state);
  return {
    htmlEditorViewId: viewId,
  };
};

const MimicTabContainer = connect(mapStateToProps, { openHtmlEditor, closeHtmlEditor })(MimicTab);

export default MimicTabContainer;
