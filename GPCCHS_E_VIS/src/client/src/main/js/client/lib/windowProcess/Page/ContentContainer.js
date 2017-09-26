// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 16/02/2017 : fix reselect signature linting errors
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Remove add/_add/addAndMount thunks . .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Add WS_VIEW_CLOSE action + remove unmountAndRemove (view)
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Add readView + loadDocumentsInStore in documentManager
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Cleanup actions . . .
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Refacto collapsed maximized using selectors
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : maximized view recovered in ContentContainer .
// VERSION : 1.1.2 : DM : #5828 : 17/03/2017 : Write first example with local selectors
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : Replace selectors/pages/makeGetLayout by getPageLayoutWithCollapsed .
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Draft the resizable panels and cleanup components props (views not functionnal)
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Rename Page/ContentSelector in Page/ContentSelectors .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Replace ipc openPage by askOpenPage redux action
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : On open view middleware .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Add onSaveView documents middleware .
// VERSION : 1.1.2 : FA : ISIS-FT-2138 : 01/09/2017 : Added error message when dropped item's mime type is not supported.
// END-HISTORY
// ====================================================================

import { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { updateLayout, askOpenPage } from '../../store/actions/pages';
import { askOpenView } from '../../store/actions/views';
import { add } from '../../store/actions/messages';
import { getPageViews } from '../../store/selectors/pages';
import {
  getPageLayoutWithCollapsed,
  getTimebarUuid,
  getMaximizedViewdUuid,
} from './ContentSelectors';

import Content from './Content';

const mapStateToProps = createStructuredSelector({
  layouts: getPageLayoutWithCollapsed,
  views: getPageViews,
  timebarUuid: getTimebarUuid,
  maximizedViewUuid: getMaximizedViewdUuid,
});

const mapDispatchToProps = (dispatch, { windowId, pageId }) => (
  bindActionCreators({
    updateLayout: layout => updateLayout(pageId, layout),
    askOpenPage: filePath => askOpenPage(windowId, filePath),
    askOpenView: filePath => askOpenView(filePath),
    addMessage: add,
  }, dispatch)
);

const ContentContainer = connect(mapStateToProps, mapDispatchToProps)(Content);

ContentContainer.propTypes = {
  windowId: PropTypes.string.isRequired,
  pageId: PropTypes.string,
};

export default ContentContainer;
