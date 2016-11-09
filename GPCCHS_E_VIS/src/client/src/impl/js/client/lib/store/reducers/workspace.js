import * as types from '../types';

export default function workspace(stateWorkspace = {}, action) {
  switch (action.type) {
    case types.WS_UPDATE_PATH:
      if (stateWorkspace.folder === action.payload.folder) {
        if (stateWorkspace.file === action.payload.file) {
          return stateWorkspace;
        }
        return { ...stateWorkspace, file: action.payload.file };
      }
      // Update all relative path
      return { ...stateWorkspace, folder: action.payload.folder, file: action.payload.file };
    default:
      return stateWorkspace;
  }
}
