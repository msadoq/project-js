// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 15/02/2017 : Refacto pages reducer + 100% coverage
// VERSION : 1.1.2 : DM : #3622 : 24/02/2017 : Begin menuManager refacto . .
// VERSION : 1.1.2 : DM : #3622 : 10/03/2017 : store collapsed & maximized bool in page layout
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Add WS_PAGE_OPEN action and remove WS_LOAD_DOCUMENTS
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Cleanup actions . . .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Add WS_PAGE_OPEN action . .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Add WS_VIEW_CLOSE action + remove unmountAndRemove (view)
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Fix lint, due to rebase
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Replace WS_VIEW_ADD by WS_VIEW_ADD_BLANK .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Add WS_VIEW_OPEN action . .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Set page isModified when load/close/add a view
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : FIlter unused values in page state
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Refacto loadDocumentsInStore from documentManager .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Remove add/_add/addAndMount thunks . .
// VERSION : 1.1.2 : DM : #5828 : 15/03/2017 : Implement a page panels reducer to allow panels configuration storage in page
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : set page modified when one of its views is saved as
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Cleanup React components tree and props
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Cleanup React components tree and props
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Merge branch 'dbrugne-boxmodel2' into dev
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Fix a layout bug, add a test for abesson
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Fix few broken unit tests
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : SaveAs at a different path should set workspace isModified
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : keep view size after collapse
// VERSION : 1.1.2 : DM : #5828 : 28/03/2017 : Timebar is collapsable. action reducer test.
// VERSION : 1.1.2 : DM : #5828 : 30/03/2017 : Fix bug about panels on WS_PAGE_ADD_BLANK
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Add some eslint relaxation rules
// VERSION : 1.1.2 : DM : #6302 : 03/04/2017 : Add comment and fix coding convetions warning and un-needed relaxations
// VERSION : 1.1.2 : DM : #5828 : 05/04/2017 : Save and load panel info from page document
// VERSION : 1.1.2 : DM : #5828 : 05/04/2017 : minimize and keep old size for explorer and editor
// VERSION : 1.1.2 : DM : #5828 : 06/04/2017 : Move panels loading in panels reducer
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : Collapse / minimize buttons on panel dividers. New colors for dividers, darker.
// VERSION : 1.1.2 : DM : #5828 : 19/04/2017 : Page title edition using contextMenu and GenericModal.
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : Add domainName and sessionName on view, window, page and hsc in store
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : split updateTimebarId in mountTimebar and unmountTimebar
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Add domainName and sessionName on view, window, page and hsc in store
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : split updateTimebarId in mountTimebar and unmountTimebar
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move few common/ modules in client/ folder
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Rename documentManager actions . .
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import { copyProp } from '../../../common/fp';
import * as types from '../../types';
import panels from './panels';

const initialState = {
  title: 'Unknown',
  timebarUuid: null,
  layout: [],
  views: [],
  isModified: true,
  properties: [],
};

const initialGeometry = {
  x: 0,
  y: 0,
  w: 5,
  h: 5,
};

const putGeometryInLayout = (layout, geometry) => {
  const index = _.findIndex(x => x.i === geometry.i, layout);
  if (index === -1) {
    return layout;
  }
  const newGeometry = layout[index].collapsed ? _.omit(['w', 'h'], geometry) : geometry;
  return _.set(index, _.merge(layout[index], newGeometry), layout);
};
const mergeLayout = _.reduce(putGeometryInLayout);

const getGeometry = _.pipe(
  copyProp('uuid', 'geometry.i'),
  _.get('geometry'),
  _.defaults(initialGeometry)
);

