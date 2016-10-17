import { each, slice, concat, findIndex, findLastIndex } from 'lodash';

export default function getDisplayedValues(stateLocalId, field, interval, remoteIdPayload) {
  let final;
  if (stateLocalId) {
    final = Object.assign({}, stateLocalId);
    const iLower = findIndex(final.index, i => i > interval[0]);
    const iUpper = findLastIndex(final.index, i => i < interval[1]);
    if (iLower >= 0 || iUpper >= 0) {
      final.index = slice(final.index, iLower < 0 ? 0 : iLower,
        iUpper < 0 ? final.index.length : iUpper + 1);
      const update = {};
      each(final.index, (time) => {
        update[time] = final.data[time];
      });
      final.data = update;
    }
  } else {
    final = { data: {}, index: [] };
  }
  let lastIndex = 0;
  each(remoteIdPayload, (payload) => {
    const time = payload.timestamp;
    if (time >= interval[0] && time <= interval[1]) {
      if (findIndex(final.index, i => i === time, lastIndex) < 0) {
        const index = findIndex(final.index, i => i > time, lastIndex);
        if (index < 0) {
          final.index.push(time);
          lastIndex = final.index.length - 1;
        } else {
          final.index = concat(
            slice(final.index, 0, index), time, slice(final.index, index)
          );
          lastIndex = index;
        }
        final.data[time] = payload.payload[field];
      }
    }
  });
  return final;
}
