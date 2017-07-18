import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getConfigurationByViewId } from '../../../../viewManager';
import { getViewContent } from '../../store/configurationSelectors';
import MimicView from './MimicView';
import { getViewEntryPoints } from '../../../../store/selectors/views';
import { isAnyInspectorOpened } from '../../../../store/selectors/pages';
import { getInspectorEpId } from '../../../../store/reducers/inspector';
import { getData } from '../../store/dataReducer';
import { getLinks, areLinksShown } from '../../../../store/reducers/views';
import { removeLink, updateShowLinks } from '../../../../store/actions/views';
import { getPageIdByViewId, getPage } from '../../../../store/reducers/pages';
import { isMaxVisuDurationExceeded } from '../../../../store/reducers/timebars';


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

const mapDispatchToProps = dispatch => bindActionCreators({
  removeLink,
  updateShowLinks,
}, dispatch);

const MimicViewContainer = connect(mapStateToProps, mapDispatchToProps)(MimicView);

MimicViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default MimicViewContainer;
