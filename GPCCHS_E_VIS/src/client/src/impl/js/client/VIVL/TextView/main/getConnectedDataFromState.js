import { reduce } from 'lodash';
import getEntryPointsFromState from './getEntryPointsFromState';

// TODO: memoize
export default function getConnectedDataFromState(configuration) {
  return reduce(getEntryPointsFromState(configuration), (list, ep) => {
    if (!ep) {
      return list;
    }
    if (ep.connectedData) {
      list = list.concat(ep.connectedData); // eslint-disable-line no-param-reassign
    }
    return list;
  }, []);
}
