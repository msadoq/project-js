import _ from 'lodash/fp';

import commonInput from 'viewManager/commonInput';
import commonOutput from 'viewManager/commonOutput';
import prepareViewForFile from './prepareViewForFile';
import prepareViewForModel from './prepareViewForModel';
import prepareViewForStore from './prepareViewForStore';
import setEntryPointDefault from './setEntryPointDefault';

const removeEntryPointsIds = _.update('configuration.entryPoints', _.map(_.omit('id')));
const setEntryPoints = _.update('configuration.entryPoints', _.map(setEntryPointDefault));

export default {
  setEntryPointDefault,
  prepareViewForModel,
  prepareViewForFile: _.flow(
    removeEntryPointsIds,
    prepareViewForFile,
    commonOutput
  ),
  prepareViewForStore: _.flow(
    commonInput,
    prepareViewForStore,
    setEntryPoints
  ),
};
