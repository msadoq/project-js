// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving DynamicView PlotView and TextView in dataManager.
// VERSION : 1.1.2 : DM : #3622 : 14/03/2017 : Move general variables at top level of a view
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Creation of data store for plotView
// VERSION : 1.1.2 : DM : #5822 : 20/03/2017 : merge dev in working branch
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getViewData and getData simple selectors in store/reducers/viewData
// VERSION : 1.1.2 : DM : #5822 : 21/03/2017 : merge dev in working branch
// VERSION : 1.1.2 : DM : #5822 : 22/03/2017 : merge dev in working branch
// VERSION : 1.1.2 : DM : #5822 : 22/03/2017 : add context menu on text view
// VERSION : 1.1.2 : DM : #3622 : 22/03/2017 : Update viewData organization for last structure + cleaning
// VERSION : 1.1.2 : DM : #5828 : 31/03/2017 : move selector from containers to reducers / spectify selectors in ViewManager
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Export const selector in DynamicViewContainer
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Rewrite mapStateToProps in DynamicViewContainer .
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : Remove old configuration reducer .
// VERSION : 1.1.2 : DM : #5828 : 11/04/2017 : Add getViewComponent function in viewManager
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : mark parameter as checked in context menu when opened in inspector
// VERSION : 1.1.2 : DM : #5822 : 03/05/2017 : Inspector : display dynamic data
// VERSION : 1.1.2 : DM : #6785 : 31/05/2017 : Add possibility to show links in views
// VERSION : 1.1.2 : DM : #6785 : 12/06/2017 : activate links in views .
// VERSION : 1.1.2 : DM : #7111 : 03/07/2017 : Add config parameter VISU_WINDOW_MAX_DURATION to limit visuWindow per view
// END-HISTORY
// ====================================================================

import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DynamicView from './DynamicView';
import { getConfigurationByViewId } from '../../../../viewManager';
import { getViewEntryPoints } from '../../../../store/selectors/views';
import { isAnyInspectorOpened } from '../../../../store/selectors/pages';
import { getInspectorEpId } from '../../../../store/reducers/inspector';
import { getFormula } from './selectors';
import { getData } from '../../store/dataReducer';
import { getLinks, areLinksShown } from '../../../../store/reducers/views';
import { removeLink, updateShowLinks } from '../../../../store/actions/views';
import { getPageIdByViewId, getPage } from '../../../../store/reducers/pages';
import { isMaxVisuDurationExceeded } from '../../../../store/reducers/timebars';


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
