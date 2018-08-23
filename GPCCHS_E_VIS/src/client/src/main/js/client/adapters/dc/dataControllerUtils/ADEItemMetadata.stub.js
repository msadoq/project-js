const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./ADEItemMetadata');
const { getADEItemAlgorithm } = require('./ADEItemAlgorithm.stub');
const { getADEItemMetadataTM } = require('./ADEItemMetadataTM.stub');
const { getAliasRecord } = require('./AliasRecord.stub');

const unitStub = {
  "distance": [
    "m",
    "km",
    "cm",
    "inch",
    "mm",
    "dm",
    "in",
    "ft",
    "nmile",
    "yd",
    "mile"
  ],
"time": [
  "s",
  "ms",
  "year",
  "century",
  "day",
  "h",
  "min",
  "us",
  "ns"
],
"mass": [
  "g",
  "kg",
  "mg",
  "t",
  "lb",
  "oz",
  "slug",
  "lb*g*s/ft"
],
"frequency": [
  "Hz",
  "kHz",
  "MHz",
  "GHz"
],
"angles": [
  "deg",
  "rad",
  "grad",
  "gr",
  "tr",
  "sarc"
],
"force": [
  "N",
  "kg*m/s²",
  "kgf"
],
"pressure": [
  "Pa",
  "N/m²",
  "bar",
  "hPa",
  "kPa",
  "mbar",
  "kbar"
],
"energy": [
  "J",
  "N*m",
  "kJ",
  "MJ"
],
"power": [
  "W",
  "MW",
  "kW",
  "J/s"
],
"solarFlow": [
  "sfu",
  "W/m²"
],
"temperature": [
  "C",
  "F",
  "K"
],
"propagation": [
  "mdis",
  "us"
],
"electrical": [
  "mA",
  "A",
  "W",
  "V",
  "ohm"
],
"magnetic": [
  "T",
  "G"
],
"BitsPerSeconds": [
  "bps",
  "SU"
],
"timeShift": [
  "J2000",
  "JD",
  "RJD",
  "MJD",
  "TJD",
  "UNIX",
  "G50",
  "GPS"
],
"speed": [
  "m.s-1",
  "km.s-1",
  "m.h-1",
  "km.h-1"
],
"speedBig": [
  "al.s-1",
  "parsec.s-1"
]
};
const Builder = new ProtoBuf.Root()
  .loadSync(`${__dirname}/ADEItemMetadata.proto`, { keepCase: true })
  .lookup('dataControllerUtils.protobuf.ADEItemMetadata');

const getADEItemMetadata = override => applyOverride({
  itemName: 'SAT_BC_NUMTC13',
  comment: 'sdfsdf',
  longDescription: 'sdf',
  shortDescription: 'sdf',
  aliases: [
    getAliasRecord(),
    getAliasRecord({ alias: 'truc', contextDomain: 'machin' }),
  ],
  unit: getRandomUnit(),
  algorithm: getADEItemAlgorithm(),
  tmMeta: getADEItemMetadataTM(),
}, override);

const getADEItemMetadataProtobuf = override => {
  const toEncode = getADEItemMetadata(override);
  return Builder.encode(Adapter.encode(toEncode)).finish();
};

const getRandomUnit = () => {
  const k = Object.keys(unitStub);
  const l =  unitStub[k[Math.floor(Math.random() * k.length)]];
  return l[Math.floor(Math.random() * l.length)];
}
module.exports = {
  getADEItemMetadata,
  getADEItemMetadataProtobuf,
};
