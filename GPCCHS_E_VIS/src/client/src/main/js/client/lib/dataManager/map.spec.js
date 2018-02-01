// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 17/02/2017 : Creation of timebarTimelines reducer .
// VERSION : 1.1.2 : DM : #3622 : 23/02/2017 : State color is now computed in viewMap
// VERSION : 1.1.2 : DM : #3622 : 24/02/2017 : Refactoring of dataMap generation using reselect
// VERSION : 1.1.2 : DM : #3622 : 14/03/2017 : Ignore not loaded views in dataMap and data requesting
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Creation of data store for plotView
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Move getWindowsVisibleViews in dataManager/map.js .
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Add number of points per view in explorer panel
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Fix few broken unit tests
// VERSION : 1.1.2 : DM : #5828 : 27/03/2017 : Remove unused parameter from timebar
// VERSION : 1.1.2 : DM : #5828 : 29/03/2017 : Replace sessionId by sessionName in timeline definition
// VERSION : 1.1.2 : DM : #5828 : 04/04/2017 : plot view entry point update
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : Use new configuration selector in dataManager
// VERSION : 1.1.2 : DM : #5828 : 12/04/2017 : DataMap simplification : removing structureType
// VERSION : 1.1.2 : DM : #5828 : 14/04/2017 : Move filter application in main process
// VERSION : 1.1.2 : DM : #5828 : 19/04/2017 : remove unused masterSessionId from perViewData
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Move a beforeEach into describe block
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Cleanup client/ file organization and test helper modules
// VERSION : 1.1.2 : FA : #7164 : 07/07/2017 : Apply filters on getLast request
// VERSION : 1.1.2 : DM : #6700 : 21/07/2017 : Separate perTdbId by structure type in dataMap
// VERSION : 1.1.2 : DM : #6700 : 24/07/2017 : remove lastFrom0 from datamap add a test to keep the good interval in datamap
// VERSION : 1.1.2 : DM : #6700 : 26/07/2017 : Update of knownRanges reducer and actions
// VERSION : 1.1.2 : DM : #6700 : 26/07/2017 : creatin of selectors on datamap
// VERSION : 1.1.2 : DM : #6700 : 04/08/2017 : Update unit tests and add view reducers to action viewData_clean
// END-HISTORY
// ====================================================================

import u from 'updeep';
import map, { getPerRangeTbdIdMap, getPerLastTbdIdMap, getPerViewMap } from './map';
import state from '../common/jest/stateTest';

global.testConfig.DEFAULT_FIELD = JSON.stringify({ ReportingParameter: 'extractedValue' });
global.testConfig.FORECAST = 5000;

describe('data:map', () => {
  test('memoization map', () => {
    map.resetRecomputations();
    getPerRangeTbdIdMap.resetRecomputations();
    getPerLastTbdIdMap.resetRecomputations();
    getPerViewMap.resetRecomputations();
    expect(map.recomputations()).toEqual(0);
    map(state);
    expect(map.recomputations()).toEqual(1);
    map(state);
    expect(map.recomputations()).toEqual(1);
    const newState = u({ timebars: { tb1: { visuWindow: { lower: 1420106790838 } } } }, state);
    map(newState);
    // Only intervals have to be recomputed
    expect(map.recomputations()).toEqual(2);
    expect(getPerRangeTbdIdMap.recomputations()).toEqual(1);
    expect(getPerLastTbdIdMap.recomputations()).toEqual(1);
    expect(getPerViewMap.recomputations()).toEqual(1);
  });
  test('should compute dataMap', () => {
    const r = map(state);
    expect(r).toMatchSnapshot();
  });
});
