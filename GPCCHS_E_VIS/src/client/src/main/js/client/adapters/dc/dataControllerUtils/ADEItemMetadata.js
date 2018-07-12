const itemAlgorithm = require('./ADEItemAlgorithm');
const aliasRecord = require('./AliasRecord');
const itemMetadataTM = require('./ADEItemMetadataTM');

const encode = data => ({
  itemName: data.itemName,
  comment: data.comment,
  longDescription: data.longDescription,
  shortDescription: data.shortDescription,
  aliases: data.aliases.map(alias => aliasRecord.encode(alias)),
  unit: data.unit,
  algorithm: data.algorithm ? itemAlgorithm.encode(data.algorithm) : undefined,
  tmMeta: data.tmMeta ? itemMetadataTM.encode(data.tmMeta) : undefined,
});

const decode = data => {
  console.log('#############', JSON.stringify(data, null, ' '));
  return ({
    itemName: data.itemName,
    comment: data.comment,
    longDescription: data.longDescription,
    shortDescription: data.shortDescription,
    aliases: data.aliases.map(alias => aliasRecord.decode(alias)),
    unit: data.unit,
    algorithm: itemAlgorithm.decode(data.algorithm),
    tmMeta: itemMetadataTM.decode(data.tmMeta),
  });
}

module.exports = {
  encode,
  decode,
};