/* eslint-disable complexity, "DV6 TBC_CNES Redux reducers should be implemented as switch case" */
export default function pageReducer(statePage = initialState, action) {
  switch (action.type) {
    case types.WS_PAGE_OPENED:
    case types.WS_WORKSPACE_OPENED: {
      const newPage = _.merge(statePage, {
        ...action.payload.page,
        panels: panels(undefined, action),
      });

      const views = _.groupBy('pageUuid', action.payload.views)[newPage.uuid];
      const getUuids = _.map('uuid');
      const getLayout = _.map(getGeometry);
      return _.pipe(
        _.update('views', _.concat(_, getUuids(views))),
        _.update('layout', _.concat(_, getLayout(views))),
        _.omit(['windowId', 'workspaceFolder', 'timebarId'])
      )(newPage);
    }
    case types.WS_PAGE_ADD_BLANK: {
      return _.merge(statePage, {
        ...action.payload.page,
        panels: panels(undefined, action),
      });
    }
    case types.WS_VIEW_OPENED: {
      return _.pipe(
        _.update('views', _.concat(_, action.payload.view.uuid)),
        _.update('layout', _.concat(_, getGeometry(action.payload.view))),
        _.set('isModified', true)
      )(statePage);
    }
    case types.WS_VIEW_ADD_BLANK: {
      return _.pipe(
        _.update('views', _.concat(_, action.payload.view.uuid)),
        _.update('layout', _.concat(_, { ...initialGeometry, i: action.payload.view.uuid })),
        _.set('isModified', true)
      )(statePage);
    }
    case types.WS_VIEW_CLOSE: {
      return _.pipe(
        _.update('views', _.remove(_.equals(action.payload.viewId))),
        _.set('isModified', true)
      )(statePage);
    }
    case types.WS_PAGE_UPDATE_LAYOUT: {
      return {
        ...statePage,
        layout: mergeLayout(statePage.layout, action.payload.layout),
        isModified: true,
      };
    }
    case types.WS_PAGE_UPDATEPATH:
      return {
        ...statePage,
        path: action.payload.newPath,
        isModified: true,
      };
    case types.WS_PAGE_UPDATE_ABSOLUTEPATH: {
      return {
        ...statePage,
        absolutePath: action.payload.newPath,
        isModified: true,
      };
    }
    case types.WS_PAGE_SET_OID: {
      return {
        ...statePage,
        oId: action.payload.oid,
        isModified: true,
      };
    }
    case types.WS_PAGE_SETMODIFIED:
      return _.set('isModified', action.payload.flag, statePage);
    case types.WS_PAGE_TIMEBAR_MOUNT:
      return _.set('timebarUuid', action.payload.timebarUuid, statePage);
    case types.WS_PAGE_TIMEBAR_UNMOUNT:
      return _.set('timebarUuid', null, statePage);
    case types.WS_PAGE_UPDATE_TITLE:
      return {
        ...statePage,
        title: action.payload.title,
        isModified: true,
      };
    case types.WS_PAGE_PANELS_LOAD_IN_EDITOR:
    case types.WS_PAGE_PANELS_RESIZE_EDITOR:
    case types.WS_PAGE_PANELS_RESIZE_TIMEBAR:
    case types.WS_PAGE_PANELS_MINIMIZE_TIMEBAR:
    case types.WS_PAGE_PANELS_FOCUS_IN_EXPLORER:
    case types.WS_PAGE_PANELS_RESIZE_EXPLORER:
    case types.WS_PAGE_PANELS_MINIMIZE_EDITOR:
    case types.WS_PAGE_PANELS_MINIMIZE_EXPLORER:
      return {
        ...statePage,
        panels: panels(statePage.panels, action),
      };
    case types.WS_VIEW_SETCOLLAPSED:
      return _.set(['layout', _.findIndex(i => i.i === action.payload.viewId, statePage.layout), 'collapsed'],
        action.payload.flag,
        {
          ...statePage,
          isModified: true,
        }
      );
    case types.WS_VIEW_SETMAXIMISED:
      return _.set(['layout', _.findIndex(i => i.i === action.payload.viewId, statePage.layout), 'maximized'],
        action.payload.flag,
        statePage
      );
    case types.WS_VIEW_UPDATE_ABSOLUTEPATH:
      return { ...statePage, isModified: true };
    case types.WS_PAGE_UPDATE_DOMAINNAME:
      if (action.payload.domainName) {
        return { ...statePage, domainName: action.payload.domainName, isModified: true };
      }
      return Object.assign({}, _.omit('domainName', statePage), { isModified: true });
    case types.WS_PAGE_UPDATE_SESSIONNAME:
      if (action.payload.sessionName) {
        return { ...statePage, sessionName: action.payload.sessionName, isModified: true };
      }
      return Object.assign({}, _.omit('sessionName', statePage), { isModified: true });
    default:
      return statePage;
  }
}
