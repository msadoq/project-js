import _omit from 'lodash/omit';
import _indexOf from 'lodash/indexOf';
import _reduce from 'lodash/reduce';
import u from 'updeep';

export default function removeEpData(stateViewData, viewId, epName) {
  const currentViewData = stateViewData[viewId];
  if (!currentViewData) {
    return stateViewData;
  }
  let epNameExists = false;
  // looking over columns
  const newIndex = [];
  const newColumns = _reduce(currentViewData.columns, (columns, column) => {
    const keys = Object.keys(column);
    // No epName for this timestamp: keep all values
    if (_indexOf(keys, epName) === -1) {
      columns.push(column);
      newIndex.push(column.x);
      return columns;
    }
    epNameExists = true;
    // remove epName
    const newColumn = _omit(column, epName);
    // check if at least one value stays for the timestamp
    if (Object.keys(newColumn).length === 1) {  // no entry point, only x value
      // if not, don't add timestamp in index table
      return columns;
    }
    columns.push(newColumn);
    newIndex.push(column.x);
    return columns;
  }, []);

  // If EP absent, don't mutate the state
  if (!epNameExists) {
    return stateViewData;
  }
  // No data, remove viewId
  if (newColumns.length === 0) {
    return u(u.omit(viewId), stateViewData);
  }
  // Return updated state
  return u({ [viewId]: {
    index: newIndex,
    columns: newColumns,
  } }, stateViewData);
}
