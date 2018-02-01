// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 17/02/2017 : Move VIVL files in lib/viewManager and fix plenty of inline view/structure type specific code
// VERSION : 1.1.2 : DM : #5828 : 05/04/2017 : Rename all prepareConfiguration* in prepareView* in viewManager
// VERSION : 1.1.2 : DM : #5828 : 06/04/2017 : Add commonOutput as identity (for now)
// VERSION : 1.1.2 : DM : #5828 : 06/04/2017 : Change prepareViewFor* behaviors . .
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';

import commonInput from '../commonInput';
import commonOutput from '../commonOutput';
import setEntryPointDefault from './setEntryPointDefault';
import prepareViewForFile from './prepareViewForFile';
import prepareViewForModel from './prepareViewForModel';
import prepareViewForStore from './prepareViewForStore';

const removeEntryPointsIds = _.update('configuration.entryPoints', _.map(_.omit('id')));
const setEntryPoints = _.update('configuration.entryPoints', _.map(setEntryPointDefault));

export default {
  setEntryPointDefault,
  prepareViewForModel,
  prepareViewForFile: _.pipe(
    removeEntryPointsIds,
    prepareViewForFile,
    commonOutput
  ),
  prepareViewForStore: _.pipe(
    commonInput,
    prepareViewForStore,
    setEntryPoints
  ),
};
