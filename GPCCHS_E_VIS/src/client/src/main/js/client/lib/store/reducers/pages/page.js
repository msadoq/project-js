import _ from 'lodash/fp';
import { copyProp } from 'common/utils/fp';
import * as types from '../../types';

const initialState = {
  title: 'Unknown',
  timebarHeight: 135,
  timebarCollapsed: false,
  timebarUuid: null,
  layout: [],
  views: [],
  editor: {
    isOpened: false,
    viewId: null,
    viewType: null,
  },
  isModified: true,
  properties: [],
};

const initialGeometry = {
  x: 0,
  y: 0,
  w: 5,
  h: 5,
};

const getGeometry = _.pipe(
  copyProp('uuid', 'geometry.i'),
  _.prop('geometry'),
  _.defaults(initialGeometry)
);

const page = (statePage = initialState, action) => {
  switch (action.type) {
    case types.WS_LOAD_DOCUMENTS: {
      const newPage = _.merge(statePage, action.payload.page);
      const views = _.groupBy('pageUuid', action.payload.documents.views)[newPage.uuid];
      if (!views) {
        return newPage;
      }
      const getUuids = _.map('uuid');
      const getLayout = _.map(getGeometry);
      return _.pipe(
        _.update('views', _.concat(_, getUuids(views))),
        _.update('layout', _.concat(_, getLayout(views))),
        _.omit(['windowId', 'workspaceFolder', 'timebarId'])
      )(newPage);
    }
    case types.WS_PAGE_ADD_BLANK: {
      return _.merge(statePage, action.payload.page);
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
    case types.WS_PAGE_EDITOR_OPEN:
      return _.update('editor', _.merge(_, {
        isOpened: true,
        viewId: action.payload.viewId,
        viewType: action.payload.viewType,
      }), statePage);
    case types.WS_PAGE_EDITOR_CLOSE:
      return _.set('editor.isOpened', false, statePage);
    case types.WS_PAGE_UPDATE_LAYOUT: {
      return {
        ...statePage,
        layout: action.payload.layout,
        isModified: true,
      };
    }
    case types.WS_PAGE_TIMEBAR_COLLAPSE: {
      return {
        ...statePage,
        timebarCollapsed: action.payload.flag,
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
    case types.WS_PAGE_UPDATE_TIMEBARHEIGHT:
      return {
        ...statePage,
        isModified: true,
        timebarHeight: action.payload.timebarHeight >= 135 ? action.payload.timebarHeight : 135,
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
    default:
      return statePage;
  }
};

export default page;
