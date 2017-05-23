// Produced by Acceleo JavaScript Generator 1.1.0
require('../../../../utils/test');
const stubData = require('../.././index');

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

