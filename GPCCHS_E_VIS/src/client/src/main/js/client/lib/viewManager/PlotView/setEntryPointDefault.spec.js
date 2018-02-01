import { get } from 'common/configurationManager';
import setEntryPointDefault from 'viewManager/PlotView/setEntryPointDefault';

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
          provider: get('WILDCARD_CHARACTER'),
          formula: '',
          fieldX: 'onboardDate',
          unit: 'V',
          digits: 5,
          format: 'decimal',
          filter: [],
          stringParameter: false,
          defaultY: 1,
          convertFrom: '',
          convertTo: '',
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
        },
        stateColors: [],
      });
    });
  });
});
