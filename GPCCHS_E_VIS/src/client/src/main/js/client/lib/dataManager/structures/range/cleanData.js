import u from 'updeep';
import { viewRangeRemove } from './viewDataUpdate';


// epName is not used
// it is only to have the same call between last and range function
export default function cleanData(viewDataState, viewId, epName, expectedInterval) {
  const viewData = viewDataState[viewId];
  if (!viewData) {
    return viewDataState;
  }
  const viewState = viewRangeRemove(viewData, expectedInterval[0], expectedInterval[1]);

  return (viewState === viewDataState[viewId])
    ? viewDataState // no modification
    : u({ [viewId]: viewState }, viewDataState);
}
