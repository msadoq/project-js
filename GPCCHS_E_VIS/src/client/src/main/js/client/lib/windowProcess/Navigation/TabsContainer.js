// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 16/02/2017 : fix reselect signature linting errors
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Add WS_PAGE_CLOSE action + remove unmountAndRemove
//  (page)
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Remove add/_add/addAndMount thunks . .
// VERSION : 1.1.2 : DM : #5828 : 15/03/2017 : Remove add page button in page navigation tabs
// VERSION : 1.1.2 : DM : #5828 : 29/03/2017 : Move page items order in navbar
// VERSION : 1.1.2 : DM : #5828 : 19/04/2017 : Page title edition using contextMenu and
//  GenericModal.
// VERSION : 1.1.2 : DM : #5828 : 26/04/2017 : Page title edition is accessible through the upper
//  menu.
// VERSION : 1.1.2 : FA : ISIS-FT-2132 : 15/06/2017 : Ask to save before closing view or page
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Rewrite all saving page code
// VERSION : 2.0.0 : FA : #9380 : 23/11/2017 : Docking d'une page dans une nouvelle fenetre
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : #10670 : 09/02/2018 : Detach a page no dispatch WIP
// VERSION : 2.0.0 : FA : #10670 : 12/02/2018 : Detach a page and attach window with tests
// VERSION : 2.0.0 : FA : #10835 : 23/02/2018 : head color on views depends on domains
// VERSION : 2.0.0.1 : FA : #11627 : 13/04/2018 : deal with multidomain sat colors
// END-HISTORY
// ====================================================================

import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getWindowPagesWithConfiguration } from 'store/selectors/windows';
import { focusPage, moveTabOrder, movePageToWindow, pageDragEvent } from 'store/actions/windows';
import { askClosePage } from 'store/actions/pages';
import { getViewDomainName } from 'store/reducers/views';
import { getViewEntryPointsDomains } from 'viewManager/selectors';
import { close as closeModal } from 'store/actions/modals';
import _ from 'lodash';
import _flatMap from 'lodash/flatMap';
import _uniq from 'lodash/uniq';
import { domainDeterminationForColor } from 'windowProcess/common/domains';
// import _map from 'lodash/map';
import Tabs from './Tabs';
import { get } from '../../common/configurationManager';

const wildcardCharacter = get('WILDCARD_CHARACTER');

const mapStateToProps = () => (state, { windowId }) => {
  const workspaceDomain = state.hsc.domainName || wildcardCharacter;
  const pages = getWindowPagesWithConfiguration(state, { windowId });
  const viewsDomainsByPage = [];
  const epDomainsByPage = [];
  let workspaceViewsDomains = [];
  let workspaceEpDomains = [];
  let pagesDomains = [];
  _.forEach(pages, (page) => {
    // get uniq views domains by page
    const viewsDomains = _uniq(
      _.map(page.views, viewId => getViewDomainName(state, { viewId }))
    );
    // get uniq entry points domains by page
    const epDomains =
      _uniq(
        _flatMap(page.views, viewId => getViewEntryPointsDomains(state, { viewId }))
      );

    // data for page domain color calculation
    viewsDomainsByPage[page.pageId] = viewsDomains;
    epDomainsByPage[page.pageId] = epDomains;

    // data for workspace domain color calculation
    workspaceViewsDomains = workspaceViewsDomains.concat(viewsDomains);
    workspaceEpDomains = workspaceEpDomains.concat(epDomains);

    // calculation of page domain,
    // if page domain is wildcard, value depends on views and entry points domains
    if (page.domainName && page.domainName !== wildcardCharacter) {
      pagesDomains.push(page.domainName);
    } else {
      pagesDomains.push(domainDeterminationForColor(
        workspaceDomain,
        [wildcardCharacter],
        viewsDomains,
        epDomains,
        'page')
      );
    }
  });
  pagesDomains = _uniq(pagesDomains);

  return {
    pages,
    windowId,
    detachWindow: state.hsc.detachWindow,
    attachWindow: state.hsc.attachWindow,
    workspaceDomain,
    pagesDomains,
    viewsDomainsByPage,
    workspaceViewsDomains,
    epDomainsByPage,
    workspaceEpDomains,
  };
};

function mapDispatchToProps(dispatch, { windowId }) {
  return bindActionCreators({
    askClosePage,
    movePageToWindow: (pageId, toWindow) => movePageToWindow(pageId, windowId, toWindow),
    focusPage: pageId => focusPage(windowId, pageId),
    moveTabOrder: (keyFrom, keyTarget) => moveTabOrder(windowId, keyFrom, keyTarget),
    closeModal: () => closeModal(windowId),
    pageDragEvent: detachWindow => pageDragEvent(detachWindow, windowId),
  }, dispatch);
}

const TabsContainer = connect(mapStateToProps, mapDispatchToProps)(Tabs);
const { string } = PropTypes;

TabsContainer.propTypes = {
  windowId: string.isRequired,
};

export default TabsContainer;
