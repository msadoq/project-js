require('../../../../utils/test');
const protobuf = require('../../../index');
const stubData = require('../../../../stubs/data');

describe('protobuf/utils/dataControllerUtils/fMDDocumentProperty', () => {
  const fixture = stubData.getFMDDocumentProperty();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('dc.dataControllerUtils.FMDDocumentProperty', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('dc.dataControllerUtils.FMDDocumentProperty', buffer);
    json.should.be.an('object').that.have.properties(fixture);
  });
});
