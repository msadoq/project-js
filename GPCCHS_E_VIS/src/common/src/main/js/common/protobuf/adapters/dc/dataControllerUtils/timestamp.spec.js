require('../../../../utils/test');
const protobuf = require('../../../index');
const stubData = require('../../../../stubs/data');

describe('protobuf/utils/dataControllerUtils/timestamp', () => {
  const fixture = stubData.getTimestamp();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('dc.dataControllerUtils.Timestamp', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('dc.dataControllerUtils.Timestamp', buffer);
    json.should.be.an('object').that.have.properties(fixture);
  });
});
