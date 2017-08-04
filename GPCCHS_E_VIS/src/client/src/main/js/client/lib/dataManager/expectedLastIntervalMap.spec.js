import expectedLastIntervalMap, { intervalPerLastTbdId } from './expectedLastIntervalMap';
import state from '../common/jest/stateTest';

describe('dataManager/expectedLastIntervalMap', () => {
  const epValid = {
    id: 'id60',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'AGA_AM_PRIORITY',
      comObject: 'ReportingParameter',
      domainId: 4,
      domain: 'fr.cnes.isis.simupus',
      sessionName: 'Master',
      sessionId: 0,
    },
    field: 'extractedValue',
    offset: 0,
    filter: [],
    localId: 'extractedValue.tb1:0',
    timebarUuid: 'tb1',
    tbdId: 'Reporting.AGA_AM_PRIORITY<ReportingParameter>:0:4',
    type: 'TextView',
  };
  const epValidData = {
    dataId: epValid.dataId,
    filter: epValid.filter,
    localIds: {
      [epValid.localId]: {
        field: epValid.field,
        offset: epValid.offset,
        timebarUuid: epValid.timebarUuid,
        viewType: 'TextView',
      },
      'rawValue.tb1:10': {
        field: 'rawValue',
        offset: 10,
        timebarUuid: epValid.timebarUuid,
        viewType: 'TextView',
      },
    },
    views: ['text1'],
  };
  const perLastTbdIdMap = {
    'Reporting.AGA_AM_PRIORITY<ReportingParameter>:0:4': {
      dataId: {
        catalog: 'Reporting',
        parameterName: 'AGA_AM_PRIORITY',
        comObject: 'ReportingParameter',
        domainId: 4,
        domain: 'fr.cnes.isis.simupus',
        sessionId: 0,
        sessionName: 'Master',
      },
      filter: [],
      localIds: {
        'extractedValue.tb1:0': {
          field: 'extractedValue',
          offset: 0,
          timebarUuid: 'tb1',
          viewType: 'TextView',
        },
      },
      views: ['text'],
    },
    'Reporting.STAT_WILDCARD_TIMELINE<ReportingParameter>:10:4': {
      dataId: {
        catalog: 'Reporting',
        parameterName: 'STAT_WILDCARD_TIMELINE',
        comObject: 'ReportingParameter',
        domainId: 4,
        domain: 'fr.cnes.isis.simupus',
        sessionId: 10,
      },
      filter: [],
      localIds: {
        'extractedValue.tb1:0': {
          field: 'extractedValue',
          offset: 0,
          timebarUuid: 'tb1',
          viewType: 'TextView',
        },
      },
      views: ['text'],
    },
  };

  test('One lastTbdIdData ok, forecastIntervals empty', () => {
    const { localIdIntervals, forecastIntervals }
      = intervalPerLastTbdId(
        state.timebars,
        'Reporting.AGA_AM_PRIORITY<ReportingParameter>:0:4',
        epValidData,
        {},
        10000);
    expect(localIdIntervals).toEqual({
      'extractedValue.tb1:0': {
        expectedInterval: [100000, 400000],
      },
      'rawValue.tb1:10': {
        expectedInterval: [99990, 399990],
      },
    });
    expect(forecastIntervals).toEqual({
      'Reporting.AGA_AM_PRIORITY<ReportingParameter>:0:4': {
        'extractedValue.tb1:0': {
          expectedInterval: [400000, 410000],
        },
        'rawValue.tb1:10': {
          expectedInterval: [399990, 409990],
        },
      },
    });
  });
  test('One lastTbdIdData ok, forecastIntervals not empty', () => {
    const fIntervals = {
      'Reporting.ATT_TM_GID<ReportingParameter>:0:4': {
        'extractedValue.tb1:0': {
          expectedInterval: [400000, 410000],
        },
      },
    };

    const { localIdIntervals, forecastIntervals }
      = intervalPerLastTbdId(
        state.timebars,
        'Reporting.AGA_AM_PRIORITY<ReportingParameter>:0:4',
        epValidData,
        fIntervals,
        10000);
    expect(localIdIntervals).toEqual({
      'extractedValue.tb1:0': {
        expectedInterval: [100000, 400000],
      },
      'rawValue.tb1:10': {
        expectedInterval: [99990, 399990],
      },
    });
    expect(forecastIntervals).toEqual({
      'Reporting.ATT_TM_GID<ReportingParameter>:0:4': {
        'extractedValue.tb1:0': {
          expectedInterval: [400000, 410000],
        },
      },
      'Reporting.AGA_AM_PRIORITY<ReportingParameter>:0:4': {
        'extractedValue.tb1:0': {
          expectedInterval: [400000, 410000],
        },
        'rawValue.tb1:10': {
          expectedInterval: [399990, 409990],
        },
      },
    });
  });
  test('invalid timebarUuid', () => {
    epValidData.localIds['rawValue.tb1:10'].timebarUuid = 'invalid';
    const { localIdIntervals, forecastIntervals } =
      intervalPerLastTbdId(
        state.timebars,
        'Reporting.AGA_AM_PRIORITY<ReportingParameter>:0:4',
        epValidData,
        {},
        10000);
    expect(localIdIntervals).toEqual({
      'extractedValue.tb1:0': {
        expectedInterval: [100000, 400000],
      },
      'rawValue.tb1:10': {
        error: 'invalid timebar',
      },
    });
    expect(forecastIntervals).toEqual({
      'Reporting.AGA_AM_PRIORITY<ReportingParameter>:0:4': {
        'extractedValue.tb1:0': {
          expectedInterval: [400000, 410000],
        },
      },
    });
  });
  test('expectedLastIntervalMap: perLastTbdIdMap empty', () => {
    expect(expectedLastIntervalMap(state.timebars, {}, {}, 10000)).toEqual({
      expectedLastIntervals: {}, forecastIntervals: {} });
  });
  test('expectedLastIntervalMap: perLastTbdIdMap valid', () => {
    const { expectedLastIntervals, forecastIntervals } =
      expectedLastIntervalMap(
        state.timebars,
        perLastTbdIdMap,
        { myFirstForecast: { } },
        10000
      );

    expect(expectedLastIntervals).toEqual({
      'Reporting.AGA_AM_PRIORITY<ReportingParameter>:0:4': {
        'extractedValue.tb1:0': {
          expectedInterval: [100000, 400000],
        },
      },
      'Reporting.STAT_WILDCARD_TIMELINE<ReportingParameter>:10:4': {
        'extractedValue.tb1:0': {
          expectedInterval: [100000, 400000],
        },
      },
    });
    expect(forecastIntervals).toEqual({
      myFirstForecast: {},
      'Reporting.AGA_AM_PRIORITY<ReportingParameter>:0:4': {
        'extractedValue.tb1:0': {
          expectedInterval: [400000, 410000],
        },
      },
      'Reporting.STAT_WILDCARD_TIMELINE<ReportingParameter>:10:4': {
        'extractedValue.tb1:0': {
          expectedInterval: [400000, 410000],
        },
      },
    });
  });
});
