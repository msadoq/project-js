const data = require('./data');

describe('stubs/data', () => {
  Object.keys(data).map(key => it(key, () => data[key]()));
});
