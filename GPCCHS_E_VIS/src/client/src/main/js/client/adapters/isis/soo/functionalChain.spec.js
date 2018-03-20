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
const adapter = require('./functionalChain');
const { getFunctionalChain } = require('../stubs');

const activityRequest = require('./activityRequest');

describe('protobuf/isis/soo/FunctionalChain', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/FunctionalChain.proto`, { keepCase: true })
    .lookup('soo.protobuf.FunctionalChain');
  const fixture = getFunctionalChain();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      name: { type: 'string', value: fixture.name },
      activity: { type: 'enum', value: fixture.activity, symbol: activityRequest[fixture.activity] },
      creationDate: { type: 'time', value: fixture.creationDate },
    });
    
    
  });
});
