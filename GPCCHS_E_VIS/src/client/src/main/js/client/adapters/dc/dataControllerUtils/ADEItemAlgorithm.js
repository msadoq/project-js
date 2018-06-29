const itemReference = require('./ADEItemReference');
const algorithmLanguage = require('./ADEAlgorithmLanguage');

const encode = data => ({
  algorithmItemName: itemReference.encode(data.algorithmItemName),
  inputParameters: data.inputParameters.map(name => itemReference.encode(name)),
  algorithms: data.algorithms.map(algo => algorithmLanguage.encode(algo)),
});

const decode = data => ({
  algorithmItemName: itemReference.decode(data.algorithmItemName),
  inputParameters: data.inputParameters.map(name => itemReference.decode(name)),
  algorithms: data.algorithms.map(algo => algorithmLanguage.decode(algo)),
});

module.exports = {
  encode,
  decode,
};
