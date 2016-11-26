require('../../../../utils/test');
const protobuf = require('../../../index');
const stubData = require('../../../../stubs/data');

describe('protobuf/dc/dataControllerUtils/boolean', () => {
  const fixture = stubData.getBoolean();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('dc.dataControllerUtils.Boolean', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('dc.dataControllerUtils.Boolean', buffer);
    json.should.be.an('object').that.have.properties(fixture);
  });
});
