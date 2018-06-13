// ====================================================================
// HISTORY
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./status');
const { getStatus } = require('../stubs');

const operationStatus = require('./operationStatus');

describe('protobuf/isis/soo/Status', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Status.proto`, { keepCase: true })
    .lookup('soo.protobuf.Status');
  const fixture = getStatus();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      operationStatus: { type: 'enum', value: fixture.operationStatus, symbol: operationStatus[fixture.operationStatus] },
      occurenceDate: { type: 'time', value: fixture.occurenceDate },
    });
    
    
  });
});
