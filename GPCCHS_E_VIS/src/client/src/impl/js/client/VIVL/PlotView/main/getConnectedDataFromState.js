import _get from 'lodash/get';
import _reduce from 'lodash/reduce';

// TODO: memoize
export default function getConnectedDataFromState(configuration) {
  return _reduce(_get(configuration, ['entryPoints'], []), (list, ep) => {
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
