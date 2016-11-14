import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Editor from './Editor';
import { getEditor } from '../../store/selectors/pages';
import { getView } from '../../store/selectors/views';
import { closeEditor } from '../../store/actions/pages';

const mapStateToProps = (state, ownProps) => {
  const editor = getEditor(state, ownProps.focusedPageId);
  const view = getView(state, editor.viewId);
  console.log('view', view);
  return {
    viewId: editor.viewId,
    ...view
  };
};

const mapDispatchToProps = (dispatch, { focusedPageId }) => bindActionCreators({
  closeEditor: () => closeEditor(focusedPageId)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
