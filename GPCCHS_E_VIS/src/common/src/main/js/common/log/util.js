/* eslint no-restricted-properties:0 */
const _ = require('lodash/fp');
const _floor = require('lodash/floor');
const _round = require('lodash/round');

const GIGA_BYTES = Math.pow(2, 30);
const MEGA_BYTES = Math.pow(2, 20);
const KILO_BYTES = Math.pow(2, 10);

const TRANSPORT_SEPARATOR = ':';
const TRANSPORT_ARGS_ASSIGNMENT = '?';
const PARAM_SEPARATOR = ',';
const PARAM_ASSIGNMENT = '=';

const bytesConverter = (value) => {
  const gigaValue = value / GIGA_BYTES;
  if (_floor(gigaValue) > 0) {
    return `${_round(gigaValue, 1)} GB (${value} bytes)`;
  }
  const megaValue = value / MEGA_BYTES;
  if (_floor(megaValue) > 0) {
    return `${_round(megaValue, 1)} MB (${value} bytes)`;
  }
  const kiloValue = value / KILO_BYTES;
  if (_floor(kiloValue) > 0) {
    return `${_round(kiloValue, 1)} kB (${value} bytes)`;
  }
  return `${value} bytes`;
};

// Returns a timer function to measure time in ms between to calls
const getTimer = () => {
  let prev;
  let curr;
  return () => {
    curr = +new Date();
    const diff = curr - (prev || curr);
    prev = curr;
    return diff;
  };
};

// Convert value to boolean or number if possible
const parseValue = value => (
  value === 'true' ? true : // eslint-disable-line no-nested-ternary
    (value === 'false' ? false :
      (Number(value) || value)));

// Deserialize param string to object
// param string format: <param1>=<value1>,<param2>=<value2>
const parseParams = _.pipe(
  _.defaultTo(''),
  _.split(PARAM_SEPARATOR),
  _.map(_.split(PARAM_ASSIGNMENT)),
  _.map(p => ({
    [p[0]]: parseValue(p[1]),
  })),
  _.reduce((acc, p) => _.assign(acc, p), {
    time: true,
    process: true,
    category: false,
    filter: '.*',
  })
);

// Deserialize string to object
// String format: <logger1>?<param1>=<value1>,<param2>=<value2>:<logger2>?<param1>=<value1>,...:...
const parseConfig =
  _.cond([
    [_.anyPass([_.isEmpty, str => str === 'undefined']), () => []],
    [_.stubTrue, _.pipe(
      _.split(TRANSPORT_SEPARATOR),
      _.map(_.split(TRANSPORT_ARGS_ASSIGNMENT)),
      _.map(t => ({
        type: t[0],
        params: parseParams(t[1]),
      }))
    )],
  ]);

module.exports = {
  getTimer,
  bytesConverter,
  parseParams,
  parseConfig,
};
