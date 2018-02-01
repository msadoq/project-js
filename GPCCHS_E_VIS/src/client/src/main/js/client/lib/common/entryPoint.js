// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : FA : #5316 : 09/02/2017 : Remove all eslint-disable import/prefer-default-export .
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : add entry points to mimic view
// VERSION : 1.1.2 : DM : #5828 : 13/04/2017 : EntryPoint addition now uses GenericModal. General refacto of default EntryPoints props, set in viewManager's setDefaultEntryPoint for text, plot and Dynamic.
// END-HISTORY
// ====================================================================

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

export const getNewMimicEntryPoint = () => ({
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
