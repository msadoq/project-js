const { testHandler, getTestHandlerArgs, resetTestHandlerArgs } = require('../../utils/test');
const getModelsState = require('../../utils/getModelsState');

const onServerDebug = require('./onServerDebug');


describe('controllers/client/onServerDebug', () => {
  beforeEach(() => {
    resetTestHandlerArgs();
  });
  it('works', () => {
    const myQueryId = 'myQueryId';
    // launch test
    onServerDebug(testHandler, myQueryId);
    // check data
    const message = getTestHandlerArgs();
    expect(message).be.an('array').toHaveLength(2);
    expect(message[0]).toBe(myQueryId);
    expect(typeof message[1]).toBe('object')
      .that.has.properties({
        debug: getModelsState(),
      });
  });
});
