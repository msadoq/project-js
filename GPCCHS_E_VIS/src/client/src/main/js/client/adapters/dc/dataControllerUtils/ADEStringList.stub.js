const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./ADEStringList');

const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/ADEStringList.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.ADEStringList');

const getADEStringList = (values) => {  
  return {
    values,
  };
};

const getADEStringListProtobuf = values => {
  const toEncode = getADEStringList(values);
  return Builder.encode(Adapter.encode(toEncode)).finish();
}

module.exports = {
  getADEStringList,
  getADEStringListProtobuf,
};
