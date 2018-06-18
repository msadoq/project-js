// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 17/02/2017 : Move VIVL files in lib/viewManager and fix plenty of
//  inline view/structure type specific code
// VERSION : 1.1.2 : DM : #5828 : 13/04/2017 : EntryPoint addition now uses GenericModal. General
//  refacto of default EntryPoints props, set in viewManager's setDefaultEntryPoint for text, plot
//  and Dynamic.
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : FA : #7755 : 18/09/2017 : PlotView setEntryPointDefault : added forgotten
//  parametric and connectedDataParametric keys.
// VERSION : 2.0.0 : FA : #8045 : 06/11/2017 : PlotView can draw string parameters, and a defaultY
//  property can be set.
// VERSION : 2.0.0 : FA : ISIS-FT-2309 : 14/11/2017 : Remove monitoring state colors mecanism + add
//  defult values for state colors + update unit tests + fix issue when removing a state color +
//  fix css code style
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : ISIS-FT-1937 : 31/01/2018 : Add unit convertion for plotview
// VERSION : 2.0.0 : FA : ISIS-FT-2309 : 31/01/2018 : surveillance du monitoringState pour
//  parametres TM VIMA
// VERSION : 2.0.0 : FA : ISIS-FT-2159 : 01/02/2018 : editeur champ flowType VIMA JS
// VERSION : 2.0.0 : FA : #10772 : 27/02/2018 : deals with default values and nested values (i.e.
//  connectedData attributes) in submitted form entry points
// VERSION : 2.0.0 : FA : ISIS-FT-2159 : 20/03/2018 : editeur champ flowType VIMA JS
// VERSION : 2.0.0.2 : FA : #11609 : 20/04/2018 : correction plot view editeur unit + label(unit) +
//  test (cherry picked from commit 3c9fde0)
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
    unit: 'Unknown',
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
    curveColor: getRandomColor(),
  },
  stateColors: [],
});
