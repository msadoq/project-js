import { viewRangeRemoveByEp, scanForMinAndMax } from './viewDataUpdate';


export default function cleanData(viewDataState, viewId, epName, expectedInterval) {
  const viewData = viewDataState[viewId];
  if (!viewData) {
    return viewDataState;
  }
  let viewState = viewRangeRemoveByEp(viewData, epName, expectedInterval[0], expectedInterval[1]);
  // Update of min and max if needed
  viewState = scanForMinAndMax(viewState);

  return viewState === viewDataState[viewId]
    ? viewDataState // no modification
    : { ...viewDataState, [viewId]: viewState };
}
