import { parseDragData } from './utils';

describe('parseDragData', () => {
  test('with valid entry point data', () => {
    const toParseData = {
      catalogName: 'Reporting',
      comObjects: ['ReportingParameter'],
      domain: 'fr.cnes.isis.simupus',
      item: 'AIV_TM_HK9018P065',
      nameSpace: 'SDB',
      sessionName: '0',
    };
    const toParseId = 'entryPoint';
    const defaultTimelineId = 'Session 1';
    const expected = {
      name: 'AIV_TM_HK9018P065',
      connectedData: {
        catalog: 'Reporting',
        catalogItem: 'AIV_TM_HK9018P065',
        comObject: 'ReportingParameter',
        comObjectField: 'convertedValue',
        domain: 'fr.cnes.isis.simupus',
        fieldX: 'onboardDate',
        formula: 'Reporting.AIV_TM_HK9018P065<ReportingParameter>.convertedValue',
        timeline: 'Session 1',
        unit: 'V',
      },
    };
    const returned = parseDragData(toParseData, toParseId, defaultTimelineId);
    expect(returned).toEqual(expected);
  });
});
