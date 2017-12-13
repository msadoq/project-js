// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 16/02/2017 : fix reselect signature linting errors
// VERSION : 1.1.2 : DM : #3622 : 22/02/2017 : Write missing selectors tests (views.spec.js)
// VERSION : 1.1.2 : DM : #3622 : 23/02/2017 : Remove useless selectors for state colors
// VERSION : 1.1.2 : DM : #3622 : 24/02/2017 : Refactoring of dataMap generation using reselect
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Refacto some selectors . .
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Cleanup in selectors . .
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Remove unused getEntryPointOnAxis selector .
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getView/getViews simple selectors in store/reducers/views
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move simple selectors from selectors/views to reducers/views
// VERSION : 1.1.2 : DM : #5828 : 27/03/2017 : Add getWindowAllViewsIds selector in selectors/views
// VERSION : 1.1.2 : DM : #5828 : 27/03/2017 : Remove unused parameter from timebar
// VERSION : 1.1.2 : DM : #5828 : 29/03/2017 : Replace sessionId by sessionName in timeline definition
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : Use new configuration selector in dataManager
// VERSION : 1.1.2 : DM : #5828 : 12/04/2017 : DataMap simplification : removing structureType
// VERSION : 1.1.2 : DM : #5828 : 14/04/2017 : Move filter application in main process
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : DM : #6700 : 04/08/2017 : Update unit tests and add view reducers to action viewData_clean
// END-HISTORY
// ====================================================================

import state from 'common/jest/stateTest';
import { getViewEntryPoint, getWindowAllViewsIds } from './views';

describe('store:views:selectors', () => {
  test('getViewEntryPoint', () => {
    expect(
      getViewEntryPoint(state, { viewId: 'text1', epName: 'AGA_AM_PRIORITY' })
    ).toEqual({
      id: 'text1ep1',
      dataId: {
        catalog: 'Reporting',
        parameterName: 'AGA_AM_PRIORITY',
        comObject: 'ReportingParameter',
        domainId: 4,
        domain: 'fr.cnes.isis.simupus',
        sessionId: 0,
        sessionName: 'Master',
      },
      field: 'extractedValue',
      offset: 0,
      filters: [],
      localId: 'extractedValue.tb1:0',
      timebarUuid: 'tb1',
      tbdId: 'Reporting.AGA_AM_PRIORITY<ReportingParameter>:0:4',
      type: 'TextView',
      name: 'AGA_AM_PRIORITY',
    });
  });
  describe('getWindowAllViewsIds', () => {
    const emptyState = {};
    test('returns an empty array', () => {
      expect(getWindowAllViewsIds(emptyState, { windowId: 'w1' })).toEqual([]);
    });
    test('returns all views ids', () => {
      expect(getWindowAllViewsIds(state, { windowId: 'myWindow' }))
      .toEqual(['text1', 'plot1', 'dynamic1', 'mimic1', 'plotCollapsed', 'hist1']);
    });
  });
});
