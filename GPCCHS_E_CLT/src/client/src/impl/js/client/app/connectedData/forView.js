import _ from 'lodash';
import { getConnectedData } from '../store/mutations/viewReducer';
import decorate from './decorateView';

/**
 * Returns a connectedData list with sessionId, domainId, lower and upper sets:
 *
 * [
 * remoteId:
 *   {
 *     localId:
 *     {
          viewType,
          field,
          offset,
          timebarId,
          dataId: {
    *       catalog,
    *       parameterName,
    *       comObject,
    *       domainId,
    *       sessionId,
    *     }
 *   }
 * ]
 *
 * @param state
 * @param timebarId
 * @param viewId
 * @returns []
 */
export default function forView(state, timebarId, viewId) {
  // connectedData = { formula, domain, timeline, filter }
  let connectedData = getConnectedData(state, viewId);
  // Add timebarId in connected Data
  connectedData = _.map(connectedData, cData => Object.assign({}, cData, { timebarId },
    { viewType: state.views[viewId].type }));
  const decoratedData = decorate(state, connectedData);
  return _.reduce(decoratedData, (result, cData, key) => {
    if (!result) {
      result = {};  // eslint-disable-line no-param-reassign
    }
    result[key] = Object.assign({}, cData, { timebarId }); // eslint-disable-line no-param-reassign
    return result
  }, {});
}
