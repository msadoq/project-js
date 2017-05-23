require('../../../../utils/test');
const protobuf = require('../../../index');
const stubData = require('../../../../stubs/data');

describe('protobuf/utils/dataControllerUtils/sessionGetTime', () => {
  const fixture = stubData.getSessionGetTime();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('dc.dataControllerUtils.SessionGetTime', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('dc.dataControllerUtils.SessionGetTime', buffer);
    json.should.be.an('object').that.have.properties(fixture);
  });
});
