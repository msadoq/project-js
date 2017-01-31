const { should } = require('../utils/test');
const registeredQueries = require('./registeredQueries');

describe('models/registeredQueries', () => {
  beforeEach(() => registeredQueries.cleanup());
  it('getByQueryId/addRecord', () => {
    registeredQueries.addRecord('myId', 'myRemoteId');
    registeredQueries.getByQueryId('myId').should.equal('myRemoteId');
  });
  it('removeByQueryId', () => {
    registeredQueries.addRecord('myId', 'myRemoteId');
    const myRemoteId = registeredQueries.getByQueryId('myId');
    registeredQueries.removeByQueryId('myId');
    should.not.exist(registeredQueries.getByQueryId('myId'));
    myRemoteId.should.equal('myRemoteId');
  });
  it('removeMultiQueryIds', () => {
    registeredQueries.addRecord('myId', 'myRemoteId');
    registeredQueries.addRecord('myId2', 'myRemoteId2');
    const myRemoteId = registeredQueries.getByQueryId('myId');
    const myRemoteId2 = registeredQueries.getByQueryId('myId2');
    registeredQueries.removeMultiQueryIds(['myId', 'myId2']);
    should.not.exist(registeredQueries.getByQueryId('myId'));
    should.not.exist(registeredQueries.getByQueryId('myId2'));
    myRemoteId.should.equal('myRemoteId');
    myRemoteId2.should.equal('myRemoteId2');
  });
  it('addRecord required parameters', () => {
    (() => registeredQueries.addRecord()).should.throw(Error);
    (() => registeredQueries.addRecord(true)).should.throw(Error);
    (() => registeredQueries.addRecord('myId', true)).should.throw(Error);
  });
  it('getByQueryId unknown', () => {
    should.not.exist(registeredQueries.getByQueryId('myId'));
  });
  it('getAll', () => {
    registeredQueries.addRecord('id1', 'remoteId1');
    registeredQueries.addRecord('id2', 'remoteId2');
    const ids = registeredQueries.getAll();
    ids.should.have.properties([
      { queryId: 'id1', remoteId: 'remoteId1' },
      { queryId: 'id2', remoteId: 'remoteId2' },
    ]);
  });
  it('cleanup', () => {
    registeredQueries.addRecord('myId', 'myRemoteId');
    registeredQueries.cleanup();
    registeredQueries.getAll().should.eql([]);
  });
});
