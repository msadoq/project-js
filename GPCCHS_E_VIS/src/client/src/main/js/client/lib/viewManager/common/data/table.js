import _ from 'lodash';

const _getColumnIndex = (colName, columns) =>
  columns.findIndex(col => col.title === colName);

/**
 * Filters preformatted data with the specified filters in config
 *
 * @param preformattedData
 * @param config
 * @returns {Array}
 */
export const filter = (preformattedData, config) => {
  const { filters, cols } = config;

  if (!filters) {
    return preformattedData;
  }

  const shouldKeepRow = (row) => {
    let ans = true;

    Object
      .keys(filters)
      .forEach((key) => {
        const filterValue = filters[key];
        const colIndex = _getColumnIndex(key, cols);
        const rowValueToFilter = row[colIndex].value;
        if ((String(rowValueToFilter) || '').indexOf(filterValue) === -1) {
          ans = false;
        }
      });

    return ans;
  };

  const filterRowsReducer = (acc, row) => {
    if (shouldKeepRow(row)) {
      acc.push(row);
    }

    return acc;
  };

  return preformattedData.reduce(filterRowsReducer, []);
};

/**
 * Sorts preformatted data over the specified column in config
 * TODO: refactor into common component
 *
 * @param preformattedData
 * @param config
 * @returns {Array}
 */
export const sort = (preformattedData, config) => {
  const { cols, sorting } = config;

  if (!sorting || !sorting.colName) {
    return preformattedData;
  }

  const sortedData = preformattedData.slice();

  const colName = config.sorting.colName;
  const colIndex = _getColumnIndex(colName, cols);
  const direction = config.sorting.direction || 'ASC';

  const compareRows = (arr1, arr2) => {
    const [v1, v2] = [
      _.get(arr1, [colIndex], { value: undefined }).value,
      _.get(arr2, [colIndex], { value: undefined }).value,
    ];

    const [a, b] = {
      ASC: [v1, v2],
      DESC: [v2, v1],
    }[direction];

    if (a < b) {
      return -1;
    }

    if (a > b) {
      return 1;
    }

    return 0;
  };

  sortedData.sort(compareRows);

  return sortedData;
};
