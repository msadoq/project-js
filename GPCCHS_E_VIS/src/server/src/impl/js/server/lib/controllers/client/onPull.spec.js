require('../../utils/test');
const { add, reset, get } = require('../../utils/dataQueue');
const onPull = require('./onPull');

describe('controllers/client/onPull', () => {
  beforeEach(() => {
    reset();
  });
  it('should ignore empty queue', () => {
    let called = false;
    let sent = false;
    onPull({ write: (data) => {
      called = true;
      sent = data;
    } });
    called.should.equal(true);
    sent.should.eql({
      event: 'timebasedData',
      payload: {},
    });
  });
  it('should push data', () => {
    let called = false;
    let sent = null;
    add('myRemoteId', { myKey: 'value' });
    onPull({ write: (data) => {
      called = true;
      sent = data;
    } });
    called.should.equal(true);
    sent.should.eql({
      event: 'timebasedData',
      payload: {
        myRemoteId: { myKey: 'value' },
      },
    });
    get().should.eql({});
  });
});
