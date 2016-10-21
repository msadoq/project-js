import _get from 'lodash/get';
import _reduce from 'lodash/reduce';

// TODO: memoize
export default function getConnectedDataFromState(configuration) {
  return _reduce(_get(configuration, ['entryPoints'], []), (list, ep) => {
    if (!ep) {
      return list;
    }
    if (ep.connectedData) {
      list = list.concat(ep.connectedData); // eslint-disable-line no-param-reassign
    }
    return list;
  }, []);
}
