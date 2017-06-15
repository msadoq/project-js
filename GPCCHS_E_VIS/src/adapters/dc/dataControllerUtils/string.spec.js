require('../../../../utils/test');
const protobuf = require('../../../index');
const stubData = require('../../../stubs/index');

describe('protobuf/utils/dataControllerUtils/string', () => {
  const fixture = stubData.getString();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('dc.dataControllerUtils.String', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('dc.dataControllerUtils.String', buffer);
    json.should.be.an('object').that.have.properties(fixture);
  });
});
