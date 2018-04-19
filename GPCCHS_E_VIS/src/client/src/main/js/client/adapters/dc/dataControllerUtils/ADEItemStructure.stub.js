const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./ADEItemStructure');

const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/ADEItemStructure.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.ADEItemStructure');

const getADEItemStructure = () => {  
  return {
    itemName: 'Machin_1',
    children: [
      {
        itemName: 'Machin_2',
        children: [
          {
            itemName: 'Machin_3',
          },
        ],
      },
      {
        itemName: 'Truc_2',
      },
      {
        itemName: 'Bidule_2',
        children: [
          {
            itemName: 'Bidule_3',
          },
          {
            itemName: 'Tartanpion_3',
          },
          {
            itemName: 'Stub_3',
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