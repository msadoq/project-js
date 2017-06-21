// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./pus011SyncPoint');
const { getPus011SyncPoint } = require('../stubs');



describe('protobuf/isis/pusGroundModel/Pus011SyncPoint', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus011SyncPoint.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus011SyncPoint');
  const fixture = getPus011SyncPoint();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      apid: { type: 'uinteger', value: fixture.apid },
      modelIsEmpty: { type: 'boolean', value: fixture.modelIsEmpty },
      groundDate: { type: 'time', value: fixture.groundDate },
    });
    
    
  });
});
