/* eslint no-unused-expressions: 0 */

import '../../test';
import missingRemoteIds from './missingRemoteIds';
import { inspect } from 'util';

describe('missingRemoteIds', () => {
  const map = {
    myRemoteId: {
      structureType: 'range',
      dataId: {
        catalog: 'Reporting',
        parameterName: 'TMMGT_BC_VIRTCHAN3',
        comObject: 'ReportingParameter',
        domainId: 27,
        sessionId: 1,
      },
      filter: [
        {
          field: 'convertedValue',
          operator: '!=',
          operand: 0,
        },
      ],
      localIds: {
        myLocalId: {
          field: 'groundDate',
          timebarId: 'myTimebarId',
          offset: 0,
          expectedInterval: [10, 20],
        },
      },
    },
  };

  it('works', () => {
    console.log(inspect(missingRemoteIds(map), { depth: 5 }));
    console.log(inspect(missingRemoteIds(map), { depth: 5 }));
  });
});
