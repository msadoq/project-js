import _each from 'lodash/each';
import {
  isCustomizable,
  getStateColorFilters,
  getStateColor,
  STATE_COLOR_NOMINAL,
  STATE_COLOR_WARNING,
  STATE_COLOR_ALARM,
  STATE_COLOR_SEVERE,
  STATE_COLOR_CRITICAL,
  STATE_COLOR_OUT_OF_RANGE,
} from 'windowProcess/common/colors';

describe('windowProcess', () => {
  describe('windowProcess :: common', () => {
    describe('windowProcess :: common :: colors', () => {
      describe('isCustomizable', () => {
        _each([
          STATE_COLOR_WARNING,
          STATE_COLOR_ALARM,
          STATE_COLOR_SEVERE,
          STATE_COLOR_CRITICAL,
          STATE_COLOR_OUT_OF_RANGE,
        ], (monitoringState) => {
          _each([true, false], (obsolete) => {
            _each([true, false], (significant) => {
              test(`isCustomizable :: ${monitoringState}|${obsolete}|${significant}`, () => {
                expect(isCustomizable(monitoringState, obsolete, significant)).toBe(false);
              });
            });
          });
        });
        test('isCustomizable :: alarm', () => {
          expect(isCustomizable(STATE_COLOR_NOMINAL, true, true)).toBe(false);
          expect(isCustomizable(STATE_COLOR_NOMINAL, true, false)).toBe(false);
          expect(isCustomizable(STATE_COLOR_NOMINAL, false, true)).toBe(true);
          expect(isCustomizable(STATE_COLOR_NOMINAL, false, false)).toBe(false);
        });
      });
      describe('getStateColorFilters', () => {
        test('getStateColorFilters :: memoize', () => {
          const firstRun = getStateColorFilters(false, false);
          const secondRun = getStateColorFilters(false, false);
          expect(secondRun).toBe(firstRun);
        });
        test('getStateColorFilters :: true / true', () => {
          expect(getStateColorFilters(true, true)).toEqual([
            { customize: false, color: '#3498db', condition: { field: 'monitoringState', operand: STATE_COLOR_NOMINAL, operator: '=' } },
            { customize: false, color: '#3498db', condition: { field: 'monitoringState', operand: STATE_COLOR_WARNING, operator: '=' } },
            { customize: false, color: '#3498db', condition: { field: 'monitoringState', operand: STATE_COLOR_ALARM, operator: '=' } },
            { customize: false, color: '#3498db', condition: { field: 'monitoringState', operand: STATE_COLOR_SEVERE, operator: '=' } },
            { customize: false, color: '#3498db', condition: { field: 'monitoringState', operand: STATE_COLOR_CRITICAL, operator: '=' } },
            { customize: false, color: '#3498db', condition: { field: 'monitoringState', operand: STATE_COLOR_OUT_OF_RANGE, operator: '=' } },
          ]);
        });
        test('getStateColorFilters :: true / false', () => {
          expect(getStateColorFilters(true, false)).toEqual([
            { customize: false, color: '#bdc3c7', condition: { field: 'monitoringState', operand: STATE_COLOR_NOMINAL, operator: '=' } },
            { customize: false, color: '#bdc3c7', condition: { field: 'monitoringState', operand: STATE_COLOR_WARNING, operator: '=' } },
            { customize: false, color: '#bdc3c7', condition: { field: 'monitoringState', operand: STATE_COLOR_ALARM, operator: '=' } },
            { customize: false, color: '#bdc3c7', condition: { field: 'monitoringState', operand: STATE_COLOR_SEVERE, operator: '=' } },
            { customize: false, color: '#bdc3c7', condition: { field: 'monitoringState', operand: STATE_COLOR_CRITICAL, operator: '=' } },
            { customize: false, color: '#bdc3c7', condition: { field: 'monitoringState', operand: STATE_COLOR_OUT_OF_RANGE, operator: '=' } },
          ]);
        });
        test('getStateColorFilters :: false / true', () => {
          expect(getStateColorFilters(false, true)).toEqual([
            { customize: true, color: '#2ecc71', condition: { field: 'monitoringState', operand: STATE_COLOR_NOMINAL, operator: '=' } },
            { customize: false, color: '#f1c40f', condition: { field: 'monitoringState', operand: STATE_COLOR_WARNING, operator: '=' } },
            { customize: false, color: '#e67e22', condition: { field: 'monitoringState', operand: STATE_COLOR_ALARM, operator: '=' } },
            { customize: false, color: '#d35400', condition: { field: 'monitoringState', operand: STATE_COLOR_SEVERE, operator: '=' } },
            { customize: false, color: '#e74c3c', condition: { field: 'monitoringState', operand: STATE_COLOR_CRITICAL, operator: '=' } },
            { customize: false, color: '#c0392b', condition: { field: 'monitoringState', operand: STATE_COLOR_OUT_OF_RANGE, operator: '=' } },
          ]);
        });
        test('getStateColorFilters :: false / false', () => {
          expect(getStateColorFilters(false, false)).toEqual([
            { customize: false, color: '#95a5a6', condition: { field: 'monitoringState', operand: STATE_COLOR_NOMINAL, operator: '=' } },
            { customize: false, color: '#95a5a6', condition: { field: 'monitoringState', operand: STATE_COLOR_WARNING, operator: '=' } },
            { customize: false, color: '#95a5a6', condition: { field: 'monitoringState', operand: STATE_COLOR_ALARM, operator: '=' } },
            { customize: false, color: '#95a5a6', condition: { field: 'monitoringState', operand: STATE_COLOR_SEVERE, operator: '=' } },
            { customize: false, color: '#95a5a6', condition: { field: 'monitoringState', operand: STATE_COLOR_CRITICAL, operator: '=' } },
            { customize: false, color: '#95a5a6', condition: { field: 'monitoringState', operand: STATE_COLOR_OUT_OF_RANGE, operator: '=' } },
          ]);
        });
      });
      describe('getStateColor', () => {
        test('getStateColor :: memoize', () => {
          const firstRun = getStateColor(false, false, STATE_COLOR_NOMINAL);
          const secondRun = getStateColor(false, false, STATE_COLOR_NOMINAL);
          expect(secondRun).toBe(firstRun);
        });
        test('getStateColor :: true / true', () => {
          expect(getStateColor(true, true, STATE_COLOR_NOMINAL)).toEqual({
            customize: false,
            color: '#3498db',
            condition: {
              field: 'monitoringState',
              operand: STATE_COLOR_NOMINAL,
              operator: '=',
            },
          });
        });
      });
    });
  });
});
