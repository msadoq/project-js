import _ from 'lodash/fp';
import { copyProp } from 'common/utils/fp';
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

/* eslint-disable complexity, "DV6 TBC_CNESRedux reducers should be implemented as switch case" */
export default function pageReducer(statePage = initialState, action) {
  switch (action.type) {
    case types.WS_PAGE_OPEN:
    case types.WS_WORKSPACE_OPEN: {
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
    case types.WS_VIEW_OPEN: {
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
    case types.WS_PAGE_SETMODIFIED: {
      return _.set('isModified', action.payload.flag, statePage);
    }
    case types.WS_PAGE_UPDATE_TIMEBARID:
      return _.set('timebarUuid', action.payload.timebarUuid, statePage);
    case types.WS_PAGE_PANELS_LOAD_IN_EDITOR:
    case types.WS_PAGE_PANELS_RESIZE_EDITOR:
    case types.WS_PAGE_PANELS_RESIZE_TIMEBAR:
    case types.WS_PAGE_PANELS_COLLAPSE_TIMEBAR:
    case types.WS_PAGE_PANELS_FOCUS_IN_EXPLORER:
    case types.WS_PAGE_PANELS_RESIZE_EXPLORER:
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
    default:
      return statePage;
  }
}
