import { each } from 'lodash';

export default function getDisplayedValues(stateLocalId, field, interval, remoteIdPayload) {
  const final = {};
  each(remoteIdPayload, (payload) => {
    const time = payload.timestamp;
    if (time <= interval[1] && time >= interval[0]) {
      const oldTime = (final.timestamp || (stateLocalId && stateLocalId.timestamp));
      if (!oldTime || oldTime < time) {
        final.timestamp = time;
        final.value = payload.payload[field];
      }
    }
  });

  // test if value was set above, shoud test undefined to preserve falsable values
  if (typeof final.value !== 'undefined') {
    return final;
  }

  return stateLocalId;
}
