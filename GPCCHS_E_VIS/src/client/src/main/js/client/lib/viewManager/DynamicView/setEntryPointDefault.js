import _ from 'lodash/fp';
import { get } from 'common/parameters';

export default function (entryPoint) {
  return _.merge(getNewDynamicEntryPoint(), entryPoint);
}

const getNewDynamicEntryPoint = () => ({
  name: 'dynamicEP',
  domain: get('WILDCARD_CHARACTER'),
  timeline: get('WILDCARD_CHARACTER'),
  formula: '',
});
