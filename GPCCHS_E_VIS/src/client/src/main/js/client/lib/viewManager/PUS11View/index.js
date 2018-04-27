import _ from 'lodash/fp';

import commonInput from 'viewManager/commonInput';
import commonOutput from 'viewManager/commonOutput';
import prepareViewForFile from './prepareViewForFile';
import prepareViewForModel from './prepareViewForModel';
import prepareViewForStore from './prepareViewForStore';

export default {
  prepareViewForModel,
  prepareViewForFile: _.flow(
    prepareViewForFile,
    commonOutput
  ),
  prepareViewForStore: _.flow(
    commonInput,
    prepareViewForStore
  ),
};
