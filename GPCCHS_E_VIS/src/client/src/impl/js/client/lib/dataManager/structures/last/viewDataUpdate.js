import _get from 'lodash/get';

export default function viewDataUpdate(state, viewId, view) {
  const index = view.index;
  const values = view.values;
  if (!Object.keys(index).length && !Object.keys(values).length) {
    return state;
  }

  const stateIndex = _get(state, ['viewData', viewId, 'index'], {});
  const stateValues = _get(state, ['viewData', viewId, 'values'], {});

  // TODO : simplify code and bufferisation by passing all value for this param and take only closer
  // to current time here

  return {
    ...state,
    viewData: {
      ...state.viewData,
      [viewId]: {
        index: { ...stateIndex, ...index },
        values: { ...stateValues, ...values },
      }
    }
  };

  // return Object.assign({}, state, { viewData: {
  //   [viewId]: {
  //     index: { ...stateIndex, ...index },
  //     values: { ...stateValues, ...values },
  //   } }
  // });
}
