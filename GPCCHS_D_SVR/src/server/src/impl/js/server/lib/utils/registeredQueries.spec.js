const { should } = require('./test');
const registeredQueries = require('./registeredQueries');

describe('utils/registeredQueries', () => {
  beforeEach(() => registeredQueries.clear());
  it('get/set', () => {
    registeredQueries.set('myId', 'myRemoteId');
    registeredQueries.get('myId').should.equal('myRemoteId');
  });
  it('remove', () => {
    registeredQueries.set('myId', 'myRemoteId');
    const myRemoteId = registeredQueries.get('myId');
    registeredQueries.remove('myId');
    should.not.exist(registeredQueries.get('myId'));
    myRemoteId.should.equal('myRemoteId');
  });
  it('set required parameters', () => {
    (() => registeredQueries.set()).should.throw(Error);
    (() => registeredQueries.set(true)).should.throw(Error);
    (() => registeredQueries.set('myId', true)).should.throw(Error);
  });
  it('get unknown', () => {
    should.not.exist(registeredQueries.get('myId'));
  });
  it('getAll', () => {
    registeredQueries.set('id1', 'remoteId1');
    registeredQueries.set('id2', 'remoteId2');
    const ids = registeredQueries.getAll();
    ids.id1.should.equal('remoteId1');
    ids.id2.should.equal('remoteId2');
  });
  it('clear', () => {
    registeredQueries.set('myId', 'myRemoteId');
    registeredQueries.clear();
    registeredQueries.getAll().should.eql({});
  });
});
