// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move few common/ modules in client/ folder
// VERSION : 1.1.2 : FA : #7164 : 07/07/2017 : Apply filters on getLast request
// VERSION : 2.0.0 : FA : ISIS-FT-2159 : 20/03/2018 : editeur champ flowType VIMA JS
// END-HISTORY
// ====================================================================

import _map from 'lodash/map';
import { PROVIDER_FLOW_HKTMR, PROVIDER_FLOW_HKTMP, PROVIDER_FLOW_RM } from '../constants';

import flattenDataId, { getDataId, getFilters, getMode } from './flattenDataId';

const data = {
  parameterName: 'ATT_BC_STR1STRRFQ1',
  catalog: 'Reporting',
  comObject: 'ReportingParameter',
  sessionId: 100,
  domainId: 200,
};
const filters = {
  'no filter': [],
  'single filter': [
    { operand: '2', operator: '=', field: 'extracted' },
  ],
  'dual filters': [
    { operand: '2', operator: '=', field: 'extracted' },
    { operand: '3', operator: '!=', field: 'raw' },
  ],
};
const modes = {
  'no mode': '',
  'mode defined': 'mode',
};
const providers = {
  'no provider': '',
  HKTMR: PROVIDER_FLOW_HKTMR,
  HKTMP: PROVIDER_FLOW_HKTMP,
  RM: PROVIDER_FLOW_RM,
};

const results = {
  'no filter': {
    'no mode': {
      'no provider': 'Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200:::',
      HKTMR: 'Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200:HKTMR::',
      HKTMP: 'Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200:HKTMP::',
      RM: 'Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200:RM::',
    },
    'mode defined': {
      'no provider': 'Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200:::mode',
      HKTMR: 'Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200:HKTMR::mode',
      HKTMP: 'Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200:HKTMP::mode',
      RM: 'Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200:RM::mode',
    },
  },
  'single filter': {
    'no mode': {
      'no provider': 'Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200::extracted.=.2:',
      HKTMR: 'Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200:HKTMR:extracted.=.2:',
      HKTMP: 'Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200:HKTMP:extracted.=.2:',
      RM: 'Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200:RM:extracted.=.2:',
    },
    'mode defined': {
      'no provider': 'Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200::extracted.=.2:mode',
      HKTMR: 'Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200:HKTMR:extracted.=.2:mode',
      HKTMP: 'Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200:HKTMP:extracted.=.2:mode',
      RM: 'Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200:RM:extracted.=.2:mode',
    },
  },
  'dual filters': {
    'no mode': {
      'no provider': 'Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200::extracted.=.2,raw.!=.3:',
      HKTMR: 'Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200:HKTMR:extracted.=.2,raw.!=.3:',
      HKTMP: 'Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200:HKTMP:extracted.=.2,raw.!=.3:',
      RM: 'Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200:RM:extracted.=.2,raw.!=.3:',
    },
    'mode defined': {
      'no provider': 'Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200::extracted.=.2,raw.!=.3:mode',
      HKTMR: 'Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200:HKTMR:extracted.=.2,raw.!=.3:mode',
      HKTMP: 'Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200:HKTMP:extracted.=.2,raw.!=.3:mode',
      RM: 'Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200:RM:extracted.=.2,raw.!=.3:mode',
    },
  },
};

describe('/data/work/gitRepositories/LPISIS/GPCCHS/GPCCHS_E_VIS/src/client/src/main/js/client/lib/common/flattenDataId', () => {
  _map(filters, (f, filterKey) => {
    _map(modes, (m, modeKey) => {
      _map(providers, (p, providerKey) => {
        test(`test flattenDataId ${filterKey}:${modeKey}:${providerKey}`, () => {
          expect(flattenDataId({
            ...data,
            provider: p,
          }, f, m)).toEqual(results[filterKey][modeKey][providerKey]);
        });
        test(`test getDataId ${filterKey}:${modeKey}:${providerKey}`, () => {
          expect(getDataId(results[filterKey][modeKey][providerKey]))
            .toEqual({
              parameterName: 'ATT_BC_STR1STRRFQ1',
              catalog: 'Reporting',
              comObject: 'ReportingParameter',
              sessionId: 100,
              domainId: 200,
              provider: p,
            });
        });
        test(`test getFilters ${filterKey}:${modeKey}:${providerKey}`, () => {
          expect(getFilters(results[filterKey][modeKey][providerKey]))
            .toEqual(f);
        });
        test(`test getMode ${filterKey}:${modeKey}:${providerKey}`, () => {
          expect(getMode(results[filterKey][modeKey][providerKey]))
            .toEqual(m);
        });
      });
    });
  });
});

