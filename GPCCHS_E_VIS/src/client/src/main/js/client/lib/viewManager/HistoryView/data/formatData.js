/* eslint-disable quote-props,no-unused-vars */


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
    const epName = line[0];
    const timestamp = line[1];
    const ep = data[epName] && data[epName][timestamp];

    if (!ep) {
      return acc;
    }

    if (!acc[index]) {
      acc[index] = [];
    }

    const { cols } = config;

    const getParamValue = (colIndex) => {
      const paramName = cols[colIndex].title;
      return ep[paramName];
    };

    const _stateColor = ep.color;

    Object
      .keys(cols)
      .forEach(colIndex => acc[index].push({
        value: getParamValue(colIndex),
        textColor: _stateColor,
      }));

    return acc;
  };

  return lines.reduce(reducer, []);
};

const getCurrentLines = (rawData) => {
  if (rawData.current) {
    return Object.keys(rawData.current).map(
      epKey => ({
        epName: epKey,
        timestamp: rawData.current[epKey][1],
      })
    );
  }

  return [];
};

/**
 * Formats received entry points data into a format readable by HistoryView component
 *
 * @param rawData
 * @param config
 * @return {{length: *, groups: *}}
 */
const formatData = (rawData, config) => ({
  currentLines: getCurrentLines(rawData, config),
  data: preformatData(rawData, config),
});

export default formatData;
