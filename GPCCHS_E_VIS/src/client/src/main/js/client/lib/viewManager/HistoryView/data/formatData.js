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
 * Returns an object mapping each group name with its respective size,
 * i.e the number of fields that are in this group
 *
 * @param columns
 * @returns {*|{}}
 */
const computeGroupSizes = (columns = []) =>
  columns.reduce((acc, group) => {
    const groupName = group[0];
    const groupParams = group[1];
    const groupSize = groupParams.length;

    return {
      ...acc,
      [groupName]: groupSize,
    };
  }, {});

const getParamName = (paramName) => {
  if (paramName === 'referenceTimestamp') {
    return 'timestamp';
  }

  if (paramName === 'epName') {
    return 'name';
  }

  return paramName;
};

/**
 * Get the ordered list of the parameters to display
 *
 * @param columns
 * @returns {*|*[]}
 */
const getColumns = (columns = []) =>
  columns.reduce((acc, group) => {
    const groupParams =
      group[1]
        .filter(param => param.isDisplayed)
        .map(param => param.field);

    return [
      ...acc,
      ...groupParams,
    ];
  }, []);

const getColumnGroupMap = (columns = []) =>
  columns.reduce((acc, group) => {
    const groupName = group[0];
    const groupParams = group[1];

    return {
      ...acc,
      ...groupParams.reduce((paramAcc, param) => ({
        ...paramAcc,
        [getParamName(param.field)]: groupName,
      }), {}),
    };
  }, {});

const getColumnIndex = (colKey, columns) => columns.indexOf(colKey);

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

    const columns = getColumns(config.columns);

    const getParamValue = (colIndex) => {
      const paramName = columns[colIndex];

      if (paramName === 'unit') { // extract data from config
        const getEntryPointUnit = () => {
          const foundEntryPoint = config.entryPoints.find(e => e.name === ep.epName);
          if (foundEntryPoint) {
            return foundEntryPoint.connectedData.unit;
          }

          return null;
        };

        return getEntryPointUnit();
      }

      return ep[paramName];
    };

    Object
      .keys(columns)
      .forEach(colIndex => acc[index].push(getParamValue(colIndex)));

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

  const columns = getColumns(config.columns);

  const colName = config.sorting.colName;
  const colIndex = getColumnIndex(colName, columns);
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

  const { filters, columns: columnsConfig } = config;

  const columns = getColumns(columnsConfig);

  const shouldKeepRow = (row) => {
    let ans = true;

    Object
      .keys(filters)
      .forEach((key) => {
        const filterValue = filters[key];
        const rowValueToFilter = row[getColumnIndex(key, columns)];
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
  groups: computeGroupSizes(config.columns),
  cols: getColumnGroupMap(config.columns),
  data:
    scopeData(sortData(filterData(preformatData(rawData, config), config), config), config),
});

export default formatData;
