require('../../utils/test');
const { decode } = require('../../protobuf');
const { domainQuery } = require('./onDomainQuery');
const { testPayloads, testHandler } = require('../../utils/test');

describe('onDomainQuery', () => {
  beforeEach(() => {
    testPayloads.length = 0;
  });
  it('domainQuery', () => {
    domainQuery({ id: 'test' }, {}, testHandler);

    testPayloads.should.be.an('array')
      .that.has.lengthOf(2);
    testPayloads[0].should.be.an('string').that.equal('dcPush');
    testPayloads[1].constructor.should.equal(Buffer);
    const message = decode('dc.dataControllerUtils.DcClientMessage', testPayloads[1]);
    message.should.be.an('object')
      .that.have.property('messageType')
      .that.equal('DOMAIN_QUERY');
    message.should.have.an.property('payload');
    const query = decode('dc.dataControllerUtils.DomainQuery', message.payload);
    query.should.be.an('object')
      .that.have.an.property('id');
  });
});
