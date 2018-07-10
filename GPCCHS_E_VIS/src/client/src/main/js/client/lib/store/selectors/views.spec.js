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
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getView/getViews simple selectors in
//  store/reducers/views
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move simple selectors from selectors/views to
//  reducers/views
// VERSION : 1.1.2 : DM : #5828 : 27/03/2017 : Add getWindowAllViewsIds selector in selectors/views
// VERSION : 1.1.2 : DM : #5828 : 27/03/2017 : Remove unused parameter from timebar
// VERSION : 1.1.2 : DM : #5828 : 29/03/2017 : Replace sessionId by sessionName in timeline
//  definition
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : Use new configuration selector in dataManager
// VERSION : 1.1.2 : DM : #5828 : 12/04/2017 : DataMap simplification : removing structureType
// VERSION : 1.1.2 : DM : #5828 : 14/04/2017 : Move filter application in main process
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of
//  tests
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : DM : #6700 : 04/08/2017 : Update unit tests and add view reducers to action
//  viewData_clean
// VERSION : 2.0.0 : DM : #6127 : 20/09/2017 : Update of history view data store
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : ISIS-FT-2159 : 20/03/2018 : editeur champ flowType VIMA JS
// VERSION : 2.0.0 : FA : ISIS-FT-2159 : 20/03/2018 : Update unit tests and stubs for provider
//  field and fix parseEntryPoint calls in all views
// VERSION : 2.0.0.3 : FA : ISIS-FT-3152 : 30/05/2018 : comportement multisat VIMA test end
// VERSION : 2.0.0.3 : FA : ISIS-FT-3152 : 30/05/2018 : correction bug domain colors algo
// END-HISTORY
// ====================================================================

import state from 'common/jest/stateTest';
import {
  getViewEntryPoint,
  getWindowAllViewsIds,
  getViewEntryPoints,
  getViewConfigurationTableCols,
} from './views';
import { get } from '../../common/configurationManager';

const WILDCARD = get('WILDCARD_CHARACTER');

describe('store:views:selectors', () => {
  test('getViewEntryPoint', () => {
    expect(
      getViewEntryPoint(state, { viewId: 'text1', epName: 'AGA_AM_PRIORITY' })
    ).toEqual({
      id: 'text1ep1',
      dataId: {
        catalog: 'Reporting',
        parameterName: 'AGA_AM_PRIORITY',
        provider: WILDCARD,
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
      tbdId: 'Reporting.AGA_AM_PRIORITY<ReportingParameter>:0:4:::',
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
      .toEqual(['text1', 'plot1', 'dynamic1', 'mimic1', 'plotCollapsed', 'hist1', 'groundAlarm1']);
    });
  });
  describe('getViewConfigurationTableCols', () => {
    test('returns an empty array for unknown view', () => {
      expect(getViewConfigurationTableCols(state, { viewId: 'unknownView', tableId: 'main' }))
        .toEqual([]);
    });
    test('returns an empty array for unknown table', () => {
      expect(getViewConfigurationTableCols(state, { viewId: 'groundAlarm1', tableId: undefined }))
        .toEqual([]);
    });
    test('returns existing cols', () => {
      expect(getViewConfigurationTableCols(state, { viewId: 'groundAlarm1', tableId: 'main' }))
        .toEqual(state.GroundAlarmViewConfiguration.groundAlarm1.tables.main.cols);
    });
  });
  describe('getViewEntryPoints', () => {
    test('returns Entrypoints for text1 with an error for TMMGT_AC_APP (no connected formula)', () => {
      expect(getViewEntryPoints(state, { viewId: 'text1' })).toEqual(
        {
          AGA_AM_PRIORITY: {
            convertFrom: undefined,
            convertTo: undefined,
            dataId: {
              catalog: 'Reporting',
              comObject: 'ReportingParameter',
              domain: 'fr.cnes.isis.simupus',
              domainId: 4,
              parameterName: 'AGA_AM_PRIORITY',
              provider: '*',
              sessionId: 0,
              sessionName: 'Master',
            },
            field: 'extractedValue',
            filters: [],
            id: 'text1ep1',
            localId: 'extractedValue.tb1:0',
            offset: 0,
            tbdId: 'Reporting.AGA_AM_PRIORITY<ReportingParameter>:0:4:::',
            timebarUuid: 'tb1',
            type: 'TextView',
          },
          AGA_AM_PRIOR_OFFSET: {
            convertFrom: undefined,
            convertTo: undefined,
            dataId: {
              catalog: 'Reporting',
              comObject: 'ReportingParameter',
              domain: 'fr.cnes.isis.simupus',
              domainId: 4,
              parameterName: 'AGA_AM_PRIORITY',
              provider: '*',
              sessionId: 0,
              sessionName: 'Master',
            },
            field: 'extractedValue',
            filters: [],
            id: 'text1ep10',
            localId: 'extractedValue.tb1:10000',
            offset: 10000,
            tbdId: 'Reporting.AGA_AM_PRIORITY<ReportingParameter>:0:4:::',
            timebarUuid: 'tb1',
            type: 'TextView',
          },
          TMMGT_AC_APP: {
            error: 'unable to parse this connectedData formula ',
          },
          TMMGT_BC_VIRTCHAN3: {
            convertFrom: undefined,
            convertTo: undefined,
            dataId: {
              catalog: 'Reporting',
              comObject: 'ReportingParameter',
              domain: 'fr.cnes.isis.simupus',
              domainId: 4,
              parameterName: 'TMMGT_BC_VIRTCHAN3',
              provider: '*',
              sessionId: 0,
              sessionName: 'Master',
            },
            field: 'extractedValue',
            filters: [],
            id: 'text1ep2',
            localId: 'extractedValue.tb1:0',
            offset: 0,
            tbdId: 'Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4:::',
            timebarUuid: 'tb1',
            type: 'TextView',
          },
        }
      );
    });
  });
});
