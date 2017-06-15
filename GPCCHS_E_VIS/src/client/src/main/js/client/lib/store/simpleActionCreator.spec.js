/* eslint no-unused-expressions: 0 */
import simpleActionCreator from './simpleActionCreator';

describe('store:simpleActionCreator', () => {
  test('invalid type', () => {
    expect(() => simpleActionCreator()).toThrowError();
  });
  test('no parameter', () => {
    const actionCreator = simpleActionCreator('myActionType');
    expect(actionCreator()).toEqual({
      type: 'myActionType',
      payload: {},
    });
  });
  test('a parameter', () => {
    const actionCreator = simpleActionCreator('myActionType', 'myParam');
    expect(actionCreator('param1', 'param2')).toEqual({
      type: 'myActionType',
      payload: {
        myParam: 'param1',
      },
    });
  });
  test('few parameters', () => {
    const actionCreator = simpleActionCreator('myActionType', 'myParam', 'myOther');
    expect(actionCreator('param1', 'param2')).toEqual({
      type: 'myActionType',
      payload: {
        myParam: 'param1',
        myOther: 'param2',
      },
    });
  });
  test('take functions', () => {
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
  test('only expected parameters', () => {
    const actionCreator = simpleActionCreator('myActionType', 'myParam');
    expect(actionCreator('param1', 'param2', () => {})).toEqual({
      type: 'myActionType',
      payload: {
        myParam: 'param1',
      },
    });
  });
});
