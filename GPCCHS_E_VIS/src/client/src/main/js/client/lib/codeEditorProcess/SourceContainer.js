// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 21/02/2017 : Improve and debug code editor
// VERSION : 1.1.2 : DM : #3622 : 23/02/2017 : Add getentrypointsname in view selector
// VERSION : 1.1.2 : DM : #3622 : 24/02/2017 : debug change TextView in code editor
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move simple selectors from selectors/views to reducers/views
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : Remove old configuration reducer .
// VERSION : 1.1.2 : DM : #6129 : 03/05/2017 : first functionnal mimic with animations
// VERSION : 1.1.2 : DM : #6129 : 04/05/2017 : merge dev on mimic branch
// VERSION : 1.1.2 : FA : #7753 : 18/09/2017 : Fixed Save & close issue with svg and html code editor.
// END-HISTORY
// ====================================================================

import { connect } from 'react-redux';
import { getViewType } from '../store/reducers/views';
import { getConfigurationByViewId } from '../viewManager';
import { getViewEntryPointsName } from '../store/selectors/views';
import { updateContent } from '../store/actions/views';
import { closeCodeEditor } from '../store/actions/editor';
import Source from './Source';

const mapStateToProps = (state, { viewId }) => {
  const type = getViewType(state, { viewId });
  const configuration = getConfigurationByViewId(state, { viewId });
  const entryPointsName = getViewEntryPointsName(state, { viewId });
  return {
    content: configuration.content,
    entryPointsName,
    type,
  };
};

const mapDispatchToProps = dispatch => ({
  updateContent: (viewId, value) => {
    dispatch(updateContent(viewId, value.html));
  },
  closeCodeEditor: () => {
    dispatch(closeCodeEditor());
  },
});

export const SourceContainer = connect(mapStateToProps, mapDispatchToProps)(Source);

export default SourceContainer;
