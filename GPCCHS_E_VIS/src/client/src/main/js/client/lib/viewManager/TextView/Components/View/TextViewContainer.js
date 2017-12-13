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
