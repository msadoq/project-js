// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Add basic SkeletonView . .
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';

import commonInput from '../commonInput';
import commonOutput from '../commonOutput';
import setEntryPointDefault from './setEntryPointDefault';
import prepareViewForFile from './prepareViewForFile';
import prepareViewForModel from './prepareViewForModel';
import prepareViewForStore from './prepareViewForStore';

export default {
  setEntryPointDefault,
  prepareViewForModel,
  prepareViewForFile: _.compose(commonOutput, prepareViewForFile),
  prepareViewForStore: _.compose(prepareViewForStore, commonInput),
};
