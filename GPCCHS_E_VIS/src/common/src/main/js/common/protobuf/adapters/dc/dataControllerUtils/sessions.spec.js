require('../../../../utils/test');
const protobuf = require('../../../index');
const stubData = require('../../../../stubs/data');

describe('protobuf/utils/dataControllerUtils/sessions', () => {
  const fixture = stubData.getSessions();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('dc.dataControllerUtils.Sessions', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('dc.dataControllerUtils.Sessions', buffer);
    json.should.be.an('object').that.have.properties(fixture);
  });
});
