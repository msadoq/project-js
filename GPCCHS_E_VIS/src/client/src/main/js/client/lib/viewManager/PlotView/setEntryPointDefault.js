// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 17/02/2017 : Move VIVL files in lib/viewManager and fix plenty of inline view/structure type specific code
// VERSION : 1.1.2 : DM : #5828 : 13/04/2017 : EntryPoint addition now uses GenericModal. General refacto of default EntryPoints props, set in viewManager's setDefaultEntryPoint for text, plot and Dynamic.
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : FA : #7755 : 18/09/2017 : PlotView setEntryPointDefault : added forgotten parametric and connectedDataParametric keys.
// END-HISTORY
// ====================================================================

import { get } from 'common/configurationManager';
import { getRandomColor } from 'windowProcess/common/colors';
import { applyDefaultValues } from 'utils/views';
import { PROVIDER_FLOW_ALL } from '../../constants';

export default function (entryPoint) {
  return applyDefaultValues(entryPoint, getNewPlotEntryPoint());
}

const getNewPlotEntryPoint = () => ({
  name: 'plotEP',
  parametric: false,
  connectedData: {
    domain: get('WILDCARD_CHARACTER'),
    timeline: get('WILDCARD_CHARACTER'),
    provider: PROVIDER_FLOW_ALL,
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
    displayLine: true,
    displayPoints: false,
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
