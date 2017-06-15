require('.');
const data = require('./stubs');

describe('adapters/isis stubs', () => {
  Object.keys(data).map((key) => {
    if (key.includes('DeProtobuf')) {
      return undefined;
    }
    return it(`should run ${key} without error`, () => data[key]());
  });
});
