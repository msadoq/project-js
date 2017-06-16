const adapter = require('./ackSMS.js');
const stubData = require('./ackSMS.stub.js');

describe('standalone/proto', () => {
  let buffer;
  
  test('encode', () => {
    buffer = adapter.encode(stubData);
    expect(buffer.value.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(buffer);
    console.log(decoded);
    expect(decoded).toHaveProperty(SystemCreationDate.type,'time');
    expect(decoded).toHaveProperty(SystemCreationDate.value,stubData.SystemCreationDate);
    expect(decoded).toHaveProperty(ApplicationCreationDate.type,'time');
    expect(decoded).toHaveProperty(ApplicationCreationDate.value,stubData.ApplicationCreationDate);
  });
});




/*
require('../../../../utils/test');
const stubData = require('../../../stubs/index');

const protobuf = require('../../../index');


describe('protobuf/lpisis/ackRequest/AckSMS', () => {
  const fixture = stubData.getAckSMS();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.ackRequest.AckSMS', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.ackRequest.AckSMS', buffer);
    json.should.be.an('object').that.have.properties({
      SystemCreationDate: { type: 'time', value: fixture.SystemCreationDate },
      ApplicationCreationDate: { type: 'time', value: fixture.ApplicationCreationDate },
    });
  });
});
*/
