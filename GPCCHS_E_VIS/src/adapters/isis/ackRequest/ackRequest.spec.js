// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
require('../../../utils/test');
const stubData = require('../stubs');

const protobuf = require('../../../protobuf');

const { decodeRaw } = require('../types');



describe('protobuf/isis/ackRequest/AckRequest', () => {
  const fixture = stubData.getAckRequest();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('isis.ackRequest.AckRequest', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('isis.ackRequest.AckRequest', buffer);
    json.should.be.an('object').that.have.properties({
      ackRequestDate: { type: 'time', value: fixture.ackRequestDate },
      systemDate: { type: 'time', value: fixture.systemDate },
      ack: (typeof fixture.ack === 'undefined') 
        ? null 
        : {
          ackDate: { type: 'time', value: fixture.ack.ackDate },
        },
      comment: { type: 'string', value: fixture.comment },
    });
    decodeRaw(json.ack.acknowledger).should.be.an('object').that.have.properties({
      login: { type: 'string', value: fixture.ack.acknowledger.login },
      password: { type: 'string', value: fixture.ack.acknowledger.password },
      profile: { type: 'string', value: fixture.ack.acknowledger.profile },
      userTime: { type: 'time', value: fixture.ack.acknowledger.userTime },
    });
    
    
    
  });
});

