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
const adapter = require('./session');
const { getSession } = require('../stubs');

const activityRequest = require('./activityRequest');
const modeType = require('./modeType');

describe('protobuf/isis/soo/Session', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Session.proto`, { keepCase: true })
    .lookup('soo.protobuf.Session');
  const fixture = getSession();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      mode: { type: 'enum', value: fixture.mode, symbol: modeType[fixture.mode] },
      name: { type: 'string', value: fixture.name },
      activity: { type: 'enum', value: fixture.activity, symbol: activityRequest[fixture.activity] },
      creationDate: { type: 'time', value: fixture.creationDate },
    });
    
    json.functionalChains.should.be.an('array').that.have.lengthOf(fixture.functionalChains.length);
    for (let i = 0; i < fixture.functionalChains.length; i += 1) {
      json.functionalChains[i].should.have.properties({
        type: 'blob',
        value: fixture.functionalChains[i],
      });
    }
  });
});
