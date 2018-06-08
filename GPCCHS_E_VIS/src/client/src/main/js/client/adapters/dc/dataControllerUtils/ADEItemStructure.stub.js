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
          {
            itemName: 'GENE_AM_CCSDSVERS1',
          }, {
            itemName: 'GENE_AM_CCSDSVERS2',
          }, {
            itemName: 'GENE_AM_CCSDSVERS3',
          },
        ],
      },
      {
        itemName: 'Machin',
        children: [
          {
            itemName: 'GENE_AM_CCSDSVERS4',
          },
          {
            itemName: 'GENE_AM_CCSDSVERS5',
          },
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
