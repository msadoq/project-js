// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView . .
// END-HISTORY
// ====================================================================

import { get } from 'common/configurationManager';
import { applyDefaultValues } from 'utils/views';

export default function (entryPoint) {
  return applyDefaultValues(entryPoint, getNewHistoryEntryPoint());
}

const getNewHistoryEntryPoint = () => ({
  name: 'historyEP',
  connectedData: {
    formula: '',
    filter: [],
    domain: get('WILDCARD_CHARACTER'),
    timeline: get('WILDCARD_CHARACTER'),
    provider: get('WILDCARD_CHARACTER'),
  },
  stateColors: [],
});
