require('../../../../utils/test');
const protobuf = require('../../../index');
const stubData = require('../../../../stubs/data');

describe('protobuf/lpisis/ccsds_mal/namedValue', () => {
  const fixture = stubData.getNamedValue();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.ccsds_mal.NamedValue', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.ccsds_mal.NamedValue', buffer);
    json.should.be.an('object').that.have.properties({
      name: {
        type: 'identifier',
        value: fixture.name,
      },
      value: {
        type: 'ulong',
        value: fixture.value,
      },
    });
  });
});
