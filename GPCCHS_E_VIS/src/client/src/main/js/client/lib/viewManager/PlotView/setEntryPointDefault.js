// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 17/02/2017 : Move VIVL files in lib/viewManager and fix plenty of inline view/structure type specific code
// VERSION : 1.1.2 : DM : #5828 : 13/04/2017 : EntryPoint addition now uses GenericModal. General refacto of default EntryPoints props, set in viewManager's setDefaultEntryPoint for text, plot and Dynamic.
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : FA : #7755 : 18/09/2017 : PlotView setEntryPointDefault : added forgotten parametric and connectedDataParametric keys.
// END-HISTORY
// ====================================================================

import { get } from 'common/configurationManager';
import { getRandomColor, getStateColorFilters } from 'windowProcess/common/colors';

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
