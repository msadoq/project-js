// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 21/07/2017 : Modify querySingleton => pass queryId as a parameter
// VERSION : 1.1.2 : DM : #6700 : 21/07/2017 : Create registeredArchiveQueriesSingleton models ( and its test)
// END-HISTORY
// ====================================================================

const { add,
  get,
  pop,
  getAll,
  remove,
  clear } = require('./registeredArchiveQueriesSingleton');

describe('models/registeredArchiveQueriesSingleton', () => {
  beforeEach(() => clear());
  test('add/get', () => {
    const queryId = 'myQueryID';
    add(queryId, 'myTbdId', 'range');
    expect(get(queryId)).toMatchObject({ tbdId: 'myTbdId', type: 'range' });
  });
  test('pop', () => {
    const queryId1 = 'myQueryID1';
    const queryId2 = 'myQueryID2';
    add(queryId1, 'myTbdId1', 'range');
    add(queryId2, 'myTbdId2', 'last');
    const queryPoped = pop(queryId1);
    expect(queryPoped).toMatchObject({ tbdId: 'myTbdId1', type: 'range' });
    const expectedCollection = {};
    expectedCollection[queryId2] = { tbdId: 'myTbdId2', type: 'last' };
    expect(getAll()).toMatchObject(expectedCollection);
  });
  test('getAll', () => {
    const queryId1 = 'myQueryID1';
    const queryId2 = 'myQueryID2';
    add(queryId1, 'myTbdId1', 'range');
    add(queryId2, 'myTbdId2', 'last');
    const expectedCollection = {};
    expectedCollection[queryId1] = { tbdId: 'myTbdId1', type: 'range' };
    expectedCollection[queryId2] = { tbdId: 'myTbdId2', type: 'last' };
    expect(getAll()).toMatchObject(expectedCollection);
  });
  test('remove', () => {
    const queryId1 = 'myQueryID1';
    const queryId2 = 'myQueryID2';
    add(queryId1, 'myTbdId1', 'range');
    add(queryId2, 'myTbdId2', 'last');
    remove(queryId1);
    const expectedCollection = {};
    expectedCollection[queryId2] = { tbdId: 'myTbdId2', type: 'last' };
    expect(getAll()).toMatchObject(expectedCollection);
  });
  test('clear', () => {
    const queryId1 = 'myQueryID1';
    const queryId2 = 'myQueryID2';
    add(queryId1, 'myTbdId1', 'range');
    add(queryId2, 'myTbdId2', 'last');
    clear();
    expect(getAll()).toMatchObject({});
  });
});
