// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7164 : 07/07/2017 : Apply filters on getLast request
// END-HISTORY
// ====================================================================

import flattenStateColors from './flattenStateColors';

describe('viewManager/commonData/flattenStateColors', () => {
  test('no filter: empty array', () => {
    expect(flattenStateColors([])).toEqual('');
  });
  test('no filter: undefined', () => {
    expect(flattenStateColors()).toEqual('');
  });
  test('one filter', () => {
    expect(flattenStateColors([
      { color: 'red', condition: { operator: '=', operand: '2', field: 'extracted' } }]))
    .toEqual(':red.extracted.=.2');
  });
  test('several frilters', () => {
    expect(flattenStateColors([
      { color: 'red', condition: { operator: '=', operand: '2', field: 'extracted' } },
      { color: 'blue', condition: { operator: '<', operand: '20', field: 'raw' } },
    ]))
    .toEqual(':blue.raw.<.20,red.extracted.=.2');
  });
});
