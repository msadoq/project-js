const { add,
  get,
  pop,
  getAll,
  remove,
  clear } = require('./registeredArchiveQueriesSingleton');

describe('models/registeredArchiveQueriesSingleton', () => {
  beforeEach(() => clear());
  test('add/get', () => {
    const queryId = add('myTbdId', 'range');
    expect(get(queryId)).toMatchObject({ tbdId: 'myTbdId', type: 'range' });
  });
  test('pop', () => {
    const queryId1 = add('myTbdId1', 'range');
    const queryId2 = add('myTbdId2', 'last');
    const queryPoped = pop(queryId1);
    expect(queryPoped).toMatchObject({ tbdId: 'myTbdId1', type: 'range' });
    const expectedCollection = {};
    expectedCollection[queryId2] = { tbdId: 'myTbdId2', type: 'last' };
    expect(getAll()).toMatchObject(expectedCollection);
  });
  test('getAll', () => {
    const queryId1 = add('myTbdId1', 'range');
    const queryId2 = add('myTbdId2', 'last');
    const expectedCollection = {};
    expectedCollection[queryId1] = { tbdId: 'myTbdId1', type: 'range' };
    expectedCollection[queryId2] = { tbdId: 'myTbdId2', type: 'last' };
    expect(getAll()).toMatchObject(expectedCollection);
  });
  test('remove', () => {
    const queryId1 = add('myTbdId1', 'range');
    const queryId2 = add('myTbdId2', 'last');
    remove(queryId1);
    const expectedCollection = {};
    expectedCollection[queryId2] = { tbdId: 'myTbdId2', type: 'last' };
    expect(getAll()).toMatchObject(expectedCollection);
  });
  test('clear', () => {
    add('myTbdId1', 'range');
    add('myTbdId2', 'last');
    clear();
    expect(getAll()).toMatchObject({});
  });
});
