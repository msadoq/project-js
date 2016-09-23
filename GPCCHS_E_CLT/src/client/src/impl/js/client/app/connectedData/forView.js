import _ from 'lodash';
import { getConnectedData } from '../store/mutations/viewReducer';

import decorate from './decorate';

/**
 * Return a de-duplicated list of connectedData with sessionId and domainId for viewId
 *
 * @param state
 * @param timebarId
 * @param viewId
 * @returns []
 */
export default function forView(state, timebarId, viewId) { // TODO
  const connectedData = _.map(getConnectedData(state, viewId), connectedData => {
    return Object.assign({}, connectedData, { timebarId });
  });

  return decorate(state, connectedData);
}

