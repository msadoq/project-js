import u from 'updeep';

export default function updateEpLabel(state, viewId, oldLabel, newLabel) {
  const viewData = state.viewData[viewId];
  if (!oldLabel || !newLabel || oldLabel === newLabel || !viewData) {
    return state;
  }

  const newColumns = viewData.columns.reduce((list, column) => {
    const oldValue = column[oldLabel];
    const newColumn = u(u.omit(oldLabel), column);
    list.push(Object.assign({}, newColumn, { [newLabel]: oldValue }));
    return list;
  }, []);

  return {
    ...state,
    viewData: {
      ...state.viewData,
      [viewId]: {
        ...state.viewData[viewId],
        columns: newColumns
      }
    }
  };
}
