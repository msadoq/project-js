import { reduce } from 'lodash';
import getEntryPointsFromState from './getEntryPointsFromState';

// TODO: memoize
export default function getConnectedDataFromState(configuration) {
  return reduce(getEntryPointsFromState(configuration), (list, ep) => {
    if (!ep) {
      return list;
    }
    if (ep.connectedDataX) {
      // Check uuid
      list = list.concat(ep.connectedDataX);  // eslint-disable-line no-param-reassign
      // TODO : only if not the same params as Y
    }
    if (ep.connectedDataY) {
      // Check uuid
      list = list.concat(ep.connectedDataY); // eslint-disable-line no-param-reassign
    }

    return list;
  }, []);
}
