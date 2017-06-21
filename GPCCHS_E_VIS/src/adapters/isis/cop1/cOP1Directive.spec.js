// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./cOP1Directive');
const { getCOP1Directive } = require('../stubs');

const directiveIdentifier = require('./directiveIdentifier');

describe('protobuf/isis/cop1/COP1Directive', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/COP1Directive.proto`, { keepCase: true })
    .lookup('cop1.protobuf.COP1Directive');
  const fixture = getCOP1Directive();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      attribute: (typeof fixture.attribute === 'undefined')
        ? null
        : { type: 'double', symbol: fixture.attribute.toString() },
      id: { type: 'enum', value: fixture.id, symbol: directiveIdentifier[fixture.id] },
    });
    
    
  });
});
