const { should } = require('../../common/test');
const callbacks = require('./');

describe('utils/callbacks', () => {
  beforeEach(() => callbacks.clear());
  it('get/set', () => {
    callbacks.set('myId', () => true);
    callbacks.get('myId')().should.equal(true);
  });
  it('remove', () => {
    const myFunc = () => true;
    callbacks.set('myId', myFunc);
    const myFuncBackup = callbacks.get('myId');
    callbacks.remove('myId');
    should.not.exist(callbacks.get('myId'));
    myFuncBackup().should.equal(true);
  });
  it('set required parameters', () => {
    (() => callbacks.set()).should.throw(Error);
    (() => callbacks.set(true)).should.throw(Error);
    (() => callbacks.set('myId', true)).should.throw(Error);
  });
  it('get unknown', () => {
    should.not.exist(callbacks.get('myId'));
  });
  it('getAll', () => {
    callbacks.set('f1', () => 1);
    callbacks.set('f2', () => 2);
    const cbs = callbacks.getAll();
    cbs.f1().should.equal(1);
    cbs.f2().should.equal(2);
  });
  it('pop', () => {
    callbacks.set('myId', () => true);
    callbacks.set('myOtherId', () => true);
    callbacks.pop('myId')().should.equal(true);
    callbacks.getAll().should.be.an('object');
    callbacks.getAll().should.has.not.property('myId');
    callbacks.getAll().should.has.property('myOtherId');
  });
  it('clear', () => {
    callbacks.set('myId', () => true);
    callbacks.clear();
    callbacks.getAll().should.eql({});
  });
});
