import '../common/test';
import makeGetPerViewData from './perViewData';

describe('dataManager/perViewMap', () => {
  const state = {
    timelines: {
      tl1: {
        id: 'Session 1',
        offset: 0,
        sessionId: 181,
      },
      tl2: {
        id: 'Session 2',
        offset: 0,
        sessionId: 0,
      },
    },
    timebarTimelines: {
      tb1: ['tl1', 'tl2'],
    },
    pages: {
      page1: {
        title: 'page Sup/Sup workspace',
        timebarUuid: 'tb1',
        views: ['v1', 'v2'],
      },
    },
    views: {
      v1: {
        type: 'TextView',
        configuration: {
          title: 'TextView Sup/Sup',
          type: 'TextView',
          entryPoints: [{
            name: 'STAT_SU_PID',
            id: 'id1',
            connectedData: {
              formula: 'Reporting.STAT_SU_PID<ReportingParameter>.extractedValue',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1',
            },
          }, {
            name: 'STAT_WILDCARD_TIMELINE',
            id: 'id46',
            connectedData: {
              formula: 'Reporting.STAT_WILDCARD_TIMELINE<ReportingParameter>.extractedValue',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: '*',
            },
          }, {
            name: 'STAT_UNKNOW_DOMAIN',
            id: 'id47',
            connectedData: {
              formula: 'Reporting.STAT_UNKNOW_DOMAIN<ReportingParameter>.extractedValue',
              filter: [],
              domain: 'fr',
              timeline: 'Session 1',
            },
          }, {
            name: 'STAT_WILDCARD_DOMAIN',
            id: 'id48',
            connectedData: {
              formula: 'Reporting.STAT_WILDCARD_DOMAIN<ReportingParameter>.extractedValue',
              filter: [],
              domain: '*',
              timeline: 'Session 1',
            },
          }, {
            name: 'STAT_EMPTY_DOMAIN',
            id: 'id49',
            connectedData: {
              formula: 'Reporting.STAT_EMPTY_DOMAIN<ReportingParameter>.extractedValue',
              filter: [],
              domain: '',
              timeline: 'Session 1',
            },
          }, {
            name: 'STAT_UNKNOW_TIMELINE',
            id: 'id50',
            connectedData: {
              formula: 'Reporting.STAT_UNKNOW_TIMELINE<ReportingParameter>.extractedValue',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session X',
            },
          }, {
            name: 'STAT_EMPTY_TIMELINE',
            id: 'id51',
            connectedData: {
              formula: 'Reporting.STAT_EMPTY_TIMELINE<ReportingParameter>.extractedValue',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: '',
            },
          }, {
            name: 'STAT_INVALID_FORMULA',
            id: 'id52',
            connectedData: {
              formula: 'Reporting.STAT_INVALID_FORMULA',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1',
            },
          }],
        },
      },
      v2: {
        type: 'PlotView',
        configuration: {
          title: 'Plotview Sup/Sup workspace',
          type: 'PlotView',
          entryPoints: [{
            name: 'STAT_SU_PID',
            id: 'id60',
            connectedDataX: {
              formula: 'Reporting.STAT_SU_PID<ReportingParameter>.groundDate',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1',
            },
            connectedDataY: {
              formula: 'Reporting.STAT_SU_PID<ReportingParameter>.extractedValue',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1',
            },
            stateColors: [{
              color: '#000000',
              condition: {
                field: 'monitoringState',
                operator: '==',
                operand: 'waiting',
              },
            }],
          }, {
            name: 'STAT_PARAMETRIC',
            connectedDataX: {
              formula: 'Reporting.STAT_SU_PID<ReportingParameter>.extractedValue',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1',
            },
            connectedDataY: {
              formula: 'Reporting.STAT_SU_PID<ReportingParameter>.extractedValue',
              filter: [],
              domain: 'fr.cnes.isis',
              timeline: 'Session 1',
            },
            stateColors: [{
              color: '#000000',
              condition: {
                field: 'monitoringState',
                operator: '==',
                operand: 'waiting',
              },
            }],
          }],
        },
      },
      d1: {
        type: 'DynamicView',
        configuration: {
          title: 'DynamicView Sup/Sup',
          type: 'DynamicView',
          entryPoints: [{
            name: 'dynamicEP',
            id: 'id100',
            connectedData: {
              formula: 'Decommuted.STAT_SU_PID<DecommutedPacket>',
              filter: [],
              domain: 'fr.cnes.isis.simupus',
              timeline: 'Session 1',
            },
          }],
        },
      },
    },
    domains: [{
      itemNamespace: 'Domains',
      name: 'fr.cnes.isis',
      oid: 'dom2',
      domainId: 1,
      parentDomainId: 0,
    }, {
      itemNamespace: 'Domains',
      name: 'fr.cnes.isis.simupus',
      oid: 'dom1',
      domainId: 4,
      parentDomainId: 1,
    }],
    sessions: [{
      name: 'Master',
      id: 0,
      timestamp: {
        ms: 1480426701831,
        ps: null,
      },
      delta: 0,
      offsetWithmachineTime: 2373665,
    }, {
      name: 'Session#42',
      id: 42,
      timestamp: {
        ms: 1480426701831,
        ps: null,
      },
      delta: 42,
      offsetWithmachineTime: 2373665,
    }],
    masterSession: {
      sessionId: 10,
    },
  };
// ****************************************************
  it('text view', () => {
    const map = makeGetPerViewData()(state, { viewId: 'v1', timebarUuid: 'tb1' });
    map.should.eql({
      type: 'TextView',
      masterSessionId: 10,
      structureType: 'last',
      entryPoints: {
        STAT_SU_PID: {
          id: 'id1',
          dataId: {
            catalog: 'Reporting',
            parameterName: 'STAT_SU_PID',
            comObject: 'ReportingParameter',
            domainId: 4,
            sessionId: 181,
          },
          field: 'extractedValue',
          offset: 0,
          filter: [],
          localId: 'extractedValue.tb1:0',
          timebarUuid: 'tb1',
          structureType: 'last',
          remoteId: 'last@Reporting.STAT_SU_PID<ReportingParameter>:181:4',
          type: 'TextView',
        },
        STAT_WILDCARD_TIMELINE: {
          id: 'id46',
          dataId: {
            catalog: 'Reporting',
            parameterName: 'STAT_WILDCARD_TIMELINE',
            comObject: 'ReportingParameter',
            domainId: 4,
            sessionId: 10,
          },
          field: 'extractedValue',
          offset: 0,
          filter: [],
          localId: 'extractedValue.tb1:0',
          timebarUuid: 'tb1',
          structureType: 'last',
          remoteId: 'last@Reporting.STAT_WILDCARD_TIMELINE<ReportingParameter>:10:4',
          type: 'TextView',
        },
        STAT_UNKNOW_DOMAIN: { error: 'invalid entry point, no domain matches' },
        STAT_WILDCARD_DOMAIN: { error: 'invalid entry point, domain wildcard not already supported' },
        STAT_EMPTY_DOMAIN: { error: 'invalid entry point, invalid domain field' },
        STAT_UNKNOW_TIMELINE: { error: 'invalid entry point, no timeline matches' },
        STAT_EMPTY_TIMELINE: {
          id: 'id51',
          dataId: {
            catalog: 'Reporting',
            parameterName: 'STAT_EMPTY_TIMELINE',
            comObject: 'ReportingParameter',
            domainId: 4,
            sessionId: 10,
          },
          field: 'extractedValue',
          offset: 0,
          filter: [],
          localId: 'extractedValue.tb1:0',
          timebarUuid: 'tb1',
          structureType: 'last',
          remoteId: 'last@Reporting.STAT_EMPTY_TIMELINE<ReportingParameter>:10:4',
          type: 'TextView',
        },
        STAT_INVALID_FORMULA: {
          error: 'unable to parse this connectedData formula Reporting.STAT_INVALID_FORMULA' },
      },
    });
  });
  it('plot view', () => {
    const map = makeGetPerViewData()(state, { viewId: 'v2', timebarUuid: 'tb1' });
    map.should.eql({
      type: 'PlotView',
      masterSessionId: 10,
      structureType: 'range',
      entryPoints: {
        STAT_SU_PID: {
          id: 'id60',
          dataId: {
            catalog: 'Reporting',
            parameterName: 'STAT_SU_PID',
            comObject: 'ReportingParameter',
            domainId: 4,
            sessionId: 181,
          },
          fieldX: 'groundDate',
          fieldY: 'extractedValue',
          offset: 0,
          filter: [],
          localId: 'groundDate/extractedValue.tb1:0/0',
          timebarUuid: 'tb1',
          structureType: 'range',
          type: 'PlotView',
          remoteId: 'range@Reporting.STAT_SU_PID<ReportingParameter>:181:4',
          stateColors: [{
            color: '#000000',
            condition: {
              field: 'monitoringState',
              operator: '==',
              operand: 'waiting',
            },
          }],
        },
        STAT_PARAMETRIC: { error: 'parametric entryPoint detected for this view' },
      },
    });
  });
  it('dynamic view', () => {
    const map = makeGetPerViewData()(state, { viewId: 'd1', timebarUuid: 'tb1' });
    map.should.eql({
      type: 'DynamicView',
      masterSessionId: 10,
      structureType: 'last',
      entryPoints: {
        dynamicEP: {
          id: 'id100',
          dataId: {
            catalog: 'Decommuted',
            parameterName: 'STAT_SU_PID',
            comObject: 'DecommutedPacket',
            domainId: 4,
            sessionId: 181,
          },
          offset: 0,
          filter: [],
          field: undefined,
          localId: 'undefined.tb1:0',
          timebarUuid: 'tb1',
          structureType: 'last',
          remoteId: 'last@Decommuted.STAT_SU_PID<DecommutedPacket>:181:4',
          type: 'DynamicView',
        },
      },
    });
  });
  it('memoization', () => {
    const map = makeGetPerViewData();
    map(state, { viewId: 'v1', timebarUuid: 'tb1' });
    map.recomputations().should.eql(1);
    map(state, { viewId: 'v1', timebarUuid: 'tb1' });
    map.recomputations().should.eql(1);
    map(state, { viewId: 'v2', timebarUuid: 'tb1' });
    map.recomputations().should.eql(2);
  });
});