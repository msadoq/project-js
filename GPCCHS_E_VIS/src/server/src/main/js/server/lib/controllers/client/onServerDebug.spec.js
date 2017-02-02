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
    message.should.be.an('array')
      .that.has.lengthOf(2);
    message[0].should.equal(myQueryId);
    message[1].should.be.an('object')
      .that.has.properties({
        debug: getModelsState(),
      });
  });
});
