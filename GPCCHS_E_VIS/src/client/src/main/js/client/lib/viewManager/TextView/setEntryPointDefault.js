import _ from 'lodash/fp';
import { get } from 'common/parameters';

export default function (entryPoint) {
  return _.merge(getNewTextEntryPoint(), entryPoint);
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
});
