// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 15/02/2017 : Refactoring view reducer (configuration) .
// VERSION : 1.1.2 : DM : #3622 : 15/02/2017 : This is views reducer that will catch WD_VIEW_ADD action
// VERSION : 1.1.2 : DM : #3622 : 15/02/2017 : Split views reducer in several files
// VERSION : 1.1.2 : DM : #3622 : 15/02/2017 : Rename some points in views reducer + change getAxes parameters
// VERSION : 1.1.2 : DM : #3622 : 15/02/2017 : Refactoring + tests about views reducer
// VERSION : 1.1.2 : DM : #3622 : 15/02/2017 : Add some comments about views reducer
// VERSION : 1.1.2 : DM : #3622 : 24/02/2017 : Fix bug about isModified in a single view reducer
// VERSION : 1.1.2 : DM : #3622 : 02/03/2017 : Add min and max in plot viewData
// VERSION : 1.1.2 : DM : #3622 : 03/03/2017 : Work on Maximize and collapse views
// VERSION : 1.1.2 : DM : #3622 : 10/03/2017 : store collapsed & maximized bool in page layout
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Add WS_PAGE_OPEN action and remove WS_LOAD_DOCUMENTS
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Add WS_PAGE_OPEN action . .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Refacto loadDocumentsInStore from documentManager .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Replace WS_VIEW_ADD by WS_VIEW_ADD_BLANK .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Fix view reloading . .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : When move a view to a page, change pageUuid
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Add WS_VIEW_OPEN action . .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Filter unused value in view state
// VERSION : 1.1.2 : DM : #3622 : 14/03/2017 : Move general variables at top level of a view
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Add some eslint relaxation rules
// VERSION : 1.1.2 : DM : #6302 : 03/04/2017 : Add comment and fix coding convetions warning and un-needed relaxations
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : Remove old configuration reducer .
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : Add domainName and sessionName on view, window, page and hsc in store
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Add domainName and sessionName on view, window, page and hsc in store
// VERSION : 1.1.2 : DM : #6785 : 12/06/2017 : activate links in views .
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// VERSION : 1.1.2 : DM : #6829 : 27/06/2017 : showLegend information stored in file.
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Rename documentManager actions . .
// VERSION : 1.1.2 : DM : #6700 : 29/08/2017 : fix unnecessary datamap generation .
// VERSION : 1.1.2 : DM : #6816 : 13/09/2017 : Its possible to change the size of the mimic in the view ezeditor
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';

import composeReducers from 'store/helpers/composeReducers';
import * as types from 'store/types';

const setIsModified = _.set('isModified');
const getIsModified = (action) => {
  if (action.type === types.WS_VIEW_SETMODIFIED) {
    return _.get('payload.flag', action);
  }
  return _.get('payload.isModified', action);
};


// This reducer take care of action types and update the isModified property
// this is a temporary fix, waiting for the savableMiddleware
const viewIsModified = (stateView, action) => {
  const isModified = getIsModified(action);
  if (_.isBoolean(isModified)) {
    return setIsModified(isModified, stateView);
  }

  const shouldSetModifiedToFalse = _.contains(_, [
    types.WS_VIEW_RELOAD,
  ]);
  const shouldSetModifiedToTrue = _.contains(_, [
    types.WS_VIEW_ALARM_INPUT_SEARCH,
    types.WS_VIEW_ALARM_INPUT_RESET,
    types.WS_VIEW_UPDATEPATH,
    types.WS_VIEW_UPDATE_ABSOLUTEPATH,
    types.WS_VIEW_SET_OID,
    types.WS_VIEW_UPDATE_RATIO,
    types.WS_VIEW_UPDATE_TITLE,
    types.WS_VIEW_UPDATE_GRID,
    types.WS_VIEW_UPDATE_LINK,
    types.WS_VIEW_UPDATE_MARKER,
    types.WS_VIEW_UPDATE_PROCEDURE,
    types.WS_VIEW_UPDATE_TITLESTYLE,
    types.WS_VIEW_UPDATE_BGCOLOR,
    types.WS_VIEW_UPDATE_LEGEND,
    types.WS_VIEW_UPDATE_CONTENT,
    types.WS_VIEW_UPDATE_SHOWYAXES,
    types.WS_VIEW_UPDATE_ENTRYPOINT,
    types.WS_VIEW_UPDATE_AXIS,
    types.WS_VIEW_ADD_LINK,
    types.WS_VIEW_REMOVE_LINK,
    types.WS_VIEW_ADD_MARKER,
    types.WS_VIEW_REMOVE_MARKER,
    types.WS_VIEW_ADD_PROCEDURE,
    types.WS_VIEW_REMOVE_PROCEDURE,
    types.WS_VIEW_ADD_ENTRYPOINT,
    types.WS_VIEW_UPDATE_DOMAINNAME,
    types.WS_VIEW_UPDATE_SESSIONNAME,
    types.WS_VIEW_TOGGLE_LEGEND,
    types.WS_VIEW_UPDATE_DIMENSIONS,
    types.WS_VIEW_REMOVE_ENTRYPOINT,
    types.WS_VIEW_UPDATE_ALARMDOMAIN,
    types.WS_VIEW_UPDATE_ALARMTIMELINE,
    types.WS_VIEW_UPDATE_ALARMMODE,
  ]);
  if (shouldSetModifiedToTrue(action.type)) {
    if (!stateView.isModified) {
      return setIsModified(true, stateView);
    }
  } else if (shouldSetModifiedToFalse(action.type)) {
    if (stateView.isModified) {
      return setIsModified(false, stateView);
    }
  }
  return stateView;
};

