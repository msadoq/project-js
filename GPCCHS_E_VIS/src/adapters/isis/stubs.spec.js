require('.');
const data = require('./stubs');

describe('adapters/isis stubs', () => {
  Object.keys(data).map((key) => {
    if (key.includes('DeProtobuf')) {
      return undefined;
    }
    return test(`should run ${key} without error`, () => {
      expect(() => data[key]()).not.toThrow();
    });
  });
});
