// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Fix merge issue after selector moving in reducer modules
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Cleanup React components tree and props
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Cleanup React components tree and props
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Fix page views layout display
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Fix merge issue after selector moving in reducer modules
// VERSION : 1.1.2 : DM : #5828 : 05/04/2017 : minimize and keep old size for editor
// VERSION : 1.1.2 : DM : #5828 : 05/04/2017 : fix editor opening per view and rename longData to convertData
// VERSION : 1.1.2 : DM : #5828 : 03/05/2017 : update MoveViewToPage modal to the generic modal
// END-HISTORY
// ====================================================================

import _each from 'lodash/each';
import _get from 'lodash/get';
import _uniqBy from 'lodash/uniqBy';
import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getPage, getPanels } from 'store/reducers/pages';
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

  const pageDomain = state.pages[pageId].domainName;
  const workspaceDomain = state.hsc.domainName;

  return {
    backgroundColor,
    type,
    title,
    titleStyle,
    isModified,
    domains,
    pageDomain,
    workspaceDomain,
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
