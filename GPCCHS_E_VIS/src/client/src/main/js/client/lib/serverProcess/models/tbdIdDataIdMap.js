/**
 * tbdIdDataIdMap
 * Map to link tbdId with DataId
 */
const map = {};

/**
 * Add <TbdId,DataId> entry in the map
 * @param {*} tbdId The tbdId
 * @param {*} dataId The dataId
 */
export const add = (tbdId, dataId) => {
  if (!map[tbdId]) {
    map[tbdId] = dataId;
  }
};

/**
 * Get dataId for a given dataId
 * @param {*} tbdId The tbdId
 * @return The dataId
 */
export const get = tbdId => map[tbdId];

/**
 * Get filter from the tbdId(= flatten dataId + filters)
 * @param {*} tbdId The tbdId
 * @return Filters array
 */
export const getFilters = (tbdId) => {
  const filtersArray = [];
  const splitted = map[tbdId].split(':');

  for (let i = 3; i < splitted.length; i += 1) {
    const filterSplitted = splitted[i].split('.');
    if (filterSplitted.length === 3) {
      filtersArray.push({
        field: filterSplitted[0],
        operator: filterSplitted[1],
        operand: filterSplitted[2],
      });
    }
  }
  return filtersArray;
};
