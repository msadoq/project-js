const getModelsState = require('../../utils/getModelsState');

const onServerDebug = require('./onServerDebug');

describe('controllers/client/onServerDebug', () => {
  test('works', (done) => {
    const myQueryId = 'myQueryId';
    const check = (...args) => {
      expect(args).toMatchObject([
        myQueryId,
        { debug: getModelsState() },
      ]);
      done();
    };
    onServerDebug(check, myQueryId);
  });
});
