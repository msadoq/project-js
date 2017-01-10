require('../../../../utils/test');
const protobuf = require('../../../index');
const stubData = require('../../../../stubs/data');

describe('protobuf/dc/dataControllerUtils/sendLog', () => {
  const fixture = stubData.getSendLog();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('dc.dataControllerUtils.SendLog', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('dc.dataControllerUtils.SendLog', buffer);
    json.should.be.an('object').that.have.properties({
      uid: fixture.uid,
    });
    json.should.have.a.property('arguments').that.is.an('array');
    for (let i = 0; i < fixture.arguments.length; i += 1) {
      json.arguments[i].should.have.properties({
        type: 'string',
        value: fixture.arguments[i],
      });
    }
  });
});
