// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving DynamicView PlotView and TextView in dataManager.
// VERSION : 1.1.2 : DM : #3622 : 14/03/2017 : Move general variables at top level of a view
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Creation of data store for plotView
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move simple selectors from selectors/views to reducers/views
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getViewData and getData simple selectors in store/reducers/viewData
// VERSION : 1.1.2 : DM : #3622 : 22/03/2017 : Update viewData organization for last structure + cleaning
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Cleanup React components tree and props
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Cleanup React components tree and props
// VERSION : 1.1.2 : DM : #5828 : 30/03/2017 : Fix open editor when entrypoint is dropped
// VERSION : 1.1.2 : DM : #5828 : 31/03/2017 : move selector from containers to reducers / spectify selectors in ViewManager
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Replace mapStateToProps by a createStructuredSelector in TextViewContainer
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : Remove old configuration reducer .
// VERSION : 1.1.2 : DM : #5828 : 11/04/2017 : Add getViewComponent function in viewManager
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : mark parameter as checked in context menu when opened in inspector
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : open parameter in editor via context menu
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : add context menu on views
// VERSION : 1.1.2 : DM : #5828 : 03/05/2017 : Fix editor search on open
// VERSION : 1.1.2 : DM : #5822 : 03/05/2017 : Inspector : display dynamic data
// VERSION : 1.1.2 : DM : #6785 : 31/05/2017 : Add possibility to show links in views
// VERSION : 1.1.2 : DM : #6785 : 12/06/2017 : activate links in views .
// VERSION : 1.1.2 : DM : #7111 : 03/07/2017 : Add config parameter VISU_WINDOW_MAX_DURATION to limit visuWindow per view
// VERSION : 1.1.2 : DM : #7281 : 19/07/2017 : First benchmark draft for the TextView, split between TextView - TextViewWrapper .
// VERSION : 1.1.2 : DM : #6785 : 21/07/2017 : add links on textview if specify in html editor
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

import { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
import _ from 'lodash/fp';
import { getPageIdByViewId, getPage } from 'store/reducers/pages';
import {
  addEntryPoint,
  updateContent,
  removeLink,
  updateShowLinks,
} from 'store/actions/views';
import { askOpenLink } from 'store/actions/links';
import { getViewEntryPoints } from 'store/selectors/views';
import { isMaxVisuDurationExceeded } from 'store/reducers/timebars';
import { isAnyInspectorOpened } from 'store/selectors/pages';
import { getInspectorEpId } from 'store/reducers/inspector';
import { getData } from 'viewManager/TextView/store/dataReducer';
import { getViewContent } from 'viewManager/TextView/store/configurationSelectors';
import { getLinks, areLinksShown } from 'store/reducers/views';
import { getConfigurationByViewId } from 'viewManager';
import TextViewWrapper from './TextViewWrapper';


const mapStateToProps = (state, { viewId }) => {
  const pageId = getPageIdByViewId(state, { viewId });
  const page = getPage(state, { pageId });
  return {
    content: getViewContent(state, { viewId }),
    configuration: getConfigurationByViewId(state, { viewId }),
    entryPoints: getViewEntryPoints(state, { viewId }),
    data: getData(state, { viewId }),
    isInspectorOpened: isAnyInspectorOpened(state),
    inspectorEpId: getInspectorEpId(state),
    links: getLinks(state, { viewId }),
    pageId,
    showLinks: areLinksShown(state, { viewId }),
    isMaxVisuDurationExceeded: isMaxVisuDurationExceeded(state,
      { timebarUuid: page.timebarUuid, viewType: 'PlotView' }),
  };
};
const mapDispatchToProps = (dispatch, { viewId }) => bindActionCreators({
  updateContent: html => updateContent(viewId, html),
  addEntryPoint: data => addEntryPoint(viewId, data),
  removeLink: key => removeLink(viewId, key),
  updateShowLinks: flag => updateShowLinks(viewId, flag),
  openLink: linkId => askOpenLink(viewId, linkId),
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  openLink: linkName => dispatchProps.openLink(_.findIndex({ name: linkName }, stateProps.links)),
});

const TextViewContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(TextViewWrapper);

TextViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default TextViewContainer;