const removeElementIn = (key, index, state) => _.update(key, _.pullAt(index), state);
const addElementIn = (key, val, state) => _.update(key, _.concat(_, val), state);

const initialState = {
  type: null,
  isModified: true,
  showLinks: false,
};

/* eslint-disable complexity, "DV6 TBC_CNES Redux reducers should be implemented as switch case" */
function simpleView(stateView = initialState, action) {
  switch (action.type) {
    case types.WS_VIEW_ADD_BLANK:
    case types.WS_VIEW_RELOAD:
    case types.WS_VIEW_OPENED:
    case types.WS_PAGE_OPENED:
    case types.WS_WORKSPACE_OPENED: {
      const newView = _.omit(['configuration', 'windowState', 'geometry', 'pageUuid', 'hideBorders'], action.payload.view);
      return _.defaults(initialState, newView);
    }
    case types.WS_VIEW_UPDATEPATH:
      return {
        ...stateView,
        path: action.payload.newPath,
      };
    case types.WS_VIEW_UPDATE_ABSOLUTEPATH:
      return {
        ...stateView,
        absolutePath: action.payload.newPath,
      };
    case types.WS_VIEW_SET_OID:
      return {
        ...stateView,
        oId: action.payload.oid,
      };
    case types.WS_VIEW_UPDATE_TITLE:
      return _.set('title', action.payload.title, stateView);
    case types.WS_VIEW_UPDATE_TITLESTYLE:
      return _.set('titleStyle', action.payload.titleStyle, stateView);
    case types.WS_VIEW_UPDATE_BGCOLOR:
      return _.set('backgroundColor', action.payload.bgColor, stateView);
    case types.WS_VIEW_UPDATE_LINK:
      return _.set(`links[${action.payload.index}]`, action.payload.link, stateView);
    case types.WS_VIEW_ADD_LINK:
      return addElementIn('links', action.payload.link, stateView);
    case types.WS_VIEW_REMOVE_LINK:
      return removeElementIn('links', action.payload.index, stateView);
    case types.WS_VIEW_UPDATE_SHOWLINK:
      return _.set('showLinks', action.payload.showLinks, stateView);
    case types.WS_VIEW_UPDATE_PROCEDURE:
      return _.set(`procedures[${action.payload.index}]`, action.payload.procedure, stateView);
    case types.WS_VIEW_ADD_PROCEDURE:
      return addElementIn('procedures', action.payload.procedure, stateView);
    case types.WS_VIEW_REMOVE_PROCEDURE:
      return removeElementIn('procedures', action.payload.index, stateView);
    case types.WS_VIEW_UPDATE_RATIO:
      return _.set('defaultRatio', action.payload.ratio, stateView);
    case types.WS_VIEW_UPDATE_DOMAINNAME:
      if (action.payload.domainName) {
        return { ...stateView, domainName: action.payload.domainName };
      }
      return _.omit('domainName', stateView);
    case types.WS_VIEW_UPDATE_SESSIONNAME:
      if (action.payload.sessionName) {
        return { ...stateView, sessionName: action.payload.sessionName };
      }
      return _.omit('sessionName', stateView);
    default:
      return stateView;
  }
}

// expose a single reducer that deal with one view
export default composeReducers(viewIsModified, simpleView);
