import { viewRangeRemove, scanForMinAndMax } from './viewDataUpdate';


// epName is not used
// it is only to have the same call between last and range function
export default function cleanData(viewDataState, viewId, epName, expectedInterval) {
  const viewData = viewDataState[viewId];
  if (!viewData) {
    return viewDataState;
  }
  let viewState = viewRangeRemove(viewData, expectedInterval[0], expectedInterval[1]);
  // Update of min and max if needed
  viewState = scanForMinAndMax(viewState);

  return viewState === viewDataState[viewId]
    ? viewDataState // no modification
    : { ...viewDataState, [viewId]: viewState };
}
