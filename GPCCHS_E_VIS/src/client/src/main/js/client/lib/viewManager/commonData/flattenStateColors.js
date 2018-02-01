// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7164 : 07/07/2017 : Apply filters on getLast request
// END-HISTORY
// ====================================================================

import __ from 'lodash/fp';

export default function flattenStateColors(stateColors = []) {
  if (!stateColors.length) {
    return '';
  }

  return __.compose(
    str => `:${str}`,
    __.join(','),
    __.sortBy(__.identity),
    __.map(({ color, condition: { field, operator, operand } }) => `${color}.${field}.${operator}.${operand}`)
  )(stateColors);
}
