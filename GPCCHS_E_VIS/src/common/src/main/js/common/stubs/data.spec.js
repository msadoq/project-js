const data = require('./data');

describe('stubs/data', () => {
  Object.keys(data).map(key => it(`should run ${key} without error`, () => data[key]()));
});
