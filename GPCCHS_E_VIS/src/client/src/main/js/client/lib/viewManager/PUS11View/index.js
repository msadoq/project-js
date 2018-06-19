import _ from 'lodash/fp';

import commonInput from 'viewManager/commonInput';
import commonOutput from 'viewManager/commonOutput';
import setCurrentVersion from 'viewManager/setCurrentVersion';
import prepareViewForFile from './prepareViewForFile';
import prepareViewForModel from './prepareViewForModel';
import prepareViewForStore from './prepareViewForStore';
import setEntryPointDefault from './setEntryPointDefault';

const setEntryPoints = _.update('configuration.entryPoints', _.map(setEntryPointDefault));

export default {
  setEntryPointDefault,
  prepareViewForModel,
  prepareViewForFile: _.flow(
    prepareViewForFile,
    commonOutput,
    setCurrentVersion
  ),
  prepareViewForStore: _.flow(
    commonInput,
    prepareViewForStore,
    setEntryPoints
  ),
};
