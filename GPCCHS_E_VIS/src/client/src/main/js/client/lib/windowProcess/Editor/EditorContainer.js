import { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Editor from './Editor';
import { getPanels } from '../../store/reducers/pages';
import { getView } from '../../store/reducers/views';
import { minimizeEditor } from '../../store/actions/pages';

const mapStateToProps = (state, { pageId }) => {
  const { editorViewId } = getPanels(state, { pageId });
  const view = getView(state, { viewId: editorViewId });

  return {
    pageId,
    viewId: editorViewId,
    type: view ? view.type : null,
  };
};

const mapDispatchToProps = (dispatch, { pageId }) => bindActionCreators({
  closeEditor: () => minimizeEditor(pageId, true),
}, dispatch);

const EditorContainer = connect(mapStateToProps, mapDispatchToProps)(Editor);

EditorContainer.propTypes = {
  pageId: PropTypes.string.isRequired,
};

export default EditorContainer;
