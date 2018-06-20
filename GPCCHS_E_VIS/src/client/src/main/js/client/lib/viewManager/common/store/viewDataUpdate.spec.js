// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 22/03/2017 : Update viewData organization for last structure +
//  cleaning
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : converts long to string to ensure precision
// VERSION : 1.1.2 : DM : #5828 : 05/04/2017 : Fix crash when a common EP has an invalid field
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of
//  tests
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : DM : #7111 : 03/07/2017 : Add config parameter VISU_WINDOW_MAX_DURATION to
//  limit visuWindow per view
// VERSION : 2.0.0 : FA : ISIS-FT-2309 : 31/01/2018 : surveillance du monitoringState pour
//  parametres TM VIMA
// END-HISTORY
// ====================================================================

import {
  viewDataUpdate,
  selectDataPerView,
  viewObsoleteEventAdd,
  isLastDataObsolete,
} from './viewDataUpdate';

describe('viewManager', () => {
  describe('viewManager :: common', () => {
    describe('viewManager :: common :: viewDataUpdate', () => {
      describe('viewManager :: common :: viewDataUpdate :: Update', () => {
        test('should ignore payloads', () => {
          const frozen = Object.freeze({ index: {}, values: {} });
          expect(viewDataUpdate(frozen, {})).toEqual(frozen);
        });
        test('should add', () => {
          const frozen = Object.freeze({ index: {}, values: {} });
          expect(
            viewDataUpdate(frozen, { index: { myEntryPoint: 15 }, values: { myEntryPoint: 300 } })
          ).toEqual({
            index: { myEntryPoint: 15 },
            values: { myEntryPoint: 300 },
            obsoleteEvents: {},
          });
        });
        test('should update', () => {
          const state = Object.freeze({
            index: { myEntryPoint: '10' },
            values: { myEntryPoint: 150 },
            obsoleteEvents: {},
          });
          expect(
            viewDataUpdate(state, { index: { myEntryPoint: 20 }, values: { myEntryPoint: 300 } })
          ).toEqual({
            index: { myEntryPoint: 20 },
            values: { myEntryPoint: 300 },
            obsoleteEvents: {},
          });
        });
        test('should preserve other values', () => {
          const state = Object.freeze({
            index: { myEntryPoint: 10, myOther: 20 },
            values: { myEntryPoint: 150, myOther: 200 },
            obsoleteEvents: {},
          });
          expect(
            viewDataUpdate(state, { index: { myEntryPoint: 20 }, values: { myEntryPoint: 300 } })
          ).toEqual({
            index: { myEntryPoint: 20, myOther: 20 },
            values: { myEntryPoint: 300, myOther: 200 },
            obsoleteEvents: {},
          });
        });
      });
      describe('viewManager :: common :: viewDataUpdate :: selectDataPerView', () => {
        const payload = { rId1: {}, rId2: {} };
        for (let j = 10; j < 21; j += 1) {
          payload.rId1[j] = {
            val1: { type: 'uinteger', value: (j * 10) + 1 },
            val2: { type: 'uinteger', value: (j * 10) + 2 },
            val3: { type: 'uinteger', value: (j * 10) + 3 },
            val4: { type: 'enum', value: j - 10, symbol: 'val'.concat(j - 10) },
            referenceTimestamp: { type: 'time', value: j },
            time: { type: 'time', value: j },
            monitoringState: { type: 'uinteger', value: 'ok' },
          };

          payload.rId2[j] = payload.rId1[j];
        }

        const viewDataMap = {
          text1: {
            type: 'common',
            entryPoints: {
              ep4: {
                tbdId: 'rId1',
                field: 'val3',
                localId: 'localrId1',
                offset: 0,
                stateColors: [
                  {
                    color: '#0000FF',
                    condition: {
                      field: 'val3',
                      operator: '>',
                      operand: '1',
                    },
                  },
                ],
              },
              ep7: {
                tbdId: 'rId2',
                field: 'val4',
                offset: 0,
                localId: 'localrId2',
              },
            },
          },
          text2: {
            type: 'common',
            entryPoints: {
              ep5: {
                tbdId: 'rId1',
                field: 'valInvalid',
                offset: 0,
                localId: 'localEp5',
              },
              ep4: {
                tbdId: 'rId1',
                field: 'val3',
                localId: 'localrId1',
                offset: 0,
                stateColors: [
                  {
                    color: '#0000FF',
                    condition: {
                      field: 'val3',
                      operator: '>',
                      operand: '1',
                    },
                  },
                ],
              },
            },
          },
          dynamic: {
            type: 'DynamicView',
            entryPoints: {
              dynamicEP: {
                tbdId: 'rId1',
                decommutedValues: [{ name: 'val1' }, { name: 'val2' }],
                offset: 0,
                localId: 'localEpDyn',
              },
            },
          },
        };
        const expectedIntervals = {
          rId1: {
            localrId1: { expectedInterval: [10, 20] },
            localEp5: { expectedInterval: [18, 20] },
            localEpDyn: { expectedInterval: [18, 20] },
          },
          rId2: {
            localrId2: { expectedInterval: [10, 13] },
            localEp6: { expectedInterval: [12, 20] },
          },
        };
        test('state undefined', () => {
          const data =
            selectDataPerView(viewDataMap.text1,
              expectedIntervals,
              payload,
              { index: {}, values: {} }
            );
          expect(data.index.ep4).toEqual(20);
          expect(data.index.ep7).toEqual(13);
          expect(data.values.ep4.value).toEqual(203);
          expect(data.values.ep7.value).toEqual('val3');
        });
        test('state with value > current', () => {
          const oldState = { index: {}, values: {} };
          oldState.index.ep4 = 22;
          oldState.values.ep4 = 22;
          const data = selectDataPerView(viewDataMap.text1, expectedIntervals, payload, oldState);
          expect(data.index.ep4).toEqual(20);
          expect(data.index.ep7).toEqual(13);
          expect(data.values.ep4.value).toEqual(203);
          expect(data.values.ep7.value).toEqual('val3');
        });
        test('state with value < current', () => {
          const oldState = { index: {}, values: {} };
          oldState.index.ep4 = 18.5;
          oldState.values.ep4 = 22;
          const data = selectDataPerView(viewDataMap.text1, expectedIntervals, payload, oldState);
          expect(data.index.ep4).toEqual(20);
          expect(data.index.ep7).toEqual(13);
          expect(data.values.ep4.value).toEqual(203);
          expect(data.values.ep7.value).toEqual('val3');
        });
        test('state with value = current', () => {
          const oldState = { index: {}, values: {} };
          oldState.index.ep4 = 20;
          oldState.values.ep4 = 22;
          const data = selectDataPerView(viewDataMap.text1, expectedIntervals, payload, oldState);
          expect(data.index.ep4).toEqual(20);
          expect(data.index.ep7).toEqual(13);
          expect(data.values.ep4.value).toEqual(203);
          expect(data.values.ep7.value).toEqual('val3');
        });
        test('DataMap with invalid entry point field', () => {
          const oldState = { index: { ep4: 18 }, values: { ep4: { value: 201, color: '#0000FF' } } };
          const data = selectDataPerView(viewDataMap.text2, expectedIntervals, payload, oldState);
          expect(data.index).toEqual({ ep4: 20 });
          expect(data.values).toEqual({
            ep4: {
              value: 203,
              color: null,
              isDataObsolete: false,
              validityState: undefined,
            },
          });
        });
        test('visuWindow duration too long', () => {
          const oldState = { index: { ep4: 18 }, values: { ep4: { value: 201, color: '#0000FF' } } };
          const intervals = {
            rId1: {
              localrId1: { error: 'invalid visuWindow' },
              localEp5: { error: 'invalid visuWindow' },
              localEpDyn: { error: 'invalid visuWindow' },
            },
            rId2: {
              localrId2: { error: 'invalid visuWindow' },
              localEp6: { error: 'invalid visuWindow' },
            },
          };
          const data = selectDataPerView(viewDataMap.text2, intervals, payload, oldState);
          expect(data).toEqual({ });
        });
      });
      describe('viewObsoleteEventAdd', () => {
        const state = Object.freeze({
          index: {
            ep1: '20',
            ep2: '10',
            ep3: '60',
          },
          values: {
            ep1: {
              color: '#aaa',
              isDataObsolete: false,
              validityState: {},
              value: 150,
            },
            ep2: {
              color: '#aaa',
              isDataObsolete: false,
              validityState: {},
              value: 139,
            },
            ep3: {
              color: '#aaa',
              isDataObsolete: false,
              validityState: {},
              value: 120,
            },
          },
          obsoleteEvents: {},
        });
        const entryPoints = {
          ep1: {
            dataId: {
              parameterName: 'param1',
              sessionId: 0,
              domainId: 4,
            },
            stateColor: [],
          },
          ep2: {
            dataId: {
              parameterName: 'param2',
              sessionId: 0,
              domainId: 4,
            },
            stateColor: [],
          },
          ep3: {
            dataId: {
              parameterName: 'param3',
              sessionId: 0,
              domainId: 2,
            },
            stateColor: [],
          },
        };
        const payload = {
          'param2:0:4:::': {
            11: { eventDate: 11 },
            42: { eventDate: 42 },
          },
        };
        const current = 20;
        test('empty payload', () => {
          expect(viewObsoleteEventAdd(
            state,
            {},
            entryPoints,
            current)
          ).toEqual({ ...state });
        });
        test('should add an obsolete Event, tag ep2 last value obsolete and change color to #3498db', () => {
          expect(viewObsoleteEventAdd(
            state,
            payload,
            entryPoints,
            current)
          ).toEqual({
            index: {
              ep1: '20',
              ep2: '10',
              ep3: '60',
            },
            values: {
              ep1: {
                color: '#aaa',
                isDataObsolete: false,
                validityState: {},
                value: 150,
              },
              ep2: {
                color: '#3498db',
                isDataObsolete: true,
                validityState: {},
                value: 139,
              },
              ep3: {
                color: '#aaa',
                isDataObsolete: false,
                validityState: {},
                value: 120,
              },
            },
            obsoleteEvents: {
              ep2: {
                eventDate: '11',
              },
            },
          });
        });
      });
      describe('isLastDataObsolete', () => {
        const obsoleteEvents = {
          ep1: {
            eventDate: 12,
          },
        };
        test('should return false', () => {
          expect(isLastDataObsolete(10, obsoleteEvents, 'ep1', 11)).toBeFalsy();
        });
        test('should return true', () => {
          expect(isLastDataObsolete(10, obsoleteEvents, 'ep1', 14)).toBeTruthy();
        });
      });
    });
  });
});
