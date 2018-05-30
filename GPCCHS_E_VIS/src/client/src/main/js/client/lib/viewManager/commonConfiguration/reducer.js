// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Write first configurationReducer (TextView) .
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Rename documentManager actions . .
// VERSION : 1.1.2 : FA : #7773 : 13/09/2017 : Fixed bug when editing PlotView/TextView/MimicView
//  EntryPoint's name.
// VERSION : 2.0.0 : FA : ISIS-FT-2248 : 18/10/2017 : Fallback/Wildcard for sessions and domains is
//  now functionnal. Plus fixed page and workspace modal editor for undefined values.
// VERSION : 2.0.0 : FA : #8088 : 03/11/2017 : Fixed DynamicView editor and removeEntryPoint
//  behavior uses entryPoint.id.
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';

import * as types from 'store/types';

const removeElementIn = (key, index, state) => _.update(key, _.pullAt(index), state);

export default (stateConf, action) => {
  switch (action.type) {
    // loading view configuration
    case types.WS_VIEW_TOUCH:
      return { ...stateConf };
    case types.WS_VIEW_OPENED:
    case types.WS_PAGE_OPENED:
    case types.WS_WORKSPACE_OPENED:
    case types.WS_VIEW_ADD_BLANK:
    case types.WS_VIEW_RELOAD:
      return _.defaults(stateConf, action.payload.view.configuration);
    // entryPoints
    case types.WS_VIEW_UPDATE_ENTRYPOINT: {
      const index = _.findIndex({ id: action.payload.entryPointId }, stateConf.entryPoints);
      return _.set(`entryPoints[${index}]`, action.payload.entryPoint, stateConf);
    }
    case types.WS_VIEW_REMOVE_ENTRYPOINT: {
      const index = _.findIndex({ id: action.payload.entryPointId }, stateConf.entryPoints);
      return removeElementIn('entryPoints', index, stateConf);
    }
    // tables
    case types.WS_VIEW_TABLE_UPDATE_SORT: {
      const { tableId, colName, direction } = action.payload;

      return {
        ...stateConf,
        tables: {
          ...stateConf.tables,
          [tableId]: {
            ...stateConf.tables[tableId],
            sorting: {
              colName,
              direction,
            },
          },
        },
      };
    }
    case types.WS_VIEW_CHANGE_COL_FILTERS: {
      const { tableId, colName, value } = action.payload;
      return {
        ...stateConf,
        tables: {
          ...stateConf.tables,
          [tableId]: {
            ...stateConf.tables[tableId],
            filters: {
              ...stateConf.tables[tableId].filters,
              [colName]: value,
            },
          },
        },
      };
    }
    case types.WS_VIEW_TABLE_SCROLL: {
      const { tableId, offset } = action.payload;

      return {
        ...stateConf,
        tables: {
          ...stateConf.tables,
          [tableId]: {
            ...stateConf.tables[tableId],
            dataOffset: offset,
          },
        },
        dataOffset: offset,
      };
    }
    default:
      return stateConf;
  }
};
