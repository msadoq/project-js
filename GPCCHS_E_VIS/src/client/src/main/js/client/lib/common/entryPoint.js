import { getRandomColor } from '../windowProcess/common/colors';

export const getNewTextEntryPoint = () => ({
  name: 'NewEntryPoint',
  connectedData: {
    formula: '',
    unit: 's',
    digits: 5,
    format: 'decimal',
    filter: [],
    domain: '*',
    timeline: '*',
  },
});

export const getNewPlotEntryPoint = () => ({
  name: 'NewEntryPoint',
  connectedData: {
    formula: '',
    fieldX: '',
    unit: 'V',
    digits: 5,
    format: 'decimal',
    filter: [],
    domain: '*',
    timeline: '*',
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
  stateColors: [
  ],
});
