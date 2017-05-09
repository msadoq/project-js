import _ from 'lodash/fp';
import { VM_COMMON_PROPERTIES } from './constants';

// used by all 'prepareViewForFile'
const flattenConfiguration = view => ({
  ..._.pick(VM_COMMON_PROPERTIES, view),
  ...view.configuration,
});

const removeEntryPointsIds = _.update('entryPoints', _.map(_.omit('id')));

export default _.pipe(
  flattenConfiguration,
  removeEntryPointsIds
);
