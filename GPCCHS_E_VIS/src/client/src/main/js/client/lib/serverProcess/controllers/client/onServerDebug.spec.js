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
    expect(message).toHaveLength(2);
    expect(message[0]).toBe(myQueryId);
    expect(message[1]).toMatchObject({
      debug: getModelsState(),
    });
  });
});
