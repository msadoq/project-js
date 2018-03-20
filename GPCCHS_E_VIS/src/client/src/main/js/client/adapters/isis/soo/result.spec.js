// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./result');
const { getResult } = require('../stubs');



describe('protobuf/isis/soo/Result', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Result.proto`, { keepCase: true })
    .lookup('soo.protobuf.Result');
  const fixture = getResult();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      confirmationStatus: { type: 'string', value: fixture.confirmationStatus },
      duration: { type: 'duration', value: fixture.duration },
      executionStatus: { type: 'string', value: fixture.executionStatus },
      detailedStatus: { type: 'string', value: fixture.detailedStatus },
      exceptionDetails: { type: 'string', value: fixture.exceptionDetails },
      startDatetime: { type: 'time', value: fixture.startDatetime },
      endDatetime: { type: 'time', value: fixture.endDatetime },
    });
    
    
  });
});
