// Produced by Acceleo JavaScript Generator 1.1.0
require('../../../../utils/test');
const stubData = require('../.././index');

const protobuf = require('../../../index');


describe('protobuf/lpisis/ackRequest/AckRequest', () => {
  const fixture = stubData.getAckRequest();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.ackRequest.AckRequest', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.ackRequest.AckRequest', buffer);
    json.should.be.an('object').that.have.properties({
      ackRequestDate: { type: 'time', value: fixture.ackRequestDate },
      systemDate: { type: 'time', value: fixture.systemDate },
      ack: (typeof fixture.ack === 'undefined')
        ? null
        : {
          ackDate: { type: 'time', value: fixture.ack.ackDate },
          acknowledger: {
            login: { type: 'string', value: fixture.ack.acknowledger.login },
            password: { type: 'string', value: fixture.ack.acknowledger.password },
            profile: { type: 'string', value: fixture.ack.acknowledger.profile },
            userTime: { type: 'time', value: fixture.ack.acknowledger.userTime },
          },
        },
      comment: { type: 'string', value: fixture.comment },
    });
  });
});

