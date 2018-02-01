// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move serverProcess code one level upper
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Fix jest tests in serverProcess
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// END-HISTORY
// ====================================================================

const registeredQueries = require('./registeredQueries');

describe('models/registeredQueries', () => {
  beforeEach(() => registeredQueries.cleanup());
  test('getByQueryId/addRecord', () => {
    registeredQueries.addRecord('myId', 'myRemoteId');
    expect(registeredQueries.getByQueryId('myId')).toBe('myRemoteId');
  });
  test('removeByQueryId', () => {
    registeredQueries.addRecord('myId', 'myRemoteId');
    const myRemoteId = registeredQueries.getByQueryId('myId');
    registeredQueries.removeByQueryId('myId');
    expect(registeredQueries.getByQueryId('myId')).toBeFalsy();
    expect(myRemoteId).toBe('myRemoteId');
  });
  test('removeMultiQueryIds', () => {
    registeredQueries.addRecord('myId', 'myRemoteId');
    registeredQueries.addRecord('myId2', 'myRemoteId2');
    const myRemoteId = registeredQueries.getByQueryId('myId');
    const myRemoteId2 = registeredQueries.getByQueryId('myId2');
    registeredQueries.removeMultiQueryIds(['myId', 'myId2']);
    expect(registeredQueries.getByQueryId('myId')).toBeFalsy();
    expect(registeredQueries.getByQueryId('myId2')).toBeFalsy();
    expect(myRemoteId).toBe('myRemoteId');
    expect(myRemoteId2).toBe('myRemoteId2');
  });
  test('addRecord required parameters', () => {
    expect(() => registeredQueries.addRecord()).toThrowError(Error);
    expect(() => registeredQueries.addRecord(true)).toThrowError(Error);
    expect(() => registeredQueries.addRecord('myId', true)).toThrowError(Error);
  });
  test('getByQueryId unknown', () => {
    expect(registeredQueries.getByQueryId('myId')).toBeFalsy();
  });
  test('getAll', () => {
    registeredQueries.addRecord('id1', 'remoteId1');
    registeredQueries.addRecord('id2', 'remoteId2');
    const ids = registeredQueries.getAll();
    expect(ids).toEqual(expect.arrayContaining([
      expect.objectContaining({ queryId: 'id1', flatDataId: 'remoteId1' }),
      expect.objectContaining({ queryId: 'id2', flatDataId: 'remoteId2' }),
    ]));
  });
  test('cleanup', () => {
    registeredQueries.addRecord('myId', 'myRemoteId');
    registeredQueries.cleanup();
    expect(registeredQueries.getAll()).toEqual([]);
  });
});
