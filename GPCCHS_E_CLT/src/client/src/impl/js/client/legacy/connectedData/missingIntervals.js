/**
 * Compare prev interval with next interval and return missing interval or undefined
 *
 * @param prev array
 * @param next array
 * @return array
 */
export default function missingIntervals(prev, next) {
  console.log('welcome in missing', prev, next);
  if (!prev || !prev.length) {
    return [next];
  }

  const prevLower = prev[0];
  const prevUpper = prev[1];
  const nextLower = next[0];
  const nextUpper = next[1];
  // is new interval the same as previous
  if (prevLower === nextLower && prevUpper === nextUpper) {
    return [];
  }

  // is new interval contained in previous
  if (prevLower <= nextLower && prevUpper >= nextUpper) {
    return [];
  }

  // is new interval "fully" outside of previous interval
  if (prevLower > nextUpper || prevUpper < nextLower) {
    return [next];
  }

  // is new interval "around" previous interval
  if (prevLower > nextLower && prevUpper < nextUpper) {
    return [
      [nextLower, prevLower],
      [prevUpper, nextUpper],
    ];
  }

  // is new interval start before previous interval
  if (prevLower >= nextLower) {
    return [[nextLower, prevLower]];
  }

  // is new interval end after previous interval
  if (prevUpper <= nextUpper) {
    return [[prevUpper, nextUpper]];
  }

  throw new Error('hit bottom'); // TODO remove
}
