// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 16/02/2017 : fix reselect signature linting errors
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Add WS_PAGE_CLOSE action + remove unmountAndRemove (page)
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Remove add/_add/addAndMount thunks . .
// VERSION : 1.1.2 : DM : #5828 : 15/03/2017 : Remove add page button in page navigation tabs
// VERSION : 1.1.2 : DM : #5828 : 29/03/2017 : Move page items order in navbar
// VERSION : 1.1.2 : DM : #5828 : 19/04/2017 : Page title edition using contextMenu and GenericModal.
// VERSION : 1.1.2 : DM : #5828 : 26/04/2017 : Page title edition is accessible through the upper menu.
// VERSION : 1.1.2 : FA : ISIS-FT-2132 : 15/06/2017 : Ask to save before closing view or page
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Rewrite all saving page code
// END-HISTORY
// ====================================================================

import { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getWindowPages } from 'store/selectors/windows';
import { focusPage, moveTabOrder, movePageToWindow } from 'store/actions/windows';
import { askClosePage } from 'store/actions/pages';
import { close as closeModal } from 'store/actions/modals';
import Tabs from './Tabs';

const mapStateToProps = (state, { windowId }) => ({
  pages: getWindowPages(state, { windowId }),
});

function mapDispatchToProps(dispatch, { windowId }) {
  return bindActionCreators({
    askClosePage,
    movePageToWindow: pageId => movePageToWindow(pageId, windowId),
    focusPage: pageId => focusPage(windowId, pageId),
    moveTabOrder: (keyFrom, keyTarget) => moveTabOrder(windowId, keyFrom, keyTarget),
    closeModal: () => closeModal(windowId),
  }, dispatch);
}

const TabsContainer = connect(mapStateToProps, mapDispatchToProps)(Tabs);
const { string } = PropTypes;

TabsContainer.propTypes = {
  windowId: string.isRequired,
};

export default TabsContainer;
