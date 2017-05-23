require('../../../../utils/test');
const protobuf = require('../../../index');
const stubData = require('../.././index');

describe('protobuf/utils/dataControllerUtils/domains', () => {
  const fixture = stubData.getDomains();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('dc.dataControllerUtils.Domains', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('dc.dataControllerUtils.Domains', buffer);
    json.should.be.an('object').that.have.properties(fixture);
  });
});
