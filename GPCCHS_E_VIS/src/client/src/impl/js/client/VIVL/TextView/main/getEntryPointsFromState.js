import { get } from 'lodash';

export default function getEntryPointsFromState(configuration) {
  return get(configuration, ['textViewEntryPoints'], []);
}
