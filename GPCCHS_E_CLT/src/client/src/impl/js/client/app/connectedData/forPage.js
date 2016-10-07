import _ from 'lodash';
import { getPage, getViews } from '../store/selectors/pages';

import decorate from './decoratePage';

export function extractFromPage(state, pageId) {
  const cds = [];
  if (!pageId) {
    return cds;
  }

  const page = getPage(state, pageId);
  if (!page || !page.timebarId) {
    return [];
  }

  _.each(getViews(state, pageId), ({ viewId, type }) => {
    if (viewId) {
      _.each(getConnectedData(state, viewId), connectedData => {
        cds.push(Object.assign({}, connectedData, { viewType: type, timebarId: page.timebarId }));
      });
    }
  });

  return cds;
}

/**
 * For a given pageId, compute a de-duplicated list of connectedData:
 *
 * [
 *   {
 *     remoteId,
 *     localId,
 *     offset,
 *     dataId: {
 *       catalog,
 *       parameterName,
 *       comObject,
 *       domainId,
 *       sessionId,
 *   }
 * ]
 *
 * @param state
 * @param pageId
 * @returns []
 */
export default function forPage(state, pageId) {
  const connectedData = extractFromPage(state, pageId);
  return decorate(state, connectedData);
}
