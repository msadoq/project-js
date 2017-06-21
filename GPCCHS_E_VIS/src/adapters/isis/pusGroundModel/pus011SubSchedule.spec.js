// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./pus011SubSchedule');
const { getPus011SubSchedule } = require('../stubs');



describe('protobuf/isis/pusGroundModel/Pus011SubSchedule', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus011SubSchedule.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus011SubSchedule');
  const fixture = getPus011SubSchedule();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      ssId: { type: 'uinteger', value: fixture.ssId },
      status: { type: 'uinteger', value: fixture.status },
      executionTimeFirstTc: { type: 'ulong', symbol: `${fixture.executionTimeFirstTc}` },
      apid: { type: 'uinteger', value: fixture.apid },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: fixture.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: fixture.pusElement.lastUpdateTime },
      },
      groundDate: { type: 'time', value: fixture.groundDate },
      ssIdLabel: { type: 'string', value: fixture.ssIdLabel },
    });
    
    
  });
});
