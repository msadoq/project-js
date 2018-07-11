import _ from 'lodash';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import {
  isDroppedDataValid,
  buildTable,
  sortKeys,
} from './DynamicView';
import { DynamicViewData } from '../../../../common/jest/stateTest';


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

const decommutedValues = DynamicViewData.dynamic1.value.decommutedValues;

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
  describe('buildTable', () => {
    it('should render \'no data\' with empty argument', () => {
      expect(buildTable([])).toBe('no data');
    });
    it('should render a table with decommuted values', () => {
      const table = shallow(buildTable(decommutedValues));
      expect(table.type()).toEqual('table');
    });
    test('should match the snapshot', () => {
      const component = renderer.create(buildTable(decommutedValues));
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('sortKeys', () => {
    it('should place n before all', () => {
      const firstChars = ['c', 'r', 'e', 'v'];
      firstChars.map(c => expect(sortKeys('n', c) < 0).toBe(true));
    });
    it('decommuted value keys should match proper order', () => {
      const sortedKeys = Object.keys(decommutedValues[0]).sort(sortKeys);
      expect(sortedKeys).toEqual(['name', 'convertedValue', 'rawValue', 'extractedValue', 'validityState']);
    });
  });
});
