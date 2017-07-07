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
