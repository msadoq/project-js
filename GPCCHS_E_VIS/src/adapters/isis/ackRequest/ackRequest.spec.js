// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./ackRequest');
const { getAckRequest } = require('../stubs');



describe('protobuf/isis/ackRequest/AckRequest', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/AckRequest.proto`, { keepCase: true })
    .lookup('ackRequest.protobuf.AckRequest');
  const fixture = getAckRequest();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
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
