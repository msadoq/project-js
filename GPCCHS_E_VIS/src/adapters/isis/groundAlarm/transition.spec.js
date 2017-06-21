// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./transition');
const { getTransition } = require('../stubs');



describe('protobuf/isis/groundAlarm/Transition', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Transition.proto`, { keepCase: true })
    .lookup('groundAlarm.protobuf.Transition');
  const fixture = getTransition();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      onboardDate: { type: 'time', value: fixture.onboardDate },
      groundDate: { type: 'time', value: fixture.groundDate },
      convertedValue: { type: 'double', symbol: fixture.convertedValue.toString() },
      extractedValue: { type: 'double', symbol: fixture.extractedValue.toString() },
      rawValue: { type: 'double', symbol: fixture.rawValue.toString() },
      monitoringState: { type: 'string', value: fixture.monitoringState },
    });
    
    
  });
});
