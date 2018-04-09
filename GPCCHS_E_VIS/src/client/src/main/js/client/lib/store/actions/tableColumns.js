/* eslint-disable import/prefer-default-export */

import simple from '../helpers/simpleActionCreator';

import {
  WS_VIEW_UPDATE_SORTING,
  WS_VIEW_CHANGE_COL_FILTERS,
  WS_VIEW_TABLE_SCROLL,
  WS_VIEW_TABLE_UPDATE_HEIGHT,
  WS_VIEW_TABLE_UPDATE_DISPLAYED_PARAMS,
} from '../types';

export const toggleColumnSort = simple(WS_VIEW_UPDATE_SORTING, 'viewId', 'colName', 'direction');
export const filterColumn = simple(WS_VIEW_CHANGE_COL_FILTERS, 'viewId', 'colName', 'value');
export const scrollRows = simple(WS_VIEW_TABLE_SCROLL, 'viewId', 'offset');
export const updateTableHeight = simple(WS_VIEW_TABLE_UPDATE_HEIGHT, 'viewId', 'height');
export const updateDisplayedFields =
  simple(
    WS_VIEW_TABLE_UPDATE_DISPLAYED_PARAMS,
    'viewId',
    'comObject',
    'comObjectFields',
    'displayedFields'
  );
