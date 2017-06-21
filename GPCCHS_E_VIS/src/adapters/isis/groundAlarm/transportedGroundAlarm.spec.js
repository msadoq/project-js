// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./transportedGroundAlarm');
const { getTransportedGroundAlarm } = require('../stubs');



describe('protobuf/isis/groundAlarm/TransportedGroundAlarm', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/TransportedGroundAlarm.proto`, { keepCase: true })
    .lookup('groundAlarm.protobuf.TransportedGroundAlarm');
  const fixture = getTransportedGroundAlarm();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      hasAckRequest: { type: 'boolean', value: fixture.hasAckRequest },
      paramUid: { type: 'long', symbol: `${fixture.paramUid}` },
    });
    
    json.transitions.should.be.an('array').that.have.lengthOf(fixture.transitions.length);
    for (let i = 0; i < fixture.transitions.length; i += 1) {
      json.transitions[i].should.be.an('object').that.have.properties({
        onboardDate: { type: 'time', value: fixture.transitions[i].onboardDate },
        groundDate: { type: 'time', value: fixture.transitions[i].groundDate },
        convertedValue: { type: 'double', symbol: fixture.transitions[i].convertedValue.toString() },
        extractedValue: { type: 'double', symbol: fixture.transitions[i].extractedValue.toString() },
        rawValue: { type: 'double', symbol: fixture.transitions[i].rawValue.toString() },
        monitoringState: { type: 'string', value: fixture.transitions[i].monitoringState },
      });
      
    }
  });
});
