import { getViewEntryPoint, getWindowAllViewsIds } from './views';
import state from '../../common/jest/stateTest';

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
      .toEqual(['text1', 'plot1', 'dynamic1', 'mimic1', 'plotCollapsed']);
    });
  });
});
