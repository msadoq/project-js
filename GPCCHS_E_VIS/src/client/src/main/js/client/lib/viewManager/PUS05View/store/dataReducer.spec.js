import pus05DataReducer from 'viewManager/PUS05View/store/dataReducer';
import { INJECT_PUS_DATA } from '../../../store/types';

describe('viewManager/PUS05View/store/dataReducer', () => {
  it('should replace constants', () => {
    const state = {
      PUS05ViewData: {},
    };
    const action = {
      type: INJECT_PUS_DATA,
      payload: {
        viewId: 'PUS05View',
        data: {
          PUS05View: {
            foo: 'foo',
            pus005OnBoardEvent: [
              {
                baz: 'baz',
                onBoardStatus: 1,
                defaultOnBoardStatus: 1,
                lastUpdateModeRid: 1,
                lastUpdateModeOnBoardStatus: 1,
                lastUpdateModeAlarmLevel: 1,

              },
              {
                baz: 'baz',
                onBoardStatus: 2,
                defaultOnBoardStatus: 2,
                lastUpdateModeRid: 2,
                lastUpdateModeOnBoardStatus: 2,
                lastUpdateModeAlarmLevel: 2,
              },
            ],
            pus005ReceivedOnBoardEvent: [
              {
                baz: 'baz1',
                parameter: [
                  {
                    name: 'name1',
                    value: 'value',
                  },
                  {
                    name: 'name2',
                    value: 'value',
                  },
                  {
                    name: 'name3',
                    value: 'value',
                  },
                  {
                    name: 'name4',
                    value: 'value',
                  },
                  {
                    name: 'name5',
                    value: 'value',
                  },
                  {
                    name: 'name6',
                    value: 'value',
                  },
                  {
                    name: 'name7',
                    value: 'value',
                  },
                  {
                    name: 'name8',
                    value: 'value',
                  },
                  {
                    name: 'name9',
                    value: 'value',
                  },
                  {
                    name: 'name10',
                    value: 'value',
                  },
                  {
                    name: 'name11',
                    value: 'value',
                  },
                  {
                    name: 'name12',
                    value: 'value',
                  },
                ],
              },
              {
                baz: 'baz2',
                parameter: [
                  {
                    name: 'name1',
                    value: 'value',
                  },
                  {
                    name: 'name2',
                    value: 'value',
                  },
                  {
                    name: 'name3',
                    value: 'value',
                  },
                  {
                    name: 'name4',
                    value: 'value',
                  },
                  {
                    name: 'name5',
                    value: 'value',
                  },
                  {
                    name: 'name6',
                    value: 'value',
                  },
                  {
                    name: 'name7',
                    value: 'value',
                  },
                  {
                    name: 'name8',
                    value: 'value',
                  },
                  {
                    name: 'name9',
                    value: 'value',
                  },
                  {
                    name: 'name10',
                    value: 'value',
                  },
                  {
                    name: 'name11',
                    value: 'value',
                  },
                  {
                    name: 'name12',
                    value: 'value',
                  },
                ],
              },
            ],
          },
        },
      },
    };
    expect(pus05DataReducer(state, action)).toEqual({
      PUS05ViewData: {
        foo: 'foo',
        tables: {
          onBoardEvents: {
            data: [
              {
                baz: 'baz',
                onBoardStatus: 'DISABLED',
                defaultOnBoardStatus: 'DISABLED',
                lastUpdateModeRid: 'TC',
                lastUpdateModeOnBoardStatus: 'TC',
                lastUpdateModeAlarmLevel: 'TC',
              },
              {
                baz: 'baz',
                onBoardStatus: 'ENABLED',
                defaultOnBoardStatus: 'ENABLED',
                lastUpdateModeRid: 'TM',
                lastUpdateModeOnBoardStatus: 'TM',
                lastUpdateModeAlarmLevel: 'TM',
              },
            ],
            keep: [0, 1],
          },
          received: {
            data: [
              {
                baz: 'baz1',
                name1: 'name1',
                value1: 'value',
                name2: 'name2',
                value2: 'value',
                name3: 'name3',
                value3: 'value',
                name4: 'name4',
                value4: 'value',
                name5: 'name5',
                value5: 'value',
                name6: 'name6',
                value6: 'value',
                name7: 'name7',
                value7: 'value',
                name8: 'name8',
                value8: 'value',
                name9: 'name9',
                value9: 'value',
                name10: 'name10',
                value10: 'value',
              },
              {
                baz: 'baz2',
                name1: 'name1',
                value1: 'value',
                name2: 'name2',
                value2: 'value',
                name3: 'name3',
                value3: 'value',
                name4: 'name4',
                value4: 'value',
                name5: 'name5',
                value5: 'value',
                name6: 'name6',
                value6: 'value',
                name7: 'name7',
                value7: 'value',
                name8: 'name8',
                value8: 'value',
                name9: 'name9',
                value9: 'value',
                name10: 'name10',
                value10: 'value',
              },
            ],
            keep: [0, 1],
          },
        },
      },
    });
  });
});
