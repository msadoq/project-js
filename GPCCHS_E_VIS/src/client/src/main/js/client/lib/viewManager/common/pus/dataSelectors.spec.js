import {
  getPUSViewData,
  getEntryPointsByViewId,
  pusDataAggregation,
} from './dataSelectors';

describe('viewManager/TextView/store/dataSelector', () => {
  describe('getEntryPointsByViewId', () => {
    test('given an empty state, should return an empty array', () => {
      const state = {};
      const viewId = 'blah';
      const pusService = 11;
      expect(getEntryPointsByViewId(state, { viewId, pusService })).toEqual([]);
    });
    test('given state with only PUS12ViewConfiguration, when ask for PUS11ViewConfiguration ,should return an empty array', () => {
      const state = {
        PUS12ViewConfiguration: {
          blah: {
            entryPoints: [
              {
                connectedData: {
                  domainId: 0,
                },
              },
            ],
          },
        },
      };
      const viewId = 'blah';
      const pusService = 11;
      expect(getEntryPointsByViewId(state, { viewId, pusService })).toEqual([]);
    });
    test('given state with PUS11ViewConfiguration, when ask for PUS11ViewConfiguration, should return an array with all entryPoints', () => {
      const state = {
        PUS11ViewConfiguration: {
          blah: {
            entryPoints: [
              {
                connectedData: {
                  domainId: 0,
                },
              },
            ],
          },
        },
      };
      const viewId = 'blah';
      const pusService = 11;
      expect(getEntryPointsByViewId(state, { viewId, pusService })).toEqual(
        [
          {
            connectedData: {
              domainId: 0,
            },
          },
        ]
      );
    });
  });

  describe('getEntryPointsByViewId', () => {
    test('given an empty set of models and tablesIds, should return an object with two empty entries', () => {
      const models = [];
      const tablesIds = [];
      expect(pusDataAggregation(models, tablesIds)).toEqual({
        headers: [],
        dataForTables: {},
      });
    });
    test('given an empty set of models and with tablesIds, should return an object with empty array of headers', () => {
      const models = [];
      const tablesIds = ['foo'];
      expect(pusDataAggregation(models, tablesIds)).toEqual({
        headers: [],
        dataForTables: {
          foo: [],
        },
      });
    });
    test('given a set of models with tablesIds, should return an object with empty array of headers', () => {
      const models = [
        {
          payload: {
            foo: 0,
            bar: [
              {
                blah: 'blah',
              },
              {
                blouh: 'blouh',
              },
            ],
            barz: 0,
          },
        },
        {
          payload: {
            foo: 2,
            bar: [
              {
                blah: 'blih',
              },
              {
                blouh: 'bluh',
              },
            ],
            barz: 2,
          },
        },
      ];
      const tablesIds = ['bar'];
      expect(pusDataAggregation(models, tablesIds)).toEqual({
        headers: [
          {
            foo: 0,
            barz: 0,
          },
          {
            foo: 2,
            barz: 2,
          },
        ],
        dataForTables: {
          bar: [
            {
              blah: 'blah',
            },
            {
              blouh: 'blouh',
            },
            {
              blah: 'blih',
            },
            {
              blouh: 'bluh',
            },
          ],
        },
      });
    });
  });

  describe('getPUSViewData', () => {
    test('given a non empty state with zero knownPus, should return an object with 2 entries (dataForTables, headers) with no data', () => {
      const state = {
        pages: {
          page: {
            views: [
              'foo',
            ],
          },
        },
        domains: [
          {
            domainId: 42,
            itemNamespace: 'Domains',
            name: 'fr.cnes.isis',
          },
        ],
        sessions: [
          {
            id: 0,
            name: 'Session',
            timestamp: {
              ms: 1533642370526,
              ps: 0,
            },
          },
        ],
        timelines: {
          blah: {
            id: 'Session',
            sessionName: 'Session',
          },
        },
        PUS11ViewConfiguration: {
          foo: {
            entryPoints: [
              {
                connectedData: {
                  domain: 'fr.cnes.isis',
                  timeline: 'Session',
                  apids: [
                    {
                      apidName: 'bar',
                      apidRawValue: 0,
                    },
                    {
                      apidName: 'barz',
                      apidRawValue: 2,
                    },
                  ],
                },
              },
            ],
          },
        },
        knownPus: {},
      };
      const viewId = 'foo';
      const pusService = 11;
      expect(getPUSViewData(state, { viewId, pusService })).toEqual(
        {
          dataForTables: {
            pus011Apid: [
              {},
              {},
            ],
            pus011Command: [
              {},
              {},
            ],
            pus011SubSchedule: [
              {},
              {},
            ],
          },
          headers: [
            {},
            {},
          ],
        }
      );
    });
    test('given a non empty state with knowPus but no delta, should return an object with 2 entries (dataForTables, headers) with data', () => {
      const state = {
        pages: {
          page: {
            views: [
              'foo',
            ],
            timebarUuid: 'blouh',
          },
        },
        domains: [
          {
            domainId: 42,
            itemNamespace: 'Domains',
            name: 'fr.cnes.isis',
          },
        ],
        sessions: [
          {
            id: 0,
            name: 'Session',
            timestamp: {
              ms: 1533642370526,
              ps: 0,
            },
          },
        ],
        timelines: {
          blah: {
            id: 'Session',
            sessionName: 'Session',
          },
        },
        timebarTimelines: {
          blouh: ['blah'],
        },
        timebars: {
          blouh: {
            visuWindow: {
              current: 1533642370526,
              lower: 1533641770526,
              upper: 1533642400526,
            },
          },
        },
        PUS11ViewConfiguration: {
          foo: {
            entryPoints: [
              {
                connectedData: {
                  domain: 'fr.cnes.isis',
                  timeline: 'Session',
                  apids: [
                    {
                      apidName: 'bar',
                      apidRawValue: 0,
                    },
                    {
                      apidName: 'barz',
                      apidRawValue: 2,
                    },
                  ],
                },
              },
            ],
          },
        },
        knownPus: {
          11: {
            '0,2:0:42': {
              0: {
                model: {
                  groudDate: 1533642070526,
                  payload: {
                    foo: 0,
                    pus011Apid: [
                      {
                        aaa: 'aaa',
                      },
                      {
                        bbb: 'bbb',
                      },
                    ],
                    pus011Command: [
                      {
                        ccc: 'ccc',
                      },
                      {
                        ddd: 'ddd',
                      },
                    ],
                    pus011SubSchedule: [
                      {
                        eee: 'eee',
                      },
                      {
                        fff: 'fff',
                      },
                    ],
                    barz: 0,
                  },
                },
                deltas: {},
              },
              2: {
                model: {
                  groudDate: 1533642070526,
                  payload: {
                    foo: 2,
                    pus011Apid: [
                      {
                        ggg: 'ggg',
                      },
                      {
                        hhh: 'hhh',
                      },
                    ],
                    pus011Command: [
                      {
                        iii: 'iii',
                      },
                      {
                        jjj: 'jjj',
                      },
                    ],
                    pus011SubSchedule: [
                      {
                        kkk: 'kkk',
                      },
                      {
                        lll: 'lll',
                      },
                    ],
                    barz: 2,
                  },
                },
                deltas: {},
              },
            },
          },
        },
      };
      const viewId = 'foo';
      const pusService = 11;
      expect(getPUSViewData(state, { viewId, pusService })).toEqual(
        {
          dataForTables: {
            pus011Apid: [
              {
                aaa: 'aaa',
              },
              {
                bbb: 'bbb',
              },
              {
                ggg: 'ggg',
              },
              {
                hhh: 'hhh',
              },
            ],
            pus011Command: [
              {
                ccc: 'ccc',
              },
              {
                ddd: 'ddd',
              },
              {
                iii: 'iii',
              },
              {
                jjj: 'jjj',
              },
            ],
            pus011SubSchedule: [
              {
                eee: 'eee',
              },
              {
                fff: 'fff',
              },
              {
                kkk: 'kkk',
              },
              {
                lll: 'lll',
              },
            ],
          },
          headers: [
            {
              barz: 0,
              foo: 0,
            },
            {
              barz: 2,
              foo: 2,
            },
          ],
        }
      );
    });
    test('given a non empty state with knowPus with delta before current time, should return an object with 2 entries (dataForTables, headers) with data', () => {
      const state = {
        pages: {
          yop: {
            views: [
              'foo',
            ],
            type: 'Page',
            timebarUuid: 'blouh',
            uuid: 'yop',
          },
        },
        domains: [
          {
            domainId: 42,
            itemNamespace: 'Domains',
            name: 'fr.cnes.isis',
          },
        ],
        sessions: [
          {
            id: 0,
            name: 'Session',
            timestamp: {
              ms: 1533642370526,
              ps: 0,
            },
          },
        ],
        timelines: {
          blah: {
            id: 'Session',
            sessionName: 'Session',
          },
        },
        timebarTimelines: {
          blouh: ['blah'],
        },
        timebars: {
          blouh: {
            uuid: 'blouh',
            visuWindow: {
              current: 1533642370526,
              lower: 1533641770526,
              upper: 1533642400526,
            },
          },
        },
        PUS11ViewConfiguration: {
          foo: {
            entryPoints: [
              {
                connectedData: {
                  domain: 'fr.cnes.isis',
                  timeline: 'Session',
                  apids: [
                    {
                      apidName: 'bar',
                      apidRawValue: 0,
                    },
                    {
                      apidName: 'barz',
                      apidRawValue: 2,
                    },
                  ],
                },
              },
            ],
          },
        },
        knownPus: {
          11: {
            '0,2:0:42': {
              0: {
                model: {
                  groudDate: 1533642070526,
                  payload: {
                    foo: 0,
                    pus011Apid: [
                      {
                        aaa: 'aaa',
                        uniqueId: 0,
                      },
                      {
                        bbb: 'bbb',
                        uniqueId: 1,
                      },
                    ],
                    pus011Command: [
                      {
                        ccc: 'ccc',
                        uniqueId: 2,
                      },
                      {
                        ddd: 'ddd',
                        uniqueId: 3,
                      },
                    ],
                    pus011SubSchedule: [
                      {
                        eee: 'eee',
                        uniqueId: 4,
                      },
                      {
                        fff: 'fff',
                        uniqueId: 5,
                      },
                    ],
                    barz: 0,
                  },
                },
                deltas: {
                  1533642370522: {
                    dataType: 5,
                    payload: {
                      uniqueId: 5,
                      fff: 'foo',
                    },
                  },
                },
              },
              2: {
                model: {
                  groudDate: 1533642070526,
                  payload: {
                    foo: 2,
                    pus011Apid: [
                      {
                        ggg: 'ggg',
                      },
                      {
                        hhh: 'hhh',
                      },
                    ],
                    pus011Command: [
                      {
                        iii: 'iii',
                      },
                      {
                        jjj: 'jjj',
                      },
                    ],
                    pus011SubSchedule: [
                      {
                        kkk: 'kkk',
                      },
                      {
                        lll: 'lll',
                      },
                    ],
                    barz: 2,
                  },
                },
                deltas: {},
              },
            },
          },
        },
      };
      const viewId = 'foo';
      const pusService = 11;
      expect(getPUSViewData(state, { viewId, pusService })).toEqual(
        {
          dataForTables: {
            pus011Apid: [
              {
                aaa: 'aaa',
                uniqueId: 0,
              },
              {
                bbb: 'bbb',
                uniqueId: 1,
              },
              {
                ggg: 'ggg',
              },
              {
                hhh: 'hhh',
              },
            ],
            pus011Command: [
              {
                ccc: 'ccc',
                uniqueId: 2,
              },
              {
                ddd: 'ddd',
                uniqueId: 3,
              },
              {
                iii: 'iii',
              },
              {
                jjj: 'jjj',
              },
            ],
            pus011SubSchedule: [
              {
                eee: 'eee',
                uniqueId: 4,
              },
              {
                fff: 'foo',
                uniqueId: 5,
              },
              {
                kkk: 'kkk',
              },
              {
                lll: 'lll',
              },
            ],
          },
          headers: [
            {
              barz: 0,
              foo: 0,
            },
            {
              barz: 2,
              foo: 2,
            },
          ],
        }
      );
    });
    test('given a non empty state with knowPus with delta after current time, should return an object with 2 entries (dataForTables, headers) with data', () => {
      const state = {
        pages: {
          yop: {
            views: [
              'foo',
            ],
            type: 'Page',
            timebarUuid: 'blouh',
            uuid: 'yop',
          },
        },
        domains: [
          {
            domainId: 42,
            itemNamespace: 'Domains',
            name: 'fr.cnes.isis',
          },
        ],
        sessions: [
          {
            id: 0,
            name: 'Session',
            timestamp: {
              ms: 1533642370526,
              ps: 0,
            },
          },
        ],
        timelines: {
          blah: {
            id: 'Session',
            sessionName: 'Session',
          },
        },
        timebarTimelines: {
          blouh: ['blah'],
        },
        timebars: {
          blouh: {
            uuid: 'blouh',
            visuWindow: {
              current: 1533642370526,
              lower: 1533641770526,
              upper: 1533642400526,
            },
          },
        },
        PUS11ViewConfiguration: {
          foo: {
            entryPoints: [
              {
                connectedData: {
                  domain: 'fr.cnes.isis',
                  timeline: 'Session',
                  apids: [
                    {
                      apidName: 'bar',
                      apidRawValue: 0,
                    },
                    {
                      apidName: 'barz',
                      apidRawValue: 2,
                    },
                  ],
                },
              },
            ],
          },
        },
        knownPus: {
          11: {
            '0,2:0:42': {
              0: {
                model: {
                  groudDate: 1533642070526,
                  payload: {
                    foo: 0,
                    pus011Apid: [
                      {
                        aaa: 'aaa',
                        uniqueId: 0,
                      },
                      {
                        bbb: 'bbb',
                        uniqueId: 1,
                      },
                    ],
                    pus011Command: [
                      {
                        ccc: 'ccc',
                        uniqueId: 2,
                      },
                      {
                        ddd: 'ddd',
                        uniqueId: 3,
                      },
                    ],
                    pus011SubSchedule: [
                      {
                        eee: 'eee',
                        uniqueId: 4,
                      },
                      {
                        fff: 'fff',
                        uniqueId: 5,
                      },
                    ],
                    barz: 0,
                  },
                },
                deltas: {
                  1533642400522: {
                    dataType: 5,
                    payload: {
                      uniqueId: 5,
                      fff: 'foo',
                    },
                  },
                },
              },
              2: {
                model: {
                  groudDate: 1533642070526,
                  payload: {
                    foo: 2,
                    pus011Apid: [
                      {
                        ggg: 'ggg',
                      },
                      {
                        hhh: 'hhh',
                      },
                    ],
                    pus011Command: [
                      {
                        iii: 'iii',
                      },
                      {
                        jjj: 'jjj',
                      },
                    ],
                    pus011SubSchedule: [
                      {
                        kkk: 'kkk',
                      },
                      {
                        lll: 'lll',
                      },
                    ],
                    barz: 2,
                  },
                },
                deltas: {},
              },
            },
          },
        },
      };
      const viewId = 'foo';
      const pusService = 11;
      expect(getPUSViewData(state, { viewId, pusService })).toEqual(
        {
          dataForTables: {
            pus011Apid: [
              {
                aaa: 'aaa',
                uniqueId: 0,
              },
              {
                bbb: 'bbb',
                uniqueId: 1,
              },
              {
                ggg: 'ggg',
              },
              {
                hhh: 'hhh',
              },
            ],
            pus011Command: [
              {
                ccc: 'ccc',
                uniqueId: 2,
              },
              {
                ddd: 'ddd',
                uniqueId: 3,
              },
              {
                iii: 'iii',
              },
              {
                jjj: 'jjj',
              },
            ],
            pus011SubSchedule: [
              {
                eee: 'eee',
                uniqueId: 4,
              },
              {
                fff: 'fff',
                uniqueId: 5,
              },
              {
                kkk: 'kkk',
              },
              {
                lll: 'lll',
              },
            ],
          },
          headers: [
            {
              barz: 0,
              foo: 0,
            },
            {
              barz: 2,
              foo: 2,
            },
          ],
        }
      );
    });
  });
});
