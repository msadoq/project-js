import _ from 'lodash/fp';
import { VM_COMMON_PROPERTIES } from './constants';

const commonPropertiesWithUuid = ['uuid', ...VM_COMMON_PROPERTIES];

// used by all 'prepareViewForStore'
export default view => ({
  ..._.pick(commonPropertiesWithUuid, view),
  configuration: _.omit(commonPropertiesWithUuid, view),
});
