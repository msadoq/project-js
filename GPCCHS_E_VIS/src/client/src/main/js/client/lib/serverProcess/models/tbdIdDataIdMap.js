// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 18/08/2017 : Update multiple test and implementation
// VERSION : 1.1.2 : DM : #6700 : 21/08/2017 : Add a forecast on play pressed
// VERSION : 1.1.2 : DM : #6700 : 22/08/2017 : Second fix filters crash on realtime
// VERSION : 1.1.2 : DM : #6700 : 22/08/2017 : Fix error on filters retrieval .
// END-HISTORY
// ====================================================================

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
  const splitted = tbdId.split(':');

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
