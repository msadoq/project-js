// Produced by Acceleo JavaScript Generator 1.1.0
require('../../../../utils/test');
const stubData = require('../../../../stubs/data');

const protobuf = require('../../../index');


describe('protobuf/lpisis/pusGroundModel/Pus011SyncPoint', () => {
  const fixture = stubData.getPus011SyncPoint();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.pusGroundModel.Pus011SyncPoint', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.pusGroundModel.Pus011SyncPoint', buffer);
    json.should.be.an('object').that.have.properties({
      apid: { type: 'uinteger', value: fixture.apid },
      modelIsEmpty: { type: 'boolean', value: fixture.modelIsEmpty },
      groundDate: { type: 'time', value: fixture.groundDate },
    });
  });
});

