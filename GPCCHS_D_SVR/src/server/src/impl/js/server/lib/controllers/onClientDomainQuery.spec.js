require('../utils/test');
const { decode } = require('../protobuf');
const { queryDomains } = require('./onClientDomainQuery');

describe('onConnectedDataOpen', () => {
  it('messageHandler error', () => {
    (() => queryDomains(
      { id: 'test' },
      {},
      (key, buffer, callback) => {
        callback(new Error());
      }
    )).should.throw(Error);
  });
  it('query domains', () => {
    queryDomains(
      { id: 'test' },
      {},
      (key, buffer, callback) => {
        key.should.be.an('string')
          .that.equal('dcPush');
        buffer.constructor.should.equal(Buffer);
        const message = decode('dc.dataControllerUtils.DcClientMessage', buffer);
        message.should.be.an('object')
          .that.have.property('messageType')
          .that.equal(3); // 'DOMAIN_QUERY'
        message.should.have.an.property('payload');
        const query = decode('dc.dataControllerUtils.DomainQuery', message.payload);
        query.should.be.an('object')
          .that.have.an.property('id');
        callback(null);
      }
    );
  });
});
