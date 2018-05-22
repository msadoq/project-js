import _ from 'lodash';
import {
  isDroppedDataValid,
} from './DynamicView';

const invalidEP = {
  comObjects: [
    'ReportingParameter',
  ],
  item: 'AIV_TM_HK9018P069',
  nameSpace: 'SDB',
  sessionName: '600',
};

const invalidEP2 = {
  catalogName: 'Reporting',
  item: 'AIV_TM_HK9018P069',
  nameSpace: 'SDB',
  sessionName: '600',
};

const singleReportingEP = {
  catalogName: 'Reporting',
  comObjects: [
    'ReportingParameter',
  ],
  item: 'AIV_TM_HK9018P069',
  nameSpace: 'SDB',
  sessionName: '600',
};

const clcwPacketEP = {
  catalogName: 'TelemetryPacket',
  comObjects: [
    'CLCW',
    'DecommutedPacket',
    'IsisAggregation',
    'RM',
    'TM',
  ],
  item: 'AIV_TM_HK9000',
  nameSpace: 'SDB',
  sessionName: '600',
};

const decommutedPacket = {
  catalogName: 'TelemetryPacket',
  comObjects: [
    'CLCW',
    'DecommutedPacket',
    'IsisAggregation',
    'RM',
    'TM',
  ],
  nameSpace: 'SDB',
  sessionName: '600',
};

describe('viewManager/DynamicView/Components/View/DynamicView', () => {
  describe('isDroppedDataValid', () => {
    _.map([undefined, '', null, 'lqskdj', invalidEP, invalidEP2], (test) => {
      it(`should be invalid to drop wrong data, or malformed EP - ${test}`, () => {
        expect(isDroppedDataValid(test)).toBe(false);
      });
    });
    _.map([singleReportingEP, clcwPacketEP, decommutedPacket], (test) => {
      it(`should be valid to drop well validated EP - ${test}`, () => {
        expect(isDroppedDataValid(test)).toBe(true);
      });
    });
  });
});
