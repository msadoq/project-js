// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : add entry points to mimic view
// VERSION : 1.1.2 : DM : #6129 : 18/05/2017 : Fix Add new EP in mimicview
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// END-HISTORY
// ====================================================================

import { get } from 'common/configurationManager';
import { applyDefaultValues } from 'utils/views';

export default function (entryPoint) {
  return applyDefaultValues(entryPoint, getNewMimicEntryPoint());
}

const getNewMimicEntryPoint = () => ({
  name: 'mimicEP',
  connectedData: {
    formula: '',
    unit: 's',
    convertTo: '',
    convertFrom: '',
    digits: 5,
    format: 'decimal',
    filter: [],
    domain: get('WILDCARD_CHARACTER'),
    timeline: get('WILDCARD_CHARACTER'),
    provider: get('WILDCARD_CHARACTER'),
  },
  stateColors: [],
});
