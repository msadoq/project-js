const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./ADEItemStructure');

const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/ADEItemStructure.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.ADEItemStructure');

const getADEItemStructure = () => {
  return {
    itemName: 'Root',
    children: [
      {
        itemName: 'Bidule',
        children: [
          { itemName: 'GENE_AM_CCSDSVERS1', unit: 'Ω' },
          { itemName: 'GENE_AM_CCSDSVERS2', unit: 'K' },
          { itemName: 'GENE_AM_CCSDSVERS3', unit: 'inches' },
        ],
      },
      {
        itemName: 'Machin',
        children: [
          { itemName: 'GENE_AM_CCSDSVERS4', unit: 'Pa' },
          { itemName: 'GENE_AM_CCSDSVERS5', unit: 'H/m' },
        ],
      },
    ],
  };
};

const getADEItemStructureProtobuf = () => {
  return Builder.encode(Adapter.encode(getADEItemStructure())).finish();
}

module.exports = {
  getADEItemStructure,
  getADEItemStructureProtobuf,
};
