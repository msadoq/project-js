import { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Editor from './Editor';
import { getEditor } from '../../store/selectors/pages';
import { getView } from '../../store/selectors/views';
import { closeEditor } from '../../store/actions/pages';

const mapStateToProps = (state, { focusedPageId }) => {
  const editor = getEditor(state, focusedPageId);
  const view = getView(state, editor.viewId);

  return {
    viewId: editor.viewId,
    viewType: view.type,
    ...view,
    focusedPageId
  };
};

const mapDispatchToProps = (dispatch, { focusedPageId }) => bindActionCreators({
  closeEditor: () => closeEditor(focusedPageId)
}, dispatch);

const EditorContainer = connect(mapStateToProps, mapDispatchToProps)(Editor);

EditorContainer.propTypes = {
  focusedPageId: PropTypes.string.isRequired
};

export default EditorContainer;
