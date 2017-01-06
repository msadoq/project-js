import _get from 'lodash/get';

export default function viewDataUpdate(viewDataState, viewId, view) {
  const index = view.index;
  const values = view.values;
  if (!Object.keys(index).length && !Object.keys(values).length) {
    return viewDataState;
  }

  const stateIndex = _get(viewDataState, [viewId, 'index'], {});
  const stateValues = _get(viewDataState, [viewId, 'values'], {});

  // TODO : simplify code and bufferisation by passing all value for this param and take only closer
  // to current time here

  return {
    ...viewDataState,
    [viewId]: {
      index: { ...stateIndex, ...index },
      values: { ...stateValues, ...values },
    }
  };
}
