import { get } from '../../common/configurationManager';
import { getStateColorFilters } from '../../windowProcess/common/colors';

export default function (entryPoint) {
  return Object.assign({}, getNewDynamicEntryPoint(), entryPoint);
}

const getNewDynamicEntryPoint = () => ({
  name: 'dynamicEP',
  connectedData: {
    domain: get('WILDCARD_CHARACTER'),
    timeline: get('WILDCARD_CHARACTER'),
    formula: '',
  },
  stateColors: getStateColorFilters(),
});
