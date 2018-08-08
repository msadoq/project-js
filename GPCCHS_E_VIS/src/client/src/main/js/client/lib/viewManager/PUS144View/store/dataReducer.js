// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView . .
// VERSION : 1.1.2 : DM : #6127 : 12/09/2017 : Creation of history view data store
// VERSION : 1.1.2 : DM : #6127 : 12/09/2017 : Update of history view data store
// END-HISTORY
// ====================================================================

/* eslint-disable complexity, "DV6 TBC_CNES Redux reducers should be implemented as switch case" */
import _ from 'lodash/fp';
import parameters from 'common/configurationManager';

import { VM_VIEW_PUS144 } from '../../constants';
import createScopedDataReducer from '../../commonData/createScopedDataReducer';
import { INJECT_PUS_DATA } from '../../../store/types';
import { injectTabularData } from '../../commonData/reducer';

// eslint-disable-next-line no-unused-vars
function pus144DataReducer(state = {}, action) {
  switch (action.type) {
    case INJECT_PUS_DATA: {
      /**
       * action.payload: {
       *  timestamp: number,
       *  data: {
       *    PUS144View: {
       *       pus144OnboardFiles: [
       *         {
       *           ...
       *         },
       *         {
       *           ...
       *         },
       *       ]
       *    },
       *  },
       * },
       */

      const data = _.getOr(null, ['payload', 'data', VM_VIEW_PUS144], action);
      if (!data) {
        return state;
      }
      let updatedState = state;

      const fileProtectionStatuses = parameters.get('PUS_CONSTANTS').FILE_PROTECTION_STATUS;
      const updateTypes = parameters.get('PUS_CONSTANTS').UPDATE_TYPE;
      const fileModes = parameters.get('PUS_CONSTANTS').FILE_MODE;

      // keep all except tabular data
      updatedState = {
        ..._.omit(
          ['pus144OnboardFiles'],
          data
        ),
      };

      // injectTabularData: add data tables to dedicated injectTabularData (VirtualizedTableView)
      updatedState = injectTabularData(updatedState, 'onBoardPartitions',
        _.getOr(null, ['pus144OnboardFiles'], data)
        .map(store => ({
          ...store,
          fileProtectionStatus: fileProtectionStatuses[_.get('fileProtectionStatus', store)],
          fileMode: fileModes[_.get('fileMode', store)],
          ...store.isFileSizeSet ? {
            fileSize: _.get('fileSize', store),
            lastUpdateModeFileSize: updateTypes[_.getOr('200', 'lastUpdateModeFileSize', store)],
          } : { fileSize: '' },
          isChecksumOk:
            _.get('uploadedFileChecksum', store) === (_.get('computedFileChecksum', store)),
          lastUpdateModeOnBoardFileId: updateTypes[_.getOr('200', 'lastUpdateModeOnBoardFileId', store)],
          lastUpdateModeFileType: updateTypes[_.getOr('200', 'lastUpdateModeFileType', store)],
          lastUpdateModeFileCreationTime: updateTypes[_.getOr('200', 'lastUpdateModeFileCreationTime', store)],
          lastUpdateModeFileProtectionStatus: updateTypes[_.getOr('200', 'lastUpdateModeFileProtectionStatus', store)],
          lastUpdateModeFileMode: updateTypes[_.getOr('200', 'lastUpdateModeFileMode', store)],
          lastUpdateModeFileAddress: updateTypes[_.getOr('200', 'lastUpdateModeFileAddress', store)],
          lastUpdateModeUploadedChecksum: updateTypes[_.getOr('200', 'lastUpdateModeUploadedChecksum', store)],
          lastUpdateModeComputedChecksum: updateTypes[_.getOr('200', 'lastUpdateModeComputedChecksum', store)],

          // lastUpdateTimeOnBoardFileId
          // lastUpdateTimeFileSize
          // lastUpdateTimeFileType
          // lastUpdateTimeFileCreationTime
          // lastUpdateTimeFileProtectionStatus
          // lastUpdateTimeFileMode
          // lastUpdateTimeFileAddress
          // lastUpdateTimeUploadedChecksum
          // lastUpdateTimeComputedChecksum
        }))
      );
      return updatedState;
    }
    default:
      return state;
  }
}

export default createScopedDataReducer(pus144DataReducer, {}, VM_VIEW_PUS144);

export const getPUS144ViewData = state => state[`${VM_VIEW_PUS144}Data`];
export const getData = (state, { viewId }) => state[`${VM_VIEW_PUS144}Data`][viewId];
export const getConfiguration = (state, { viewId }) => state[`${VM_VIEW_PUS144}Configuration`][viewId];
