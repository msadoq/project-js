/* eslint-disable no-unused-vars */
import {
  WS_VIEW_ADD_ENTRYPOINT,
  WS_VIEW_UPDATE_ENTRYPOINT,
} from '../../types';
import { updateDisplayedColumns } from '../../actions/tableColumns';

const onEntryPointData = ({ dispatch, getState }) => next => (action) => {
  const state = getState();

  if (
    action.type === WS_VIEW_ADD_ENTRYPOINT ||
    action.type === WS_VIEW_UPDATE_ENTRYPOINT
  ) {
    const { viewId, entryPoint } = action.payload;

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
  }

  return next(action);
};

export default onEntryPointData;
