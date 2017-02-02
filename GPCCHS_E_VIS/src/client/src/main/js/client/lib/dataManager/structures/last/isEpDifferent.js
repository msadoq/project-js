

export default function isEpDifferent(oldEp, newEp) {
  let isUpdated = false;
  // in case of dynamic view, both field are undefined
  if (oldEp.field !== newEp.field) {
    isUpdated = true;
  }
  // EP definition modified: remove entry point from viewData
  if (oldEp.remoteId !== newEp.remoteId) {
    isUpdated = true;
  }

  return isUpdated;
}
