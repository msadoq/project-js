/* eslint no-restricted-properties:0 */
const _floor = require('lodash/floor');
const _round = require('lodash/round');

const GIGA_BYTES = Math.pow(2, 30);
const MEGA_BYTES = Math.pow(2, 20);
const KILO_BYTES = Math.pow(2, 10);

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

module.exports = {
  getTimer,
  bytesConverter,
};
