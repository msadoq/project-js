// eslint-disable-next-line no-underscore-dangle
const _floor = require('lodash/floor');
// eslint-disable-next-line no-underscore-dangle
const _round = require('lodash/round');

const GIGA_BYTES = Math.pow(2, 30);
const MEGA_BYTES = Math.pow(2, 20);
const KILO_BYTES = Math.pow(2, 10);

module.exports = (value) => {
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
