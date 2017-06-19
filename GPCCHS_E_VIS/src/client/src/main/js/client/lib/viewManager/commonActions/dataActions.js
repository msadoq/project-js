import simple from '../../store/helpers/simpleActionCreator';
import * as types from '../../store/types';

export const importPayload = simple(types.DATA_IMPORT_VIEWDATA, 'viewData');
export const removeAllData = simple(types.DATA_REMOVE_ALL_VIEWDATA);

export const updateViewData = simple(
  types.DATA_UPDATE_VIEWDATA,
  'oldViewMap',
  'newViewMap',
  'oldExpectedIntervals',
  'newExpectedIntervals',
  'dataToInject'
);
