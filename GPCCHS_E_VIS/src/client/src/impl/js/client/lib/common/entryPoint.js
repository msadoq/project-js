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

// eslint-disable-next-line import/prefer-default-export
export const getNewPlotEntryPoint = () => ({
  name: 'NewEntryPoint',
  connectedDataX: {
    formula: '',
    unit: 's',
    digits: 5,
    format: 'decimal',
    filter: [],
    domain: '*',
    timeline: '*',
  },
  connectedDataY: {
    formula: '',
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
    curveColor: getRandomColor()
  },
  stateColors: [
  ]
});
