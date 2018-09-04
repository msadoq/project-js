
import { get } from 'common/configurationManager';
import setEntryPointDefault from 'viewManager/PlotView/setEntryPointDefault';
import { PROVIDER_FLOW_ALL } from '../../constants';

jest.mock('windowProcess/common/colors', () => ({
  getRandomColor: () => '#00FF00',
}));
describe('viewManager', () => {
  describe('viewManager :: PlotView', () => {
    test('viewManager :: PlotView :: setEntryPointDefault', () => {
      expect(setEntryPointDefault({})).toEqual({
        name: 'plotEP',
        parametric: false,
        connectedData: {
          domain: get('WILDCARD_CHARACTER'),
          timeline: get('WILDCARD_CHARACTER'),
          provider: PROVIDER_FLOW_ALL,
          formula: '',
          fieldX: 'onboardDate',
          unit: 'Unknown',
          digits: 5,
          format: 'decimal',
          filter: [],
          stringParameter: false,
          defaultY: 1,
          convertFrom: '',
          convertTo: '',
          catalog: '',
          catalogItem: '',
          comObject: '',
          comObjectField: '',
        },
        connectedDataParametric: {
          formulaX: '',
          formulaY: '',
          domainX: '',
          domainY: '',
          unitX: '',
          unitY: '',
          xAxisId: '',
          yAxisId: '',
        },
        objectStyle: {
          line: {
            style: 'Continuous',
            size: 3,
          },
          points: {
            style: 'None',
            size: 3,
          },
          curveColor: '#00FF00',
          displayLine: true,
          displayPoints: false,
        },
        stateColors: [],
      });
    });

    test('when no unit is defined, sets all default values', () => {
      expect(setEntryPointDefault({ name: 'truc' })).toEqual({
        name: 'truc',
        parametric: false,
        connectedData: {
          domain: get('WILDCARD_CHARACTER'),
          timeline: get('WILDCARD_CHARACTER'),
          provider: PROVIDER_FLOW_ALL,
          formula: '',
          fieldX: 'onboardDate',
          unit: 'Unknown',
          digits: 5,
          format: 'decimal',
          filter: [],
          stringParameter: false,
          defaultY: 1,
          convertFrom: '',
          convertTo: '',
          catalog: '',
          catalogItem: '',
          comObject: '',
          comObjectField: '',
        },
        connectedDataParametric: {
          formulaX: '',
          formulaY: '',
          domainX: '',
          domainY: '',
          unitX: '',
          unitY: '',
          xAxisId: '',
          yAxisId: '',
        },
        objectStyle: {
          line: {
            style: 'Continuous',
            size: 3,
          },
          points: {
            style: 'None',
            size: 3,
          },
          curveColor: '#00FF00',
          displayLine: true,
          displayPoints: false,
        },
        stateColors: [],
      });
    });

    test('when a unit is defined, sets all other default connected data', () => {
      expect(setEntryPointDefault({ name: 'truc', connectedData: { unit: 'T' } })).toEqual({
        name: 'truc',
        parametric: false,
        connectedData: {
          domain: get('WILDCARD_CHARACTER'),
          timeline: get('WILDCARD_CHARACTER'),
          provider: PROVIDER_FLOW_ALL,
          formula: '',
          fieldX: 'onboardDate',
          unit: 'T',
          digits: 5,
          format: 'decimal',
          filter: [],
          stringParameter: false,
          defaultY: 1,
          convertFrom: '',
          convertTo: '',
          catalog: '',
          catalogItem: '',
          comObject: '',
          comObjectField: '',
        },
        connectedDataParametric: {
          formulaX: '',
          formulaY: '',
          domainX: '',
          domainY: '',
          unitX: '',
          unitY: '',
          xAxisId: '',
          yAxisId: '',
        },
        objectStyle: {
          line: {
            style: 'Continuous',
            size: 3,
          },
          points: {
            style: 'None',
            size: 3,
          },
          curveColor: '#00FF00',
          displayLine: true,
          displayPoints: false,
        },
        stateColors: [],
      });
    });
  });
});
