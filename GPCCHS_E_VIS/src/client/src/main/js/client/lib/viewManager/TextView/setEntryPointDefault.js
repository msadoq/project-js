import { get } from '../../common/configurationManager';
import { getStateColorFilters } from '../../windowProcess/common/colors';

export default function (entryPoint) {
  return Object.assign({}, getNewTextEntryPoint(), entryPoint);
}

const getNewTextEntryPoint = () => ({
  name: 'NewEntryPoint',
  connectedData: {
    formula: '',
    unit: 's',
    digits: 5,
    format: 'decimal',
    filter: [],
    domain: get('WILDCARD_CHARACTER'),
    timeline: get('WILDCARD_CHARACTER'),
  },
  stateColors: getStateColorFilters(),
});
