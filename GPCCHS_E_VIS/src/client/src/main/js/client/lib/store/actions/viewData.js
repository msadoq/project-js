import simple from '../helpers/simpleActionCreator';
import * as types from '../types';

// eslint-disable-next-line import/prefer-default-export
export const cleanViewData = simple(types.WS_VIEWDATA_CLEAN, 'dataMap', 'previousDataMap');
