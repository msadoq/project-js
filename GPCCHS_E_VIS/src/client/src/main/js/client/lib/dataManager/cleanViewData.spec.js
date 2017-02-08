import _cloneDeep from 'lodash/cloneDeep';
import cleanViewData from './cleanViewData';


describe('cleanViewData', () => {
  // const newViewMap = {
  //   text: {
  //     type: 'TextView',
  //     structureType: 'last',
  //     entryPoints: {
  //       STAT_SU_PID: {
  //         remoteId: 'last@Reporting.STAT_SU_PID<ReportingParameter>:181:4',
  //         field: 'extractedValue',
  //         id: 'id1',
  //         expectedInterval: [11, 16],
  //         offset: 0,
  //       },
  //       STAT_WILDCARD_TIMELINE: {
  //         expectedInterval: [11, 16],
  //         field: 'extractedValue',
  //         id: 'id46',
  //         remoteId: 'last@Reporting.STAT_WILDCARD_TIMELINE<ReportingParameter>:10:4',
  //         offset: 0,
  //       },
  //       STAT_UNKNOW_DOMAIN: {
  //         error: 'invalid entry point, no domain matches',
  //       },
  //     },
  //   },
  //   plot: {
  //     type: 'PlotView',
  //     structureType: 'range',
  //     entryPoints: {
  //       STAT_SU_PID: {
  //         remoteId: 'range@Reporting.STAT_SU_PID<ReportingParameter>:181:4',
  //         fieldX: 'groundDate',
  //         fieldY: 'extractedValue',
  //         offset: 0,
  //         id: 'id60',
  //         expectedInterval: [11, 21],
  //       },
  //       STAT_PARAMETRIC: {
  //         error: 'parametric entryPoint detected for this view',
  //       },
  //     },
  //   },
  //   dynamic: {
  //     type: 'DynamicView',
  //     structureType: 'last',
  //     entryPoints: {
  //       dynamicEP: {
  //         remoteId: 'last@TelemetryPacket.CLCW_TM_NOMINAL<DecommutedPacket>:181:4',
  //         id: 'id10',
  //         expectedInterval: [11, 16],
  //         offset: 0,
  //       },
  //     },
  //   },
  // };

  let viewDataState;
  let viewMap;
  beforeEach(() => {
    viewMap = {
      text: {
        type: 'TextView',
        structureType: 'last',
        entryPoints: {
          STAT_SU_PID: {
            remoteId: 'last@Reporting.STAT_SU_PID<ReportingParameter>:181:4',
            field: 'extractedValue',
            id: 'id1',
            expectedInterval: [10, 15],
            offset: 0,
          },
          STAT_WILDCARD_TIMELINE: {
            expectedInterval: [10, 15],
            field: 'extractedValue',
            id: 'id46',
            remoteId: 'last@Reporting.STAT_WILDCARD_TIMELINE<ReportingParameter>:10:4',
            offset: 0,
          },
          STAT_UNKNOW_DOMAIN: {
            error: 'invalid entry point, no domain matches',
          },
        },
      },
      plot: {
        type: 'PlotView',
        structureType: 'range',
        entryPoints: {
          STAT_SU_PID: {
            remoteId: 'range@Reporting.STAT_SU_PID<ReportingParameter>:181:4',
            fieldX: 'groundDate',
            fieldY: 'extractedValue',
            offset: 0,
            id: 'id60',
            expectedInterval: [10, 20],
          },
          STAT_PARAMETRIC: {
            error: 'parametric entryPoint detected for this view',
          },
        },
      },
      dynamic: {
        type: 'DynamicView',
        structureType: 'last',
        entryPoints: {
          dynamicEP: {
            remoteId: 'last@TelemetryPacket.CLCW_TM_NOMINAL<DecommutedPacket>:181:4',
            id: 'id10',
            expectedInterval: [10, 15],
            offset: 0,
          },
        },
      },
    };
    viewDataState = {
      dynamic: {
        index: {
          dynamicEP: 14,
        },
        values: {
          dynamicEP: {
            value: {
              referenceTimestamp: 14,
              decommuntedValues: [
                { name: { value: 'decom1' } },
                { name: { value: 'decom2' } },
              ],
            },
          },
        },
      },
      plot: {
        index: [
          10, 11, 12, 13, 14, 15, 16,
        ],
        columns: [
          { STAT_SU_PID: { value: 13, x: 10 } },
          { STAT_SU_PID: { value: 13, x: 11 } },
          { STAT_SU_PID: { value: 13, x: 12 } },
          { STAT_SU_PID: { value: 13, x: 13 } },
          { STAT_SU_PID: { value: 13, x: 14 } },
          { STAT_SU_PID: { value: 13, x: 15 } },
          { STAT_SU_PID: { value: 13, x: 16 } },
        ],
      },
      text: {
        index: {
          STAT_SU_PID: 14,
          STAT_WILDCARD_TIMELINE: 13,
        },
        values: {
          STAT_SU_PID: { value: 14, monit: 'info' },
          STAT_WILDCARD_TIMELINE: { value: 13, monit: 'info' },
        },
      },
    };
  });
  it('no update', () => {
    const newState = cleanViewData(Object.freeze(viewDataState), viewMap, viewMap);
    newState.should.equal(viewDataState);
  });
  it('interval update Dynamic: keep', () => {
    const newMap = _cloneDeep(viewMap);
    newMap.dynamic.entryPoints.dynamicEP.expectedInterval = [12, 17];
    const newState = cleanViewData(Object.freeze(viewDataState), viewMap, newMap);
    newState.dynamic.should.equal(viewDataState.dynamic);
  });
  it('interval update text: keep', () => {
    const newMap = _cloneDeep(viewMap);
    newMap.text.entryPoints.STAT_SU_PID.expectedInterval = [12, 17];
    const newState = cleanViewData(Object.freeze(viewDataState), viewMap, newMap);
    newState.text.should.equal(viewDataState.text);
  });
  it('interval update Plot: keep all', () => {
    const newMap = _cloneDeep(viewMap);
    newMap.plot.entryPoints.STAT_SU_PID.expectedInterval = [10, 25];
    const newState = cleanViewData(Object.freeze(viewDataState), viewMap, newMap);
    newState.plot.should.equal(viewDataState.plot);
  });
  it('interval update Plot: keep some', () => {
    const newMap = _cloneDeep(viewMap);
    newMap.plot.entryPoints.STAT_SU_PID.expectedInterval = [15, 25];
    const newState = cleanViewData(Object.freeze(viewDataState), viewMap, newMap);
    newState.plot.columns.should.eql([
      { STAT_SU_PID: { value: 13, x: 15 } },
      { STAT_SU_PID: { value: 13, x: 16 } },
    ]);
    newState.plot.index.should.eql([15, 16]);
  });
  it('interval update Plot: remove all', () => {
    const newMap = _cloneDeep(viewMap);
    newMap.plot.entryPoints.STAT_SU_PID.expectedInterval = [20, 25];
    const newState = cleanViewData(Object.freeze(viewDataState), viewMap, newMap);
    newState.plot.should.eql({ index: [], columns: [] });
  });
});
