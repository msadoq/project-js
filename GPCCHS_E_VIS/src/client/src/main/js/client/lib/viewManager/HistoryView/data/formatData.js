/* eslint-disable quote-props,no-unused-vars */

import _ from 'lodash';

/**
 * List of all comObjected (group names) that could be displayed in HistoryView
 *
 * @type {Array}
 */
const availableComObjects = [
  'ReportingParameter',
  'LogbookEvent',
  'ComputedEvent',
  'UserEvent',
  'COP1Status',
];

/**
 * List of all the parameters that are displayed in HistoryView table
 *
 * @type {string[]}
 */
const COLS = [
  'referenceTimestamp',
  'epName',
];

const DISPLAYED_COLS = COLS.reduce((acc, value) =>
  ({
    ...acc,
    [value]: true,
  })
);

const COLS_INDEXES = _.invert(COLS);

/**
 * Maps each parameter name to a specific group
 *
 * @type object
 */
export const COL_GROUP_MAP = {
  referenceTimestamp: 'default',
  epName: 'default',
};

const GROUPS_SIZE =
  Object
    .keys(COL_GROUP_MAP)
    .reduce((acc, colKey) => {
      const group = COL_GROUP_MAP[colKey];

      if (!acc[group]) {
        acc[group] = 0;
      }

      acc[group] += 1;

      return acc;
    }, {});


/**
 * Formats received data to appropriate format, i.e an array of values, e.g:
 *
 * [
 *   [ timestampValue1, epName1, ... ],
 *   [ timestampValue1, epName2, ... ],
 * ]
 *
 * @param rawData
 * @param config
 * @returns {Array}
 */
const preformatData = (rawData, config) => {
  const { data, lines } = rawData;

  const reducer = (acc, line, index) => {
    const parts = line.split(' ');
    const epName = parts[0];
    const timestamp = parts[1];
    const ep = data[epName] && data[epName][timestamp];

    if (!ep) {
      return acc;
    }

    if (!acc[index]) {
      acc[index] = [];
    }

    const displayedFields = config.displayedFields || DISPLAYED_COLS;

    Object.keys(displayedFields)
      .forEach(colKey => acc[index].push(ep[colKey]));

    return acc;
  };

  return lines.reduce(reducer, []);
};

/**
 * Returns only the part of the data that is displayed to the user,
 * depending on config.offset and config.maxDisplayedRows
 *
 * @param preformattedData
 * @param config
 * @returns {Array}
 */
const scopeData = (preformattedData, config) => {
  const maxDisplayedRows = computeMaxDisplayedRows(config);
  const { dataOffset } = config;
  return preformattedData.slice(dataOffset, dataOffset + maxDisplayedRows);
};

/**
 * Sorts preformatted data over the specified column in config
 *
 * @param preformattedData
 * @param config
 * @returns {Array}
 */
const sortData = (preformattedData, config) => {
  if (!config.sorting) {
    return preformattedData;
  }

  const sortedData = preformattedData.slice();

  const colName = config.sorting;
  const colIndex = COLS_INDEXES[colName];
  const direction = config.sorting.direction || 'ASC';

  const compareRows = (arr1, arr2) => {
    const [a, b] = {
      'ASC': [arr1[colIndex], arr2[colIndex]],
      'DESC': [arr2[colIndex], arr1[colIndex]],
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

/**
 * Filters preformatted data with the specified filters in config
 *
 * @param preformattedData
 * @param config
 * @returns {Array}
 */
const filterData = (preformattedData, config) => {
  if (!config.filters) {
    return preformattedData;
  }

  const { filters } = config;

  const shouldKeepRow = (row) => {
    let ans = true;

    Object.keys(filters)
      .forEach((key) => {
        const filterValue = filters[key];
        const rowValueToFilter = row[COLS_INDEXES[key]];
        if (rowValueToFilter.indexOf(filterValue) === -1) {
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
 * Returns the value of rows we should display given the view layout height
 *
 * @param config
 * @returns {number}
 */
const computeMaxDisplayedRows = (config) => {
  if (config.layoutHeight > 12) {
    return Math.min(config.maxDisplayedRows, Math.floor((config.layoutHeight - 1) * 1.5));
  }

  if (config.layoutHeight > 6) {
    return Math.min(config.maxDisplayedRows, config.layoutHeight);
  }

  return Math.min(config.maxDisplayedRows, Math.max(0, config.layoutHeight - 1));
};

/**
 * Formats received entry points data into a format readable by HistoryView component
 *
 * @param rawData
 * @param config
 * @return {{length: *, groups: *}}
 */
const formatData = (rawData, config) => ({
  groups: GROUPS_SIZE,
  cols: COLS,
  data:
    scopeData(sortData(filterData(preformatData(rawData, config), config), config), config),
});

export default formatData;
