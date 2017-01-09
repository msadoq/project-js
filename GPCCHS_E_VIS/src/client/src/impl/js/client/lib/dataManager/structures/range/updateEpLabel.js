import u from 'updeep';

export default function updateEpLabel(stateViewData, viewId, oldLabel, newLabel) {
  const viewData = stateViewData[viewId];
  if (!oldLabel || !newLabel || oldLabel === newLabel || !viewData) {
    return stateViewData;
  }

  const newColumns = viewData.columns.reduce((list, column) => {
    const oldValue = column[oldLabel];
    const newColumn = u(u.omit(oldLabel), column);
    list.push(Object.assign({}, newColumn, { [newLabel]: oldValue }));
    return list;
  }, []);

  return u({ [viewId]: { columns: newColumns } }, stateViewData);
}
