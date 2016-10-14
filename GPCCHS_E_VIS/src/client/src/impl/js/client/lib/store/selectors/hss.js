import _ from 'lodash';

/**
 * Selectors
 */
export function getStatus(state, identity) {
  if (!identity) {
    return undefined;
  }

  const ws = _.get(state, `hss.${identity}`);
  if (!ws) {
    return undefined;
  }

  return ws;
}
