// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : prepare packet and history files
// VERSION : 1.1.2 : DM : #5828 : 11/04/2017 : Add getViewComponent function in viewManager
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView . .
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : HistoryView work with real data .
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : Remove labels from props.data in HistoryView
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : Create first basic table for HistoryView
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : Add selected current to HistoryView
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : Add rowHeight prop to HistoryView component
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  addEntryPoint,
  updateShowLinks,
  removeLink,
} from 'store/actions/views';

import HistoryView from './HistoryView';
import { getData } from '../../store/dataReducer';
import { getCountBySearching } from '../../store/dataSelectors';
import { getConfigurationByViewId } from '../../../selectors';
import {
  getCatalogItemByName,
  getTupleId,
} from '../../../../store/reducers/catalogs';
import { getDomainId } from '../../../../store/reducers/domains';
import { getSessionByTimelineId, getSessions } from '../../../../store/reducers/sessions';
import {
  getPage,
  getSearchCount,
  getSearchingByPage,
  getSearchViewsIds,
} from '../../../../store/reducers/pages';
import { updateSearchCount } from '../../../../store/actions/pages';
import { areLinksShown, getLinks } from '../../../../store/reducers/views';
import { getIsTimelineSelected } from '../../store/configurationSelectors';
import { getViewEntryPoints } from '../../../../store/selectors/views';
import { getTimeline, getTimelines } from '../../../../store/reducers/timelines';
import { add } from '../../../../store/actions/messages';
import { getTimebarTimelines } from '../../../../store/reducers/timebarTimelines';

const mapStateToProps = (state, { viewId, pageId }) => {
  const data = getData(state, { viewId });
  const entryPoints = getViewEntryPoints(state, { viewId });
  const config = getConfigurationByViewId(state, { viewId });
  const sortState = _.get(['tables', 'history', 'sorting'], config);
  const last = _.getOr({}, 'last', data);
  const page = getPage(state, { pageId });
  const defaultTimelineUuid = getTimebarTimelines(state, { timebarUuid: page.timebarUuid })[0];
  const defaultTimeline = getTimeline(state, { timelineUuid: defaultTimelineUuid });
  const searching = getSearchingByPage(state, { pageId });
  const searchViewsIds = getSearchViewsIds(state, { pageId });
  const searchCount = getSearchCount(state, { pageId });
  const countBySearching = getCountBySearching(state, { viewId, searching });
  const isTimelineSelected = getIsTimelineSelected(state, { viewId });

  const entryPointsWithMetadata = config.entryPoints.map((ep) => {
    const { connectedData } = ep;

    if (connectedData) {
      const { domain, timeline, catalog, catalogItem } = connectedData;

      if (domain && timeline && catalog && catalogItem) {
        const domainId = getDomainId(state, { domainName: domain });
        const session = getSessionByTimelineId(state, { timelineId: timeline });
        const sessionId = _.get('id', session);

        const tupleId = getTupleId(domainId, sessionId);

        const selectedCatalogItem = getCatalogItemByName(
          state.catalogs,
          {
            tupleId,
            name: catalog,
            itemName: catalogItem,
          }
        );

        if (selectedCatalogItem) {
          const metadata = _.getOr({}, 'metadata', selectedCatalogItem);
          return { ...ep, metadata };
        }
      }
    }

    return ep;
  });

  return {
    configuration: config,
    entryPoints,
    entryPointsWithMetadata,
    last,
    isTimelineSelected,
    defaultTimelineId: defaultTimeline ? defaultTimeline.id : null,
    searching,
    searchCount,
    countBySearching,
    searchForThisView: searchViewsIds.indexOf(viewId) !== -1,
    links: getLinks(state, { viewId }),
    showLinks: areLinksShown(state, { viewId }),
    sessions: getSessions(state),
    timelines: getTimelines(state),
    sortState,
  };
};

const mapDispatchToProps = (dispatch, { viewId, pageId }) => ({
  addEntryPoint: (entryPoint) => {
    dispatch(addEntryPoint(viewId, entryPoint));
  },
  updateSearchCount: (count) => {
    dispatch(updateSearchCount(pageId, viewId, count));
  },
  ...bindActionCreators({ updateShowLinks, removeLink }, dispatch),
  addMessage: (status, content) => dispatch(add(viewId, status, content)),
});

const HistoryViewContainer = connect(mapStateToProps, mapDispatchToProps)(HistoryView);

HistoryViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default HistoryViewContainer;
