import _ from 'lodash/fp';

import commonInput from '../commonInput';
import setEntryPointDefault from './setEntryPointDefault';
import prepareViewForFile from './prepareViewForFile';
import prepareViewForModel from './prepareViewForModel';
import prepareViewForStore from './prepareViewForStore';

export default {
  setEntryPointDefault,
  prepareViewForFile,
  prepareViewForModel,
  prepareViewForStore: _.compose(prepareViewForStore, commonInput),
};
