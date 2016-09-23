import _ from 'lodash';
import { getPages } from '../store/mutations/windowReducer';
import { getViews } from '../store/mutations/pageReducer';
import { getConnectedData } from '../store/mutations/viewReducer';

import decorate from './decorate';

export function extractFromWindow(state, windowId) { // TODO : in connectedData reducer?
  const cds = [];
  _.each(getPages(state, windowId), ({ pageId, timebarId }) => {
    if (pageId) {
      _.each(getViews(state, pageId), ({ viewId }) => {
        if (viewId) {
          _.each(getConnectedData(state, viewId), connectedData => {
            cds.push(Object.assign({}, connectedData, { timebarId }));
          });
        }
      });
    }
  });
  return cds;
}

/**
 * Return a de-duplicated list of connectedData with sessionId and domainId for windowId
 *
 * @param state
 * @param windowId
 * @returns []
 */
export default function forWindow(state, windowId) {
  const connectedData = extractFromWindow(state, windowId);
  return decorate(state, connectedData);
}
