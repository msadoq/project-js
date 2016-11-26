require('../../../../utils/test');
const protobuf = require('../../../index');
const stubData = require('../../../../stubs/data');

describe('protobuf/dc/dataControllerUtils/header', () => {
  const fixture = stubData.getTimebasedQueryHeader();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('dc.dataControllerUtils.Header', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('dc.dataControllerUtils.Header', buffer);
    json.should.be.an('object').that.have.properties(fixture);
  });
});
