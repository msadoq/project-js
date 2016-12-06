

export default function isEpDifferent(oldEp, newEp) {
  let isUpdated = false;
  if (oldEp.field !== newEp.field) {
    isUpdated = true;
  }
  // EP definition modified: remove entry point from viewData
  if (oldEp.remoteId !== newEp.remoteId) {
    isUpdated = true;
  }

  return isUpdated;
}
