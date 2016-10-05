require('../../utils/test');
const { sendDomainData } = require('./onDomainData');
const { getDomain, getDomainResponseProtobuf } = require('../../stubs/data');
const TestWebSocket = require('../../stubs/testWebSocket');

const testWebsocket = new TestWebSocket();
testWebsocket.init();
const spark = testWebsocket.getSpark();

describe('onDomainData', () => {
  beforeEach(() => {
    spark.resetMessage();
  });

  it('one domain', () => {
    const myDomain = getDomain();
    const domainResponse = {
      id: 'myQueryId',
      domains: [
        myDomain,
      ],
    };
    const domainProto = getDomainResponseProtobuf(domainResponse);
    sendDomainData(spark, domainProto);
    const domains = spark.getMessage();
    domains.should.be.an('object');
    domains.should.have.an.property('event')
      .that.equal('domainResponse');
    domains.should.have.an.property('payload')
      .that.is.an('array')
      .that.have.lengthOf(1);
    domains.payload[0].should.be.an('object')
      .that.has.properties(domainResponse.domains[0]);
  });
});
