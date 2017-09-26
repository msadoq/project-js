// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 24/02/2017 : Refactoring of dataMap generation using reselect
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Fix few broken unit tests
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : converts long to string to ensure precision
// VERSION : 1.1.2 : DM : #5828 : 29/03/2017 : Replace sessionId by sessionName in timeline definition
// VERSION : 1.1.2 : DM : #5828 : 04/04/2017 : plot view entry point update
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : Use new configuration selector in dataManager
// VERSION : 1.1.2 : DM : #5828 : 12/04/2017 : DataMap simplification : removing structureType
// VERSION : 1.1.2 : DM : #5828 : 14/04/2017 : Move filter application in main process
// VERSION : 1.1.2 : DM : #5828 : 19/04/2017 : remove unused masterSessionId from perViewData
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : remove domain and session on window apply domain and session of view, page or workspace in case of wildcard
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : remove domain and session on window apply domain and session of view, page or workspace in case of wildcard
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Cleanup client/ file organization and test helper modules
// VERSION : 1.1.2 : DM : #6700 : 21/07/2017 : Separate perTdbId by structure type in dataMap
// VERSION : 1.1.2 : DM : #6700 : 04/08/2017 : Update unit tests and add view reducers to action viewData_clean
// VERSION : 1.1.2 : DM : #6700 : 04/08/2017 : update unit tests . .
// END-HISTORY
// ====================================================================

import makeGetPerViewData from './perViewData';
import state from '../common/jest/stateTest';

describe('dataManager/perViewData', () => {
  test('text view', () => {
    const map = makeGetPerViewData()(state, { viewId: 'text1', timebarUuid: 'tb1', pageId: 'page1' });
    expect(map).toMatchSnapshot();
  });
  test('plot view', () => {
    const map = makeGetPerViewData()(state, { viewId: 'plot1', timebarUuid: 'tb1' });
    expect(map).toMatchSnapshot();
  });
  test('dynamic view', () => {
    const map = makeGetPerViewData()(state, { viewId: 'dynamic1', timebarUuid: 'tb1' });
    expect(map).toMatchSnapshot();
  });
  test('memoization', () => {
    const map = makeGetPerViewData();
    map(state, { viewId: 'text1', timebarUuid: 'tb1' });
    expect(map.recomputations()).toEqual(1);
    map(state, { viewId: 'text1', timebarUuid: 'tb1' });
    expect(map.recomputations()).toEqual(1);
    map(state, { viewId: 'plot1', timebarUuid: 'tb1' });
    expect(map.recomputations()).toEqual(2);
  });
});
