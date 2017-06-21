// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./rawData');
const { getRawData } = require('../stubs');

const securityStatus = require('./securityStatus');

describe('protobuf/isis/rawData/RawData', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/RawData.proto`, { keepCase: true })
    .lookup('rawData.protobuf.RawData');
  const fixture = getRawData();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      rawData: { type: 'blob', value: fixture.rawData },
      securityStatus: { type: 'enum', value: fixture.securityStatus, symbol: securityStatus[fixture.securityStatus] },
    });
    
    
  });
});
