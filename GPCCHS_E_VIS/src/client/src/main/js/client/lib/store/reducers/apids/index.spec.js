import { freezeArgs, freezeMe } from 'common/jest';
import {
  WS_APIDS_ASK,
  WS_APIDS_ADD,
} from 'store/types';
import apidsReducer, {
  getApidsByDomainIdAndSessionId,
} from '.';
import { getTupleId } from '../catalogs';

const reducer = freezeArgs(apidsReducer);
const domainId = 'domain-id';
const sessionId = 'session-id';
const tupleId = `${domainId}-${sessionId}`;
const applicationProcesses = [
  {
    apidName: '0',
    apidRawValue: 'TIMEPACKET',
  },
  {
    apidName: '1',
    apidRawValue: 'ATTITUDE',
  },
  {
    apidName: '2',
    apidRawValue: 'ORBIT',
  },
  {
    apidName: '3',
    apidRawValue: 'POWERMGT',
  },
  {
    apidName: '4',
    apidRawValue: 'SATELLITE',
  },
  {
    apidName: '5',
    apidRawValue: 'MISSION',
  },
  {
    apidName: '6',
    apidRawValue: 'FILEMGT',
  },
  {
    apidName: '7',
    apidRawValue: 'TELEMETRYMGT',
  },
  {
    apidName: '8',
    apidRawValue: 'OBCPENGINE1',
  },
  {
    apidName: '9',
    apidRawValue: 'OBCPENGINE2',
  },
  {
    apidName: '10',
    apidRawValue: 'TCFILEMGT',
  },
  {
    apidName: '2047',
    apidRawValue: 'IDLEPACKET',
  },
];
const apid = {
  name: 'GENE_TF_LCCSDSAPID_CALIBRATOR',
  applicationProcesses,
};
const state = {
  domains: [
    {
      domainId,
    },
  ],
  sessions: [
    {
      id: sessionId,
    },
  ],
  apids: {
    [tupleId]: [apid],
  },
};

describe('store:apids:reducer', () => {
  test('apidsReducer :: freeze state and return state on unknown action', () => {
    expect(apidsReducer(freezeMe(state), { type: undefined }))
      .toEqual(state);
  });
  test('apidsReducer :: WS_APIDS_ASK', () => {
    expect(apidsReducer(freezeMe({}), {
      type: WS_APIDS_ASK,
      payload: {
        domainId: 'domain-id',
        sessionId: 'session-id',
      },
    })).toEqual({
      [tupleId]: 'requesting',
    });
  });
  test('apidsReducer :: WS_APIDS_ADD', () => {
    expect(apidsReducer(freezeMe({}), {
      type: WS_APIDS_ADD,
      payload: {
        tupleId,
        apids: ['apids'],
      },
    })).toEqual({
      [tupleId]: ['apids'],
    });
  });
});

describe('store:catalogs:selectors', () => {
  test('initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });
  test('unknown action', () => {
    expect(reducer({
      [tupleId]: [
        {
          name: 'GENE_TF_LCCSDSAPID_CALIBRATOR',
        },
      ],
    }, {})).toEqual({
      [tupleId]: [
        {
          name: 'GENE_TF_LCCSDSAPID_CALIBRATOR',
        },
      ],
    });
  });
  test('should return the whole list', () => {
    expect(getTupleId('domain-id', 'session-id')).toBe('domain-id-session-id');
  });
  test('getApidsByDomainIdAndSessionId :: should return the required catalog', () => {
    expect(getApidsByDomainIdAndSessionId(state, { domainId, sessionId }))
      .toEqual([apid]);
  });
  test('getApidsByDomainIdAndSessionId :: should return null', () => {
    expect(getApidsByDomainIdAndSessionId(state, { domainId, sessionId: 'undefined' }))
      .toEqual(null);
  });
});
