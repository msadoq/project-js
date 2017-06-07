/* eslint no-unused-expressions: 0 */
import simpleActionCreator from './simpleActionCreator';

describe('store:simpleActionCreator', () => {
  it('invalid type', () => {
    expect(() => simpleActionCreator()).toThrowError();
  });
  it('no parameter', () => {
    const actionCreator = simpleActionCreator('myActionType');
    expect(actionCreator()).toEqual({
      type: 'myActionType',
      payload: {},
    });
  });
  it('a parameter', () => {
    const actionCreator = simpleActionCreator('myActionType', 'myParam');
    expect(actionCreator('param1', 'param2')).toEqual({
      type: 'myActionType',
      payload: {
        myParam: 'param1',
      },
    });
  });
  it('few parameters', () => {
    const actionCreator = simpleActionCreator('myActionType', 'myParam', 'myOther');
    expect(actionCreator('param1', 'param2')).toEqual({
      type: 'myActionType',
      payload: {
        myParam: 'param1',
        myOther: 'param2',
      },
    });
  });
  it('take functions', () => {
    const actionCreator = simpleActionCreator(
      'myActionType',
      param => ({ myParam: `concatened ${param}` }),
      param => ({ myOther: `other concatened ${param}` })
    );
    expect(actionCreator('param1', 'param2')).toEqual({
      type: 'myActionType',
      payload: {
        myParam: 'concatened param1',
        myOther: 'other concatened param2',
      },
    });
  });
  it('only expected parameters', () => {
    const actionCreator = simpleActionCreator('myActionType', 'myParam');
    expect(actionCreator('param1', 'param2', () => {})).toEqual({
      type: 'myActionType',
      payload: {
        myParam: 'param1',
      },
    });
  });
});
