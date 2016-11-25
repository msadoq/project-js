require('../../../../utils/test');
const protobuf = require('../../../index');
const stubData = require('../../../../stubs/data');

describe('protobuf/dc/dataControllerUtils/status', () => {
  const fixture = stubData.getSuccessStatus();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('dc.dataControllerUtils.Status', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('dc.dataControllerUtils.Status', buffer);
    json.should.be.an('object').that.have.properties(fixture);
  });
});
