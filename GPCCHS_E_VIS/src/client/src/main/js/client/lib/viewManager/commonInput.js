import _ from 'lodash/fp';
import { VM_COMMON_PROPERTIES } from './constants';

// used by all 'prepareViewForStore'
export default view => ({
  ..._.pick(VM_COMMON_PROPERTIES, view),
  configuration: _.omit(VM_COMMON_PROPERTIES, view),
});
