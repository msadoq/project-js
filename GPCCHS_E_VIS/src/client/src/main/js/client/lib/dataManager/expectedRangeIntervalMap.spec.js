import expectedRangeIntervalMap, { intervalPerRangeTbdId } from './expectedRangeIntervalMap';
import state from '../common/jest/stateTest';

describe('dataManager/expectedRangeIntervalMap', () => {
  const epValid = {
    id: 'id60',
    dataId: {
      catalog: 'Reporting',
      parameterName: 'ATT_BC_REVTCOUNT1',
      comObject: 'ReportingParameter',
      domainId: 4,
      domain: 'fr.cnes.isis.simupus',
      sessionName: 'Master',
      sessionId: 0,
    },
    fieldX: 'groundDate',
    fieldY: 'extractedValue',
    offset: 0,
    filter: [],
    localId: 'groundDate/extractedValue.tb1:0',
    timebarUuid: 'tb1',
    tbdId: 'Reporting.STAT_SU_PID<ReportingParameter>:0:4',
    type: 'PlotView',
  };
  const epValidData = {
    dataId: epValid.dataId,
    filter: epValid.filter,
    localIds: {
      [epValid.localId]: {
        fieldX: epValid.fieldX,
        fieldY: epValid.fieldY,
        offset: epValid.offset,
        timebarUuid: epValid.timebarUuid,
        viewType: 'PlotView',
      },
      'onBoardDate/rawValue.tb1:10': {
        fieldX: 'onBoardDate',
        fieldY: 'rawValue',
        offset: 10,
        timebarUuid: epValid.timebarUuid,
        viewType: 'PlotView',
      },
    },
    views: ['plot1'],
  };
  const perRangeTbdIdMap = {
    'Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:4': {
      dataId: {
        catalog: 'Reporting',
        parameterName: 'ATT_BC_REVTCOUNT1',
        comObject: 'ReportingParameter',
        domainId: 4,
        domain: 'fr.cnes.isis.simupus',
        sessionId: 0,
        sessionName: 'Master',
      },
      filter: [],
      localIds: {
        'groundDate/extractedValue.tb1:0': {
          fieldX: 'groundDate',
          fieldY: 'extractedValue',
          offset: 0,
          timebarUuid: 'tb1',
          viewType: 'PlotView',
        },
      },
      views: ['plot'],
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
        'groundDate/extractedValue.tb1:0': {
          fieldX: 'groundDate',
          fieldY: 'extractedValue',
          offset: 0,
          timebarUuid: 'tb1',
          viewType: 'PlotView',
        },
      },
      views: ['plot'],
    },
  };

  test('One rangeTbdIdData ok, forecastIntervals empty', () => {
    const { localIdIntervals, forecastIntervals }
      = intervalPerRangeTbdId(
        state.timebars,
        'Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:4',
        epValidData,
        {},
        10000);
    expect(localIdIntervals).toEqual({
      'groundDate/extractedValue.tb1:0': {
        expectedInterval: [100000, 500000],
      },
      'onBoardDate/rawValue.tb1:10': {
        expectedInterval: [99990, 499990],
      },
    });
    expect(forecastIntervals).toEqual({
      'Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:4': {
        'groundDate/extractedValue.tb1:0': {
          expectedInterval: [500000, 510000],
        },
        'onBoardDate/rawValue.tb1:10': {
          expectedInterval: [499990, 509990],
        },
      },
    });
  });
  test('One rangeTbdIdData ok, forecastIntervals not empty', () => {
    const fIntervals = {
      'Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:4': {
        'extractedValue.tb1:0': {
          expectedInterval: [500000, 510000],
        },
      },
    };

    const { localIdIntervals, forecastIntervals }
      = intervalPerRangeTbdId(
        state.timebars,
        'Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:4',
        epValidData,
        fIntervals,
        10000);
    expect(localIdIntervals).toEqual({
      'groundDate/extractedValue.tb1:0': {
        expectedInterval: [100000, 500000],
      },
      'onBoardDate/rawValue.tb1:10': {
        expectedInterval: [99990, 499990],
      },
    });
    expect(forecastIntervals).toEqual({
      'Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:4': {
        'groundDate/extractedValue.tb1:0': {
          expectedInterval: [500000, 510000],
        },
        'onBoardDate/rawValue.tb1:10': {
          expectedInterval: [499990, 509990],
        },
        'extractedValue.tb1:0': {
          expectedInterval: [500000, 510000],
        },
      },
    });
  });
  test('invalid timebarUuid', () => {
    epValidData.localIds['onBoardDate/rawValue.tb1:10'].timebarUuid = 'invalid';
    const { localIdIntervals, forecastIntervals } =
      intervalPerRangeTbdId(
        state.timebars,
        'Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:4',
        epValidData,
        {},
        10000);
    expect(localIdIntervals).toEqual({
      'groundDate/extractedValue.tb1:0': {
        expectedInterval: [100000, 500000],
      },
      'onBoardDate/rawValue.tb1:10': {
        error: 'invalid timebar',
      },
    });
    expect(forecastIntervals).toEqual({
      'Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:4': {
        'groundDate/extractedValue.tb1:0': {
          expectedInterval: [500000, 510000],
        },
      },
    });
  });
  test('expectedRangeIntervalMap: perRangeTbdIdMap empty', () => {
    expect(expectedRangeIntervalMap(state.timebars, {}, {}, 10000)).toEqual({
      expectedRangeIntervals: {}, forecastIntervals: {} });
  });
  test('expectedRangeIntervalMap: perRangeTbdIdMap valid', () => {
    const { expectedRangeIntervals, forecastIntervals } =
      expectedRangeIntervalMap(
        state.timebars,
        perRangeTbdIdMap,
        { myFirstForecast: { } },
        10000
      );

    expect(expectedRangeIntervals).toEqual({
      'Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:4': {
        'groundDate/extractedValue.tb1:0': {
          expectedInterval: [100000, 500000],
        },
      },
      'Reporting.STAT_WILDCARD_TIMELINE<ReportingParameter>:10:4': {
        'groundDate/extractedValue.tb1:0': {
          expectedInterval: [100000, 500000],
        },
      },
    });
    expect(forecastIntervals).toEqual({
      myFirstForecast: {},
      'Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:4': {
        'groundDate/extractedValue.tb1:0': {
          expectedInterval: [500000, 510000],
        },
      },
      'Reporting.STAT_WILDCARD_TIMELINE<ReportingParameter>:10:4': {
        'groundDate/extractedValue.tb1:0': {
          expectedInterval: [500000, 510000],
        },
      },
    });
  });
});
