const itemAlgorithm = require('./ADEItemAlgorithm');

const encode = data => ({
  itemName: data.itemName,
  comment: data.comment,
  longDescription: data.longDescription,
  shortDescription: data.shortDescription,
  unit: data.unit,
  algorithm: data.algorithm ? itemAlgorithm.encode(data.algorithm) : undefined,
});

const decode = data => ({
  itemName: data.itemName,
  comment: data.comment,
  longDescription: data.longDescription,
  shortDescription: data.shortDescription,
  unit: data.unit,
  algorithm: data.algorithm ? itemAlgorithm.decode(data.algorithm) : undefined,
});

module.exports = {
  encode,
  decode,
};
