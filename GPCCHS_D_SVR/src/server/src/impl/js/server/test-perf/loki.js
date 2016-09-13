const debug = require('../lib/io/debug')('test-perf:loki');
const Loki = require('lokijs');

const cache = new Loki('cache.json');
const collection = cache.addCollection('collection');

// STOP at  8400000 iterations by default
// STOP at 12300000 iterations with --max_old_space_size=2048
// STOP at 24300000 iterations with --max_old_space_size=4096
// DO the  25000000 iterations with --max_old_space_size=5120

const MAX = 25000000;
const STEP = 1000000;

for (let i = 0; i < MAX; i++) {
  if (i % STEP === 0) {
    debug.info(i);
  }
  const value = { key: i };
  collection.insert(value);
}
