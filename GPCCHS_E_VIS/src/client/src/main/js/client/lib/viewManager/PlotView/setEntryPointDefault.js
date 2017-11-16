import { get } from '../../common/configurationManager';
import { getRandomColor, getStateColorFilters } from '../../windowProcess/common/colors';

export default function (entryPoint) {
  return Object.assign({}, getNewPlotEntryPoint(), entryPoint);
}

const getNewPlotEntryPoint = () => ({
  name: 'NewEntryPoint',
  parametric: false,
  connectedData: {
    domain: get('WILDCARD_CHARACTER'),
    timeline: get('WILDCARD_CHARACTER'),
    formula: '',
    fieldX: 'onboardDate',
    unit: 'V',
    digits: 5,
    format: 'decimal',
    filter: [],
    stringParameter: false,
    defaultY: 1,
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
    curveColor: getRandomColor(),
  },
  stateColors: getStateColorFilters(),
});
