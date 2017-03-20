#!/usr/share/isis/node-v6.3.0-linux-x64/bin/node

const readline = require('readline');

const stream = readline.createInterface({
  input: process.stdin,
});

let totalSize = 0;
const duration = 5;

stream.on('line', (line) => {
  const size = parseInt(line.split(' ').slice(-1)[0], 10);
  if (size) {
    totalSize += size;
  }
});

const getSize = ({
  size,
  decimals,
  coef,
  convert,
} = {
  size: totalSize,
  decimals: 4,
  coef: duration,
  convert: s => s / (1024 * 1024),
}) =>
  Math.floor((convert(size) / coef) * (10 ** decimals)) / (10 ** decimals);

setInterval(() => {
  console.log(`${getSize()} Mb/s`); // eslint-disable-line no-console
  totalSize = 0;
}, duration * 1000);
