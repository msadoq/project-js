// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 16/02/2017 : fix reselect signature linting errors
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Move getEditor simple selector in reducers/pages
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getView/getViews simple selectors in store/reducers/views
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Draft the resizable panels and cleanup components props (views not functionnal)
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Draft the resizable panels and cleanup components props (views not functionnal)
// VERSION : 1.1.2 : DM : #5828 : 05/04/2017 : fix editor opening per view and rename longData to convertData
// VERSION : 1.1.2 : DM : #5828 : 28/04/2017 : No vertical bar when editor minimized.
// VERSION : 1.1.2 : DM : #6129 : 04/05/2017 : merge dev on mimic branch
// END-HISTORY
// ====================================================================

import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getPanels } from 'store/reducers/pages';
import { getView } from 'store/reducers/views';
import Editor from './Editor';

const mapStateToProps = (state, { pageId }) => {
  const { editorViewId } = getPanels(state, { pageId });
  const view = getView(state, { viewId: editorViewId });
  return {
    pageId,
    viewId: editorViewId,
    type: view ? view.type : null,
  };
};

const EditorContainer = connect(mapStateToProps)(Editor);

EditorContainer.propTypes = {
  pageId: PropTypes.string.isRequired,
};

export default EditorContainer;
