// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./ack');
const { getAck } = require('../stubs');



describe('protobuf/isis/ackRequest/Ack', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Ack.proto`, { keepCase: true })
    .lookup('ackRequest.protobuf.Ack');
  const fixture = getAck();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      ackDate: { type: 'time', value: fixture.ackDate },
      acknowledger: {
        login: { type: 'string', value: fixture.acknowledger.login },
        password: { type: 'string', value: fixture.acknowledger.password },
        profile: { type: 'string', value: fixture.acknowledger.profile },
        userTime: { type: 'time', value: fixture.acknowledger.userTime },
      },
    });
    
    
  });
});
