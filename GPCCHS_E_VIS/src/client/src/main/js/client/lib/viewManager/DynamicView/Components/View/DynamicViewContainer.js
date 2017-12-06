import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getPageIdByViewId, getPage } from 'store/reducers/pages';
import { getConfigurationByViewId } from 'viewManager';
import { getViewEntryPoints } from 'store/selectors/views';
import { isAnyInspectorOpened } from 'store/selectors/pages';
import { isMaxVisuDurationExceeded } from 'store/reducers/timebars';
import { removeLink, updateShowLinks } from 'store/actions/views';
import { getData } from 'viewManager/DynamicView/store/dataReducer';
import { getLinks, areLinksShown } from 'store/reducers/views';
import { getInspectorEpId } from 'store/reducers/inspector';
import { getFormula } from './selectors';
import DynamicView from './DynamicView';


const mapStateToProps = (state, { viewId }) => {
  const pageId = getPageIdByViewId(state, { viewId });
  const page = getPage(state, { pageId });
  return {
    formula: getFormula(state, { viewId }),
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

const DynamicViewContainer = connect(mapStateToProps, mapDispatchToProps)(DynamicView);

DynamicViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};
export default DynamicViewContainer;
