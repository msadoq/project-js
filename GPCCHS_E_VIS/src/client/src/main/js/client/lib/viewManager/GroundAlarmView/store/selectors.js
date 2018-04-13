import _ from 'lodash/fp';
import { createSelector } from 'reselect';
import { getViewEntryPoints } from 'store/selectors/views';
import sortDataBy from 'viewManager/commonData/sortDataBy';
import { getData } from './dataReducer';
import { getSearch, getEnableSearch } from './configurationReducer';
import { getSortMode, getSortColumn, getExpandedAlarms } from './uiReducer';

export const getInspectorOptions = createSelector(
  getViewEntryPoints,
  (entryPoints) => {
    const epName = Object.keys(entryPoints)[0];
    const ep = Object.values(entryPoints)[0];
    return {
      epName,
      epId: ep.id,
      dataId: ep.dataId,
      field: ep.field,
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

export const getDataRows = createSelector(
  getData,
  getFilteredSortedIndexes,
  getExpandedAlarms,
  (data, sortedIndexes, expandedAlarms) => _.flatMap((lineId) => {
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
    return [
      {
        ...mainRow,
        mainRow,
      },
      ...transitions,
    ];
  }, sortedIndexes)
);
