import _ from 'lodash/fp';
import { get } from 'common/parameters';
import { getRandomColor } from '../../windowProcess/common/colors';

export default function (entryPoint) {
  return _.merge(getNewPlotEntryPoint(), entryPoint);
}

const getNewPlotEntryPoint = () => ({
  name: 'NewEntryPoint',
  connectedData: {
    domain: get('WILDCARD_CHARACTER'),
    timeline: get('WILDCARD_CHARACTER'),
    formula: '',
    fieldX: 'onboardDate',
    unit: 'V',
    digits: 5,
    format: 'decimal',
    filter: [],
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
  stateColors: [],
});
