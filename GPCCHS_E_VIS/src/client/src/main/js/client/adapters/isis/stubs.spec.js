// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

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
