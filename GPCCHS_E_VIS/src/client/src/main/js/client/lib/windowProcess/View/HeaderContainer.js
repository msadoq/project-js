// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Fix merge issue after selector moving in reducer
//  modules
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Cleanup React components tree and props
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Cleanup React components tree and props
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Fix page views layout display
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Fix merge issue after selector moving in reducer
//  modules
// VERSION : 1.1.2 : DM : #5828 : 05/04/2017 : minimize and keep old size for editor
// VERSION : 1.1.2 : DM : #5828 : 05/04/2017 : fix editor opening per view and rename longData to
//  convertData
// VERSION : 1.1.2 : DM : #5828 : 03/05/2017 : update MoveViewToPage modal to the generic modal
// VERSION : 2.0.0 : FA : #8086 : 26/09/2017 : Saving view by clicking SAVE on a collapse view
//  fixed.
// VERSION : 2.0.0 : DM : #5806 : 10/11/2017 : Add getFullTitle selectors in each view
//  (viewManager)
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : #10835 : 23/02/2018 : head color on views depends on domains
// VERSION : 2.0.0 : FA : #10835 : 01/03/2018 : if EntryPoint's domain is '*', uses the page
//  domain, or workspace domain.
// VERSION : 2.0.0.1 : FA : #11627 : 13/04/2018 : deal with multidomain sat colors
// END-HISTORY
// ====================================================================

import _each from 'lodash/each';
import _get from 'lodash/get';
import _uniqBy from 'lodash/uniqBy';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPage, getPanels } from 'store/reducers/pages';
import { getViewDomainName } from 'store/reducers/views';
import { getDataSelectors, getViewWithConfiguration } from 'viewManager';
import Header from './Header';

const makeMapStateToProps = () => (state, { pageId, viewId }) => {
  const {
    type,
    isModified,
    backgroundColor,
    titleStyle,
    configuration,
  } = getViewWithConfiguration(state, { viewId });

  let domains = [];
  _each(_get(configuration, 'entryPoints', []), (entryPoint) => {
    const domain = _get(entryPoint, 'connectedData.domain', null);
    if (domain !== null) {
      domains.push(domain);
    }
  });

  domains = _uniqBy(domains);

  const { getFullTitle } = getDataSelectors(type);
  const title = getFullTitle(state, { viewId });
  const page = getPage(state, { pageId });
  const { editorIsMinimized, editorViewId } = getPanels(state, { pageId });

  const pageDomain = state.pages[pageId].domainName || '*';
  const workspaceDomain = state.hsc.domainName || '*';
  const viewDomain = getViewDomainName(state, { viewId });
  const isSearhOpenForView = state.pages[pageId].panels.searchViewId === viewId;

  return {
    backgroundColor,
    type,
    title,
    titleStyle,
    isModified,
    domains,
    pageDomain,
    workspaceDomain,
    isSearhOpenForView,
    viewDomain,
    isViewsEditorOpen: !editorIsMinimized && editorViewId === viewId,
    collapsed:
      !!(page.layout.find(e => e.i === viewId && e.collapsed)), // TODO boxmodel factorize
  };
};

Header.propTypes = {
  pageId: PropTypes.string.isRequired,
};

// return function to avoid page grid layout and React DOM re-conciliation issue
export default connect(makeMapStateToProps, null)(Header);
