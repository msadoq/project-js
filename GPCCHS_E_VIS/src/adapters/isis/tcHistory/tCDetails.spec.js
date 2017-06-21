// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./tCDetails');
const { getTCDetails } = require('../stubs');

const tCDetailType = require('./tCDetailType');

describe('protobuf/isis/tcHistory/TCDetails', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/TCDetails.proto`, { keepCase: true })
    .lookup('tcHistory.protobuf.TCDetails');
  const fixture = getTCDetails();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      tcDetailType: { type: 'enum', value: fixture.tcDetailType, symbol: tCDetailType[fixture.tcDetailType] },
      value: (typeof fixture.value === 'undefined')
        ? null
        : { type: 'double', symbol: fixture.value.toString() },
      valueIsRaw: (typeof fixture.valueIsRaw === 'undefined')
        ? null
        : { type: 'boolean', value: fixture.valueIsRaw },
      apId: (typeof fixture.apId === 'undefined')
        ? null
        : { type: 'uinteger', value: fixture.apId },
      sourceId: (typeof fixture.sourceId === 'undefined')
        ? null
        : { type: 'uinteger', value: fixture.sourceId },
      sequenceCount: (typeof fixture.sequenceCount === 'undefined')
        ? null
        : { type: 'uinteger', value: fixture.sequenceCount },
      serviceType: (typeof fixture.serviceType === 'undefined')
        ? null
        : { type: 'uinteger', value: fixture.serviceType },
      serviceSubType: (typeof fixture.serviceSubType === 'undefined')
        ? null
        : { type: 'uinteger', value: fixture.serviceSubType },
      rawPacket: (typeof fixture.rawPacket === 'undefined')
        ? null
        : { type: 'blob', value: fixture.rawPacket },
    });
    
    json.argumentIds.should.be.an('array').that.have.lengthOf(fixture.argumentIds.length);
    for (let i = 0; i < fixture.argumentIds.length; i += 1) {
      json.argumentIds[i].should.have.properties({
        type: 'identifier',
        value: fixture.argumentIds[i],
      });
    }
  });
});
