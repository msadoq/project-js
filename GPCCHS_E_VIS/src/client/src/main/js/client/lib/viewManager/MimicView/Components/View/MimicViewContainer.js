import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash/fp';

import { askOpenLink } from 'store/actions/links';
import { getConfigurationByViewId } from 'viewManager';
import { getViewContent, getViewDimensions } from 'viewManager/MimicView/store/configurationSelectors';
import { getPageIdByViewId, getPage } from 'store/reducers/pages';
import { isMaxVisuDurationExceeded } from 'store/reducers/timebars';
import { isAnyInspectorOpened } from 'store/selectors/pages';
import { getInspectorEpId } from 'store/reducers/inspector';
import { getData } from 'viewManager/MimicView/store/dataReducer';
import { getLinks, areLinksShown } from 'store/reducers/views';
import { removeLink, updateShowLinks } from 'store/actions/views';
import { getViewEntryPoints } from 'store/selectors/views';
import MimicViewWrapper from './MimicViewWrapper';

const mapStateToProps = (state, { viewId }) => {
  const pageId = getPageIdByViewId(state, { viewId });
  const page = getPage(state, { pageId });
  const dimensions = getViewDimensions(state, { viewId });
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
    openLink: linkId => askOpenLink(viewId, linkId),
    width: dimensions.width,
    height: dimensions.height,
  };
};

const mapDispatchToProps = (dispatch, { viewId }) => bindActionCreators({
  removeLink,
  updateShowLinks,
  openLink: linkId => askOpenLink(viewId, linkId),
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  openLink: linkName => dispatchProps.openLink(_.findIndex({ name: linkName }, stateProps.links)),
});

const MimicViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(MimicViewWrapper);

MimicViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default MimicViewContainer;
