const map = {};

export const add = (tbdId, dataId) => {
  if (!map[tbdId]) {
    map[tbdId] = dataId;
  }
};

export const get = tbdId => map[tbdId];
