// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./pus011TimeShift');
const { getPus011TimeShift } = require('../stubs');



describe('protobuf/isis/pusGroundModel/Pus011TimeShift', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus011TimeShift.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus011TimeShift');
  const fixture = getPus011TimeShift();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      applicationTime: { type: 'time', value: fixture.applicationTime },
      timeShiftOffset: { type: 'integer', value: fixture.timeShiftOffset },
    });
    
    
  });
});
