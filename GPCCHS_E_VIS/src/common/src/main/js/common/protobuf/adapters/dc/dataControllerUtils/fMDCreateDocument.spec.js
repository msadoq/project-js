require('../../../../utils/test');
const protobuf = require('../../../index');
const stubData = require('../../../../stubs/data');

describe('protobuf/utils/dataControllerUtils/fMDCreateDocument', () => {
  const fixture = stubData.getFMDCreateDocument();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('dc.dataControllerUtils.FMDCreateDocument', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('dc.dataControllerUtils.FMDCreateDocument', buffer);
    json.should.be.an('object').that.have.properties(fixture);
  });
});
