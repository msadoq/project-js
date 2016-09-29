// import _ from 'lodash';
// import { getConnectedData } from '../store/mutations/viewReducer';
// import { getTimebar, getTimelines, getMasterTimeline } from '../store/mutations/timebarReducer';
//
// import decorate from './decorateWindow';
//
// /**
//  * Returns a connectedData list with sessionId, domainId, lower and upper sets:
//  *
//  * [
//  *   {
//  *     localId,
//  *     offset,
//  *     dataId: {
//  *       catalog,
//  *       parameterName,
//  *       comObject,
//  *       domainId,
//  *       sessionId,
//  *   }
//  * ]
//  *
//  * @param state
//  * @param timebarId
//  * @param viewId
//  * @returns []
//  */
// export default function forView(state, timebarId, viewId) {
//   const connectedData = _.map(getConnectedData(state, viewId), connectedData => {
//     return Object.assign({}, connectedData, { timebarId });
//   });
//
//   return decorate(state, connectedData);
// }
//
