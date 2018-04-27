import _ from 'lodash/fp';
import _get from 'lodash/get';
import { createSelector } from 'reselect';
import { getViewEntryPoints } from 'store/selectors/views';
import sortDataBy from 'viewManager/commonData/sortDataBy';
import { getPageSessionName, getPageTimebarId } from 'store/reducers/pages';
import { getPageTimelines } from 'store/selectors/timelines';
import { getSessionName } from 'store/reducers/hsc';
import { get } from 'common/configurationManager';
import { getViewSessionName } from 'store/reducers/views';
import { getData } from './dataReducer';
import { getSearch, getEnableSearch } from './configurationReducer';
import { getSortMode, getSortColumn, getExpandedAlarms } from './uiReducer';
import { getMasterTimelines } from '../../../store/reducers/timebars';

export const getInspectorOptions = createSelector(
  getViewEntryPoints,
  (entryPoints) => {
    const epName = Object.keys(entryPoints)[0];
    const ep = Object.values(entryPoints)[0];
    return {
      epName,
      epId: _.get('id', ep),
      dataId: _.get('dataId', ep),
      field: _.get('field', ep),
    };
  }
);

const isFiltered = (alarm, search) => _.pipe(
  _.entries,
  _.reduce(
    (acc, [k, v]) => acc && alarm[k] && `${alarm[k]}`.indexOf(v) !== -1
  )(true)
)(search);

export const getFilteredIndexes = createSelector(
  getData,
  getSearch,
  getEnableSearch,
  ({ lines, indexes }, search, enableSearch) => {
    if (enableSearch) {
      return _.filter((oid => (
        isFiltered(lines[oid], search)
      )), indexes);
    }
    return indexes;
  }
);

export const getFilteredSortedIndexes = createSelector(
  getData,
  getFilteredIndexes,
  getSortMode,
  getSortColumn,
  ({ lines }, indexes, sortMode, column) => (
    sortDataBy(
      oid => _.getOr({}, [oid, 'rawAlarm', column], lines),
      sortMode,
      indexes
    )
  )
);

// FIXME: remove duplication with perViewData
const WILDCARD = get('WILDCARD_CHARACTER');

function matchesSession(masterSession, element) {
  return !element // considered as wildcard
    || element === WILDCARD
    || element === masterSession;
}


const areSessionsMatching = createSelector(
  getPageTimebarId,
  getMasterTimelines,
  getPageTimelines,
  getSessionName,
  getPageSessionName,
  getViewSessionName,
  (
    pageTimebarID,
    masterTimelines,
    pageTimelines,
    workspaceSessionName,
    pageSessionName,
    viewSessionName
  ) => {
    const masterId = masterTimelines[pageTimebarID];
    const masterTimeBarSession = _get(pageTimelines.find(s => s.id === masterId), 'sessionName');
    return matchesSession(masterTimeBarSession, workspaceSessionName)
      && matchesSession(masterTimeBarSession, pageSessionName)
      && matchesSession(masterTimeBarSession, viewSessionName);
  }
);

export const getDataRows = createSelector(
  getData,
  getFilteredSortedIndexes,
  getExpandedAlarms,
  areSessionsMatching,
  (data, sortedIndexes, expandedAlarms, _areSessionsMatching) => {
    if (!_areSessionsMatching) {
      return [];
    }
    return _.flatMap((lineId) => {
      const alarm = data.lines[lineId];
      const mainRow = {
        type: 'row',
        data: alarm,
      };
      const transitions = _.isEmpty(alarm.transitions) || !expandedAlarms[alarm.oid] ? [] : [
        {
          type: 'subrow_header_title',
          data: 'TRANSITIONS',
          mainRow,
        },
        {
          type: 'subrow_header',
          mainRow,
        },
        ...alarm.transitions.map(transition => ({
          type: 'subrow',
          data: transition,
          mainRow,
        })),
      ];
      const result = [
        {
          ...mainRow,
          mainRow,
        },
        ...transitions,
      ];
      return result;
    }, sortedIndexes);
  }
);
