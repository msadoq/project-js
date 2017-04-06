import _ from 'lodash/fp';
import { VM_COMMON_PROPERTIES } from './constants';

// used by all 'prepareViewForFile'
export default view => ({
  ..._.pick(VM_COMMON_PROPERTIES, view),
  ...view.configuration,
});
