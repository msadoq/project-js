const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./ADEItemAlgorithm');
const { getADEItemReference } = require('./ADEItemReference.stub');
const { getADEAlgorithmLanguage } = require('./ADEAlgorithmLanguage.stub');

const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/ADEItemAlgorithm.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.ADEItemAlgorithm');

const getADEItemAlgorithm = override => applyOverride({
  algorithmItemName: getADEItemReference({
    catalogName: 'Reporting',
    itemName: 'AIV_GC_GCDELTACHK',
  }),
  inputParameters: [
    getADEItemReference({
      catalogName: 'FunctionalSystemElement',
      itemName: 'AIV_AM_NEQCHECK',
    }),
    getADEItemReference({
      catalogName: 'FunctionalSystemElement',
      itemName: 'TEST_CCC_VARIABLE',
    })
  ],
  algorithms: [
    getADEAlgorithmLanguage({
      language: 'Python',
      text: 'AIV_AM_NEQCHECK.engineeringValue * TEST_CCC_VARIABLE.engineeringValue',
    }),
    getADEAlgorithmLanguage({
      language: 'Brainfuck',
      text: '+++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++..+++.>>.<-.<.+++.--.--.>+.>+.',
    }),
  ],
}, override);

const getADEItemAlgorithmProtobuf = override => {
  const toEncode = getADEItemAlgorithm(override);
  return Builder.encode(Adapter.encode(toEncode)).finish();
};

module.exports = {
  getADEItemAlgorithm,
  getADEItemAlgorithmProtobuf,
};
