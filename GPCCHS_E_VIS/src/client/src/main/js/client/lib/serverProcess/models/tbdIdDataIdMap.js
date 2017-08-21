const map = {};

export const add = (tbdId, dataId) => {
  if (!map[tbdId]) {
    map[tbdId] = dataId;
  }
};

export const get = tbdId => map[tbdId];

export const getFilters = (tbdId) => {
  const filtersArray = [];
  const splitted = tbdId.split(':');
  for (let i = 3; i < splitted.length; i += 1) {
    const filterSplitted = splitted[i].split('.');

    filtersArray.push({
      field: filterSplitted[0],
      operator: filterSplitted[1],
      operand: filterSplitted[2],
    });
  }
  return filtersArray;
};
