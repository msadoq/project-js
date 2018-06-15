// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Add PlotView and DynamicView configurationReducer in
//  viewManager
// VERSION : 1.1.2 : DM : #5828 : 04/04/2017 : plot view entry point update
// VERSION : 1.1.2 : DM : #5828 : 04/04/2017 : Remove old configuration reducers from
//  reducers/views/configuration
// VERSION : 1.1.2 : DM : #5828 : 05/04/2017 : Merging branch dev into branch dev-plot-ep-refacto.
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : Add configurationReducer.spec for PlotView .
// VERSION : 1.1.2 : DM : #5828 : 13/04/2017 : EntryPoint addition now uses GenericModal. General
//  refacto of default EntryPoints props, set in viewManager's setDefaultEntryPoint for text, plot
//  and Dynamic.
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : open parameter in editor via context menu
// VERSION : 1.1.2 : DM : #5828 : 26/04/2017 : Ported 1.1.0 patch to dev branch. EP Drag & drop
//  auto-axis-creation.
// VERSION : 1.1.2 : FA : ISIS-FT-2107 : 19/06/2017 : Improve PlotView editor UI -> legend in
//  store.
// VERSION : 1.1.2 : FA : #7185 : 06/07/2017 : Fix lint errors and warnings
// VERSION : 1.1.2 : DM : #6700 : 29/08/2017 : fix unnecessary datamap generation .
// VERSION : 2.0.0 : DM : #6818 : 20/11/2017 : save live extents zooms & pans (plot view) in the
//  store
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : #10769 : 20/03/2018 : Fix bug when adding a new entry point when no
//  timebar has been selected
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';

import * as types from 'store/types';
import { getYAxis, updateAxis, addAxis, removeAxis } from './axes';

const removeElementIn = (key, index, state) => _.update(key, _.pullAt(index), state);

const addElementIn = (key, val, state) => _.update(key, x => _.compact(_.concat(x, val)), state);


/* eslint-disable complexity, "DV6 TBC_CNES Redux reducers should be implemented as switch case" */
export default (stateConf = { search: '', showLegend: true }, action) => {
  switch (action.type) {
    case types.WS_VIEW_UPDATE_LEGEND:
      return _.set('legend', action.payload.legend, stateConf);
    case types.WS_VIEW_UPDATE_SHOWYAXES:
      return _.set('showYAxes', action.payload.showYAxes, stateConf);
    case types.WS_VIEW_UPDATE_GRID:
      return _.set(`grids[${action.payload.index}]`, action.payload.grid, stateConf);
    case types.WS_VIEW_TOGGLE_LEGEND:
      return _.set('showLegend', action.payload.flag, stateConf);
    case types.WS_VIEW_SAVE_LIVE_EXTENTS:
      return _.set('liveExtents', action.payload.liveExtents, stateConf);
    case types.WS_VIEW_ADD_GRID:
      return addElementIn('grids', action.payload.grid, stateConf);
    case types.WS_VIEW_REMOVE_GRID:
      return removeElementIn('grids', action.payload.index, stateConf);
    case types.WS_VIEW_UPDATE_MARKER:
      return _.set(`markers[${action.payload.index}]`, action.payload.marker, stateConf);
    case types.WS_VIEW_ADD_MARKER:
      return addElementIn('markers', action.payload.marker, stateConf);
    case types.WS_VIEW_REMOVE_MARKER:
      return removeElementIn('markers', action.payload.index, stateConf);
    case types.WS_VIEW_ADD_ENTRYPOINT: {
      const axisY = getYAxis(stateConf, action);
      return {
        ...stateConf,
        entryPoints: [
          ...stateConf.entryPoints,
          {
            ...action.payload.entryPoint,
            axisId: axisY.id,
            connectedData: {
              ...(action.payload.entryPoint.connectedData),
              axisId: axisY.id,
            },
          },
        ],
        axes: {
          ...stateConf.axes,
          [axisY.id]: axisY,
        },
      };
    }
    case types.WS_VIEW_REMOVE_ENTRYPOINT: {
      const entryPoints = stateConf.entryPoints;
      const getAllConnectedAxisIds = eps => _.pluck('connectedData.axisId', eps);
      const refreshAxes = _.pick(getAllConnectedAxisIds(entryPoints));
      return _.update('axes', refreshAxes, stateConf);
    }
    case types.WS_VIEW_UPDATE_AXIS: {
      return updateAxis(stateConf, action);
    }
    case types.WS_VIEW_ADD_AXIS:
      return addAxis(stateConf, action);
    case types.WS_VIEW_REMOVE_AXIS:
      return removeAxis(stateConf, action);
    case types.WS_VIEW_UPDATE_EDITOR_SEARCH:
      if (action.payload.search !== stateConf.search) {
        return _.set('search', action.payload.search, stateConf);
      }
      return stateConf;
    default:
      return stateConf;
  }
};
