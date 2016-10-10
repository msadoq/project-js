const _ = require('lodash');
import { createSelector } from 'reselect';

import missingIntervals from '../../common/missingIntervals';
import mergeIntervals from '../../common/mergeIntervals';

// TODO factorize
const operators = {
  '=': 0,
  '!=': 1,
  '<': 2,
  '<=': 3,
  '>': 4,
  '>=': 5,
  contains: 6,
  icontains: 7,
};

/**
 * Return the current missing intervals requests list
 *
 * {
 *   'remoteId': {
 *     dataId: {},
 *     filter: {},
 *     localIds: {
 *       'localId': {
 *          viewType: string,
 *          field: string,
 *          timebarId: string,
 *          offset: number,
 *          expectedInterval: [number, number],
 *        }
 *     }
 *   }
 * }
 *
 * @param state
 * @param dataMap
 * @return object
 */
export default function requestsMap(state, dataMap) {
  const queries = {};
  _.each(dataMap, ({ dataId, filter, localIds }, remoteId) => {
    _.each(localIds, ({ expectedInterval }, localId) => {

      // TODO memoize
      const knownIntervals = _.get(state, [
        'dataRequests', remoteId, 'localIds', localId, 'intervals'
      ], []);

      const needed = missingIntervals(knownIntervals, expectedInterval);
      if (!needed.length) {
        return [];
      }

      if (!queries[remoteId]) {
        const queryFilter = (typeof filter === 'undefined') ? [] : _.map(filter, f => ({
          field: f.field,
          operator: operators[f.operator],
          value: f.operand,
        }));
        queries[remoteId] = {
          dataId,
          filter: queryFilter,
          intervals: [],
        };
      }

      _.each(needed, (m) => {
        queries[remoteId].intervals = mergeIntervals(queries[remoteId].intervals, m);
      });
    });
  });

  return queries;
}
