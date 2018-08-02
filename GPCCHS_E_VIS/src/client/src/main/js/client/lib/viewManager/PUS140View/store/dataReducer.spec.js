import pus140DataReducer from 'viewManager/PUS140View/store/dataReducer';
import { INJECT_PUS_DATA } from '../../../store/types';

describe('viewManager/PUS140View/store/dataReducer', () => {
  it('should replace constants', () => {
    const state = {
      PUS140ViewData: {},
    };
    const action = {
      type: INJECT_PUS_DATA,
      payload: {
        viewId: 'PUS140View',
        data: {
          PUS140View: {
            foo: 'foo',
            bar: 'bar',
            pus140Parameter: [
              {
                baz: 'baz',
                lastUpdateModeCurrentValue: '1',
                lastUpdateModeParamId: '2',
              },
              {
                baz: 'baz',
                lastUpdateModeCurrentValue: '3',
                lastUpdateModeParamId: '4',
              },
            ],
          },
        },
      },
    };
    expect(pus140DataReducer(state, action)).toEqual({
      PUS140ViewData: {
        foo: 'foo',
        bar: 'bar',
        tables: {
          parameters: {
            data: [
              {
                baz: 'baz',
                lastUpdateModeCurrentValue: 'TC',
                lastUpdateModeParamId: 'TM',
              },
              {
                baz: 'baz',
                lastUpdateModeCurrentValue: 'Default',
                lastUpdateModeParamId: 'Timer',
              },
            ],
            keep: [0, 1],
          },
        },
      },
    });
  });
});
