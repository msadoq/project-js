/* eslint-disable import/prefer-default-export */

import simple from '../helpers/simpleActionCreator';

import {
  WS_VIEW_TABLE_UPDATE_SORT,
  WS_VIEW_CHANGE_COL_FILTERS,
  WS_VIEW_TABLE_SCROLL,
  WS_VIEW_TABLE_UPDATE_HEIGHT,
  WS_VIEW_TABLE_ADD_COLUMNS,
  WS_VIEW_TABLE_REORDER_COLUMNS,
  WS_VIEW_TABLE_TOGGLE_COLUMN,
} from '../types';

export const toggleColumnSort = simple(WS_VIEW_TABLE_UPDATE_SORT, 'viewId', 'tableId', 'colName', 'direction');
export const filterColumn =
  simple(
    WS_VIEW_CHANGE_COL_FILTERS,
    'viewId',
    'tableId',
    'colName',
    'value',
    'filters' // all active filters
  );
export const scrollRows =
  simple(
    WS_VIEW_TABLE_SCROLL,
    'viewId',
    'tableId',
    'offset'
  )
;
export const updateTableHeight = simple(WS_VIEW_TABLE_UPDATE_HEIGHT, 'viewId', 'tableId', 'height');
export const updateDisplayedColumns =
  simple(
    WS_VIEW_TABLE_ADD_COLUMNS,
    'viewId',
    'groupName',
    'fields'
  );

export const reorderColumns =
  simple(
    WS_VIEW_TABLE_REORDER_COLUMNS,
    'viewId',
    'tableId',
    'oldIndex',
    'newIndex'
  );

export const toggleColumn =
  simple(
    WS_VIEW_TABLE_TOGGLE_COLUMN,
    'viewId',
    'tableId',
    'index'
  );
