require('./test');
const sendToWindow = require('./sendToWindow');
const TestWebSocket = require('../stubs/testWebSocket');

const testWebSocket = new TestWebSocket();
testWebSocket.init();
const testSpark = testWebSocket.getSpark();

describe('sendToWindow', () => {
  beforeEach(() => {
    testSpark.resetMessage();
  });
  it('works', () => {
    const myData = [{
      id: 'myId',
      payload: 'myPayload',
    }];
    sendToWindow(testSpark, myData);
    const message = testSpark.getMessage();
    message.should.be.an('object')
      .that.has.a.property('event')
      .that.equal('newData');
    message.should.have.a.property('payload')
      .that.is.an('array')
      .that.has.lengthOf(1);
    message.payload[0].should.be.an('object')
      .that.has.properties(myData[0]);
  });
});
