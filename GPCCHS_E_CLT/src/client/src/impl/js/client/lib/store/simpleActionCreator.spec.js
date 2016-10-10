/* eslint no-unused-expressions: 0 */
import simpleActionCreator from './simpleActionCreator';

describe('store:simpleActionCreator', () => {
  it('invalid type', () => {
    (() => simpleActionCreator()).should.throw();
  });
  it('no parameter', () => {
    const actionCreator = simpleActionCreator('myActionType');
    actionCreator().should.eql({
      type: 'myActionType',
      payload: {},
    });
  });
  it('a parameter', () => {
    const actionCreator = simpleActionCreator('myActionType', 'myParam');
    actionCreator('param1', 'param2').should.eql({
      type: 'myActionType',
      payload: {
        myParam: 'param1',
      },
    });
  });
  it('few parameters', () => {
    const actionCreator = simpleActionCreator('myActionType', 'myParam', 'myOther');
    actionCreator('param1', 'param2').should.eql({
      type: 'myActionType',
      payload: {
        myParam: 'param1',
        myOther: 'param2',
      },
    });
  });
  it('only expected parameters', () => {
    const actionCreator = simpleActionCreator('myActionType', 'myParam');
    actionCreator('param1', 'param2').should.eql({
      type: 'myActionType',
      payload: {
        myParam: 'param1',
      },
    });
  });
});
