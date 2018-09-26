/* eslint-disable no-unused-vars */
import {
  WS_VIEW_ADD_ENTRYPOINT,
  WS_VIEW_UPDATE_ENTRYPOINT,
} from '../../types';
import { updateDisplayedColumns } from '../../actions/tableColumns';
import { updateEntryPointName } from '../../actions/editEntryPoints';
import { getViewType } from '../../reducers/views';
import { VM_VIEW_HISTORY } from '../../../viewManager/constants';

/**
 * Dispatches an action to add table columns
 * associated with the comObjectFields that are found in the comObjectMap
 * for the specified entry point comObject
 *
 * @param dispatch
 * @param state
 * @returns {Function}
 * @private
 */
const _updateTableColumns = state => dispatch => ({ viewId, entryPoint }) => {
  if (entryPoint.connectedData && entryPoint.connectedData.comObject) {
    const { comObject } = entryPoint.connectedData;
    const { comObjectMap } = state;

    const comObjectFields = comObjectMap.fields[comObject];
    const fields = comObjectFields && comObjectFields.map(field => field.name);

    dispatch(
      updateDisplayedColumns(
        viewId,
        comObject,
        fields
      )
    );
  }
};

const onEntryPointData = ({ dispatch, getState }) => next => (action) => {
  const state = getState();

  if (action.type === WS_VIEW_UPDATE_ENTRYPOINT) {
    const { viewId, entryPoint } = action.payload;
    dispatch(updateEntryPointName(viewId, entryPoint.id, entryPoint.name));
  }

  if (
    action.type === WS_VIEW_ADD_ENTRYPOINT ||
    action.type === WS_VIEW_UPDATE_ENTRYPOINT
  ) {
    const { viewId, entryPoint } = action.payload;

    const viewType = getViewType(state, { viewId });

    if (viewType === VM_VIEW_HISTORY) {
      _updateTableColumns(state)(dispatch)({ viewId, entryPoint });
    }
  }

  return next(action);
};

export default onEntryPointData;
