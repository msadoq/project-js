import callbacks from './';

describe('common/callbacks', () => {
  beforeEach(() => callbacks.clear());
  test('get/set', () => {
    callbacks.set('myId', () => true);
    expect(callbacks.get('myId')()).toBe(true);
  });
  test('remove', () => {
    const myFunc = () => true;
    callbacks.set('myId', myFunc);
    const myFuncBackup = callbacks.get('myId');
    callbacks.remove('myId');
    expect(callbacks.get('myId')).toBeFalsy();
    expect(myFuncBackup()).toBe(true);
  });
  test('set required parameters', () => {
    expect(() => callbacks.set()).toThrowError(Error);
    expect(() => callbacks.set(true)).toThrowError(Error);
    expect(() => callbacks.set('myId', true)).toThrowError(Error);
  });
  test('get unknown', () => {
    expect(callbacks.get('myId')).toBeFalsy();
  });
  test('getAll', () => {
    callbacks.set('f1', () => 1);
    callbacks.set('f2', () => 2);
    const cbs = callbacks.getAll();
    expect(cbs.f1()).toBe(1);
    expect(cbs.f2()).toBe(2);
  });
  test('pop', () => {
    callbacks.set('myId', () => true);
    callbacks.set('myOtherId', () => true);
    expect(callbacks.pop('myId')()).toBe(true);
    expect(typeof callbacks.getAll()).toBe('object');
    expect(callbacks.getAll()).not.toHaveProperty('myId');
    expect(callbacks.getAll()).toHaveProperty('myOtherId');
  });
  test('clear', () => {
    callbacks.set('myId', () => true);
    callbacks.clear();
    expect(callbacks.getAll()).toEqual({});
  });
});
