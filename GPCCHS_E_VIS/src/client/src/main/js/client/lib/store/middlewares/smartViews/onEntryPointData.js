/* eslint-disable no-unused-vars */
import {
  WS_VIEW_ADD_ENTRYPOINT,
  WS_VIEW_UPDATE_ENTRYPOINT,
} from '../../types';
import { updateDisplayedFields } from '../../actions/tableColumns';

const onEntryPointData = ({ dispatch, getState }) => next => (action) => {
  const state = getState();

  const { payload } = action;

  if (
    action.type === WS_VIEW_ADD_ENTRYPOINT ||
    action.type === WS_VIEW_UPDATE_ENTRYPOINT
  ) {
    const { viewId, entryPoint } = action.payload;

    if (entryPoint.connectedData && entryPoint.connectedData.comObject) {
      const { comObject } = entryPoint.connectedData;
      const { comObjectMap } = state;

      const params = comObjectMap.fields[comObject];

      const displayedFields = params.reduce((acc, value) => (
        {
          ...acc,
          [value.name]: true,
        }
      ));

      dispatch(
        updateDisplayedFields(
          viewId,
          comObject,
          comObjectMap.fields[comObject],
          displayedFields
        )
      );
    }
  }

  return next(action);
};

export default onEntryPointData;
