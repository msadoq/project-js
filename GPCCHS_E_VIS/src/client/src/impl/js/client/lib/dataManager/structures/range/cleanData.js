import { viewRangeRemove } from './viewDataUpdate';

export default function cleanData(state, viewId, epName, expectedInterval) {
  const viewData = state.viewData[viewId];
  if (!viewData) {
    return state;
  }
  const viewState = viewRangeRemove(viewData, expectedInterval[0], expectedInterval[1]);

  return (viewState === state.viewData[viewId])
    ? state // no modification
    : { ...state,
      viewData: {
        ...state.viewData, [viewId]: viewState
      } };
}
