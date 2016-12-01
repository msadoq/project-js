const { should } = require('../utils/test');
const registeredCallbacks = require('./register');

describe('utils/registeredCallbacks', () => {
  beforeEach(() => registeredCallbacks.clear());
  it('get/set', () => {
    registeredCallbacks.set('myId', () => true);
    registeredCallbacks.get('myId')().should.equal(true);
  });
  it('remove', () => {
    const myFunc = () => true;
    registeredCallbacks.set('myId', myFunc);
    const myFuncBackup = registeredCallbacks.get('myId');
    registeredCallbacks.remove('myId');
    should.not.exist(registeredCallbacks.get('myId'));
    myFuncBackup().should.equal(true);
  });
  it('set required parameters', () => {
    (() => registeredCallbacks.set()).should.throw(Error);
    (() => registeredCallbacks.set(true)).should.throw(Error);
    (() => registeredCallbacks.set('myId', true)).should.throw(Error);
  });
  it('get unknown', () => {
    should.not.exist(registeredCallbacks.get('myId'));
  });
  it('getAll', () => {
    registeredCallbacks.set('f1', () => 1);
    registeredCallbacks.set('f2', () => 2);
    const cbs = registeredCallbacks.getAll();
    cbs.f1().should.equal(1);
    cbs.f2().should.equal(2);
  });
  it('clear', () => {
    registeredCallbacks.set('myId', () => true);
    registeredCallbacks.clear();
    registeredCallbacks.getAll().should.eql({});
  });
});
